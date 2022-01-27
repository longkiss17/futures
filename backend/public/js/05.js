var π = Math.PI,
    ε = 1e-6,
    ε2 = ε * ε,
    d3_radians = π / 180,
    d3_degrees = 180 / π;

function d3_sgn(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function d3_acos(x) {
  return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
}

function d3_asin(x) {
  return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
}

function d3_sinh(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function d3_cosh(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
}

function d3_haversin(x) {
  return (x = Math.sin(x / 2)) * x;
}


d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius,
        outerRadius = d3_svg_arcOuterRadius,
        startAngle = d3_svg_arcStartAngle,
        endAngle = d3_svg_arcEndAngle;
  
    function arc() {
      var r0 = innerRadius.apply(this, arguments),
          r1 = outerRadius.apply(this, arguments),
          a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
          a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
          da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
          df = da < π ? "0" : "1",
          c0 = Math.cos(a0),
          s0 = Math.sin(a0),
          c1 = Math.cos(a1),
          s1 = Math.sin(a1);
      return da >= d3_svg_arcMax
        ? (r0
        ? "M0," + r1
        + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
        + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
        + "M0," + r0
        + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
        + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
        + "Z"
        : "M0," + r1
        + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
        + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
        + "Z")
        : (r0
        ? "M" + r1 * c0 + "," + r1 * s0
        + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
        + "L" + r0 * c1 + "," + r0 * s1
        + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
        + "Z"
        : "M" + r1 * c0 + "," + r1 * s0
        + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
        + "L0,0"
        + "Z");
    }
  
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
  
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
  
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
  
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
  
    arc.centroid = function() {
      var r = (innerRadius.apply(this, arguments)
          + outerRadius.apply(this, arguments)) / 2,
          a = (startAngle.apply(this, arguments)
          + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
      return [Math.cos(a) * r, Math.sin(a) * r];
    };
  
    return arc;
  };
  
  var d3_svg_arcOffset = -π / 2,
      d3_svg_arcMax = 2 * π - 1e-6;
  
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }

  function d3_functor(v) {
    return typeof v === "function" ? v : function() { return v; };
  }
  
  d3.functor = d3_functor;
  
  function d3_source(d) {
    return d.source;
  }
  
  function d3_target(d) {
    return d.target;
  }
  

  

d3.layout.arc_chord = function() {
    var arc_chord = {},
        chords,
        groups,
        matrix,
        n,
        padding = 0,
        paddingPercent = 0,
        startAngle= 0,
        endAngle=360,
        sortGroups,
        sortSubgroups,
        yOffsetFactor=0,
        targetChord=d3.svg.arc_chord(),
        sortChords;

    function relayout() {
        var subgroups = {},
            groupSums = [],
            groupIndex = d3.range(n),
            subgroupIndex = [],
            k,
            x,
            x0,
            i,
            j;

        chords = [];
        groups = [];

        // Compute the sum.
        k = 0, i = -1; while (++i < n) {
            x = 0, j = -1; while (++j < n) {
              //  console.log("matrix[i]=" + i);
                x += matrix[i][j];
            }
            groupSums.push(x);
            subgroupIndex.push(d3.range(n));
            k += x;
        }

        // Sort groups…
        if (sortGroups) {
            groupIndex.sort(function(a, b) {
                return sortGroups(groupSums[a], groupSums[b]);
            });
        }

        // Sort subgroups…
        if (sortSubgroups) {
            subgroupIndex.forEach(function(d, i) {
                d.sort(function(a, b) {
                    return sortSubgroups(matrix[i][a], matrix[i][b]);
                });
            });
        }

        var angleDifference=(endAngle-startAngle);
      //  if (angleDifference < -180) angleDifference += 360;
      //  if (angleDifference > 180) angleDifference -= 360;

        // Convert the sum to scaling factor for [0, 2pi].
        // TODO Allow start and end angle to be specified.
        // TODO Allow padding to be specified as percentage?
        k = ((2 * π)*(angleDifference/360) - padding * (n-1)) / k;

        // Compute the start and end angle for each group and subgroup.
        // Note: Opera has a bug reordering object literal properties!
        x = startAngle*d3_radians, i = -1; while (++i < n) {
            x0 = x, j = -1; while (++j < n) {
                var di = groupIndex[i],
                    dj = subgroupIndex[di][j],
                    v = matrix[di][dj],
                    a0 = x,
                    a1 = x += v * k;
                subgroups[di + "-" + dj] = {
                    index: di,
                    subindex: dj,
                    startAngle: a0,
                    endAngle: a1,
                    value: v
                };
            }
            groups[di] = {
                index: di,
                startAngle: x0,
                endAngle: x,
                value: (x - x0) / k
            };
            x += padding;
        }

     //   targetChord.startAngle=175*d3_radians;
     //   targetChord.endAngle=185*d3_radians;
     //   targetChord.radius=100;
        targetChord.yOffsetFactor=yOffsetFactor;



        // Generate chords for each (non-empty) subgroup-subgroup link.
        i = -1; while (++i < n) {
            j = i - 1; while (++j < n) {
                var source = subgroups[i + "-" + j],
                  //  target = subgroups[j + "-" + i];

                    target=targetChord;
                if (source.value || target.value) {
                    chords.push(source.value < target.value
                        ? {source: target, target: source}
                        : {source: source, target: target});
                }
            }
        }

        if (sortChords) resort();
    }

    function resort() {
        chords.sort(function(a, b) {
            return sortChords(
                (a.source.value + a.target.value) / 2,
                (b.source.value + b.target.value) / 2);
        });
    }

    arc_chord.matrix = function(x) {
        if (!arguments.length) return matrix;
        n = (matrix = x) && matrix.length;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.targetChord = function(x) {
        if (!arguments.length) return targetChord;
        targetChord=x;
        chords = groups = null;
        return targetChord;
    }

    arc_chord.padding = function(x) {
        if (!arguments.length) return padding;
        padding = x;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.yOffsetFactor = function(x) {
        if (!arguments.length) return yOffsetFactor;
        yOffsetFactor = x;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.startAngle = function(x) {
        if (!arguments.length) return startAngle;
        startAngle = x;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.endAngle = function(x) {
        if (!arguments.length) return endAngle;
        endAngle = x;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.sortGroups = function(x) {
        if (!arguments.length) return sortGroups;
        sortGroups = x;
        chords = groups = null;
        return arc_chord;
    };

    arc_chord.sortSubgroups = function(x) {
        if (!arguments.length) return sortSubgroups;
        sortSubgroups = x;
        chords = null;
        return arc_chord;
    };

    arc_chord.sortChords = function(x) {
        if (!arguments.length) return sortChords;
        sortChords = x;
        if (chords) resort();
        return arc_chord;
    };

    arc_chord.chords = function() {
        if (!chords) relayout();
        return chords;
    };

    arc_chord.groups = function() {
        if (!groups) relayout();
        return groups;
    };



    return arc_chord;
};


function f_yOffsetFactor(d) {
    return d.yOffsetFactor;
}


d3.svg.arc_chord = function() {
    var source = d3_source,
        target = d3_target,
        radius = d3_svg_chordRadius,
        startAngle = d3_svg_arcStartAngle,
        endAngle = d3_svg_arcEndAngle,
        yOffsetFactor = f_yOffsetFactor,
        yOffset;

    // TODO Allow control point to be customized.

    function arc_chord(d, i) {
        var s = subgroup(this, source, d, i),
            t = subgroup(this, target, d, i);
            t.p0=[-5, -s.r*(-yOffset/2)]
            t.p1=[5, -s.r*(-yOffset/2)];

        return "M" + s.p0
            + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t)
            ? curve(s.r, s.p1, s.r, s.p0)
            : curve(s.r, s.p1, t.r, t.p0, s.a1 - s.a0 )
            + arc(t.r, t.p1, t.a1 - t.a0)
            + curve(t.r, t.p1, s.r, s.p0))
            + "Z";
    }

    function subgroup(self, f, d, i) {
        var subgroup = f.call(self, d, i),
            r = radius.call(self, subgroup, i),
            a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
            a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
            yOffset=yOffsetFactor.call(self,subgroup,i);
        return {
            r: r,
            a0: a0,
            a1: a1,
            p0: [r * Math.cos(a0), r * Math.sin(a0)],
            p1: [r * Math.cos(a1), r * Math.sin(a1)]
        };
    }

    function equals(a, b) {
        return a.a0 == b.a0 && a.a1 == b.a1;
    }

    function arc(r, p, a) {
        return " A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }

    function curve(r0, p0, r1, p1) {
        var r=" Q 0," + (r0 * yOffset) + " " + p1;
        return r;
    }

    arc_chord.yOffsetFactor = function(v) {
        if (!arguments.length) return yOffsetFactor;
        yOffsetFactor = d3_functor(v);
        return arc_chord;
    };

    arc_chord.radius = function(v) {
        if (!arguments.length) return radius;
        radius = d3_functor(v);
        return arc_chord;
    };

    arc_chord.source = function(v) {
        if (!arguments.length) return source;
        source = d3_functor(v);
        return arc_chord;
    };

    arc_chord.target = function(v) {
        if (!arguments.length) return target;
        target = d3_functor(v);
        return arc_chord;
    };

    arc_chord.startAngle = function(v) {
        if (!arguments.length) return startAngle;
        startAngle = d3_functor(v);
        return arc_chord;
    };

    arc_chord.endAngle = function(v) {
        if (!arguments.length) return endAngle;
        endAngle = d3_functor(v);
        return arc_chord;
    };

    return arc_chord;
};

function d3_svg_chordRadius(d) {
    return d.radius;
}

function createVerticalGradient(svgId,gradientId,stops) {
    var svg=document.getElementById(svgId);
    var svgNS = svg.namespaceURI;
    var grad  = document.createElementNS(svgNS,'linearGradient');
    grad.setAttribute('x1','0%');
    grad.setAttribute('x2','0%');
    grad.setAttribute('y1','0%');
    grad.setAttribute('y2','100%');
    grad.setAttribute('id',gradientId);
    for (var i=0;i<stops.length;i++){
        var attrs = stops[i];
        var stop = document.createElementNS(svgNS,'stop');
        for (var attr in attrs){
            if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
        }
        grad.appendChild(stop);
    }

    var defs = document.querySelector('defs') || svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild );
    return defs.appendChild(grad);

}
