
var maxWidth=Math.max(600,Math.min(window.innerWidth,window.innerHeight)-50);

var outerRadius = (maxWidth / 2),
    innerRadius = outerRadius - 200,
    monthWidth=Math.max(400,(innerRadius*2)-250);


var iText,iChords,eText,eChords;

var angleRange=320,
    baseYear=9,
    maxMonth=5,
    maxYear=3,
    monthOffset=(monthWidth)/(maxYear*30+maxMonth),
    countries,
    e_labels=[],
    e_chords=[],
    i_labels=[],
    i_chords=[],
    topCountryCount=20,
    e_buf_indexByName={},
    e_indexByName = {},
    e_nameByIndex = {},
    i_indexByName = {},
    i_nameByIndex = {},
    i_buf_indexByName={},
    export_countries=[],
    import_countries=[],
    e_colorByName={},
    i_colorByName={},
    months=[],
    monthlyExports=[],
    monthlyImports=[],
    countriesGrouped,
    delay=2000,
    refreshIntervalId,
    year= 0,
    month=-1,
    running=true,
    formatNumber = d3.format(",.0f"),
    formatCurrency = function(d) { return "" + formatNumber(d)},
    eTextUpdate,
    eChordUpdate,
    TextUpdate,
    iChordUpdate;

var toolTip = d3.select(document.getElementById("toolTip"));
var header = d3.select(document.getElementById("head"));
var header1 = d3.select(document.getElementById("header1"));
var header2 = d3.select(document.getElementById("header2"));

var e_fill= d3.scale.ordinal().range(["#00AC6B","#20815D","#007046","#35D699","#60D6A9"]);
var i_fill= d3.scale.ordinal().range(["#EF002A","#B32D45","#9B001C","#F73E5F","#F76F87"]);

var monthsMap=["1","2","3","4","5","6", "7", "8", "9", "10", "11", "12","13","14","15","16","17","18", "19","20","21","22","23","24","25", "26","27","28","29","30"];

d3.select(document.getElementById("bpg"))
    .style("min-width",(outerRadius*2 + 150) + "px");


var playPause=d3.select(document.getElementById("playPause"));

d3.select(document.getElementById("imgDiv"));

var svg = d3.select(document.getElementById("svgDiv"))
    .style("width", (outerRadius*2) + "px")
    .style("height", (outerRadius*2-80) + "px")
    .append("svg")
    .attr("id","svg")
    .style("width", (outerRadius*2) + "px")
    .style("height", (outerRadius*2) + "px");


var export_chord = d3.layout.arc_chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)
    .yOffsetFactor(-0.8);

var import_chord = d3.layout.arc_chord()
    .padding(.05)
    .yOffsetFactor(0.7)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 5);


var dGroup = svg.append("g")
    .attr("class","mainLabel")

dGroup.append("text")
    .attr("class","mainLabel")
    .attr("transform", "translate(" + (outerRadius - 20) + ","  + (outerRadius + 30) +")")
    .style("font-size","0px");

dGroup.append("text")
.attr("class","date")
.attr("transform", "translate(" + (outerRadius - 120) + ","  + (outerRadius + 30) +")")
.style("font-size","0px");

dGroup.append("text")
    .attr("class","secondLabel")
    .attr("transform", "translate(" + (outerRadius - 90) + ","  + (outerRadius * 1.15) +")")
    .text("Nexon Korea Intelligence Labs NXlog Team")
    .style("font-size","0px");

var sGroup = svg.append("g")
    .attr("class","subLabel")

sGroup.append("text")
    .attr("class","subLabel")
    .attr("transform", "translate(" + (outerRadius - 180) + ","  + (outerRadius - 30) +")")
    .text("")
    .style("font-size","20px");


var gY=(outerRadius-(innerRadius *.8/2));

gradientGroup =svg.append("g")
    .attr("class","gradient")
    .attr("transform","translate(" + (outerRadius-6) + "," + (gY+70)  + ")" );

gradientGroup.append("rect")
    .attr("height",((outerRadius + innerRadius *.7/2)-gY))
    .attr("width",0)
    .style("fill","url(#gradient1)");

var mGroup=svg.append("g")
    .attr("class","months")
    .style("cursor","pointer")
    .attr("transform", "translate(" + (outerRadius-monthWidth/2-20) + ","  + 20 + ")");

var eGroup=svg.append("g")
    .attr("class","exports")
    .attr("transform", "translate(" + outerRadius + "," + (outerRadius+70) + ")");

var iGroup=svg.append("g")
    .attr("class","imports")
    .attr("transform", "translate(" + outerRadius + "," + (outerRadius+70) + ")");


    function initialize() {

        var count=maxYear*30+maxMonth;
    
        for (var i=0; i < count; i++) {
            var o={};
            o.index=i;
            o.month=monthsMap[i % 30];
            o.year=baseYear + Math.floor(i/30);
            months.push(o);
        }
    
        for (var i=0; i < topCountryCount; i++) {
            var l={};
            l.index=i;
            l.label="null";
            l.angle=0;
            e_labels.push(l);
    
            var c={}
            c.label="null";
            c.source={};
            c.target={};
            e_chords.push(c);
    
            var l1={};
            l1.index=i;
            l1.label="null";
            l1.angle=0;
            i_labels.push(l1);
    
            var c1={}
            c1.label="null";
            c1.source={};
            c1.target={};
            i_chords.push(c1);
        }
    
        createVerticalGradient('svg','gradient1',[
            {offset:'0%', 'stop-color':'#00AC6B'},
            {offset: '40%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
            {offset: '60%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
            {offset:'100%','stop-color':'#9B001C'}]);
    
    
    
        gradientGroup.transition()
            .select("rect")
            .delay(delay*1.5)
            .attr("width",12);
    
        dGroup.transition()
            .selectAll("text")
            .delay(delay*1.5)
            .style("font-size","10px");
    }

    playPause.on("click",stopStart);

function stopStart() {
    if (running==true) {
        running=false;
        clearInterval(refreshIntervalId);
        playPause.attr("src","../img/play_bw.png");
        // eChords.interrupt();
        // iChords.interrupt();
        // iText.interrupt();
        // eText.interrupt();

    }
    else {
        running=true;
        playPause.attr("src","../img/pause_bw.png");
        update(year,month);
        refreshIntervalId=setInterval(run,delay);
    }
}

function node_onMouseOver(d) {
    var t;
    if (typeof d.imports == "undefined") {
        t="Log Size : " + formatCurrency(Number(d.exports));
    }
    else {
        t="Log Size : " + formatCurrency(Number(d.imports));
    }
    toolTip.transition()
        .duration(200)
        .style("opacity", ".9");
    header.text((d.index+1) + ". " + d.label);
    header1.text((baseYear+year) + '/' + monthsMap[month]);
    header2.text(t);
    toolTip.style("left", (d3.event.pageX+15) + "px")
        .style("top", (d3.event.pageY-75) + "px");
}

function node_onMouseOut(d) {

    toolTip.transition()									// declare the transition properties to fade-out the div
        .duration(500)									// it shall take 500ms
        .style("opacity", "0");							// and go all the way to an opacity of nil

}
/** Returns an event handler for fading a given chord group. */
function fade(opacity) {

    return;

    return function(g, i) {
        svg.selectAll("path.chord")
            .filter(function(d) {
                //  return true;
                return d.source.index != i && d.target.index != i;
            })
            .transition()
            .style("opacity", opacity);
    };
}



/**
 *
 * DATA SOURCE:  http://www.census.gov/foreign-trade/statistics/country/
 *
 */

function fetchData() {

    var normalized=[];

    normalized = logSizeList;

    countriesGrouped = d3.nest()
        .key(function(d) { return d.Year; })
        .key(function(d) { return d.Month; })
        .entries(normalized);

    //Sum total deficit for each month
    var totalImport=0;
    var totalExport=0;

    for (var y=0; y < countriesGrouped.length; y++) {
        var yearGroup=countriesGrouped[y];
        for (var m=0; m < yearGroup.values.length; m++) {
            var monthGroup=yearGroup.values[m];
            for (var c=0; c < monthGroup.values.length; c++) {
                var country=monthGroup.values[c];

                totalImport= Number(totalImport) + Number(country.Imports);
                totalExport=Number(totalExport) + Number(country.Exports);
            }
            //    console.log("totalExport=" + String(totalExport));

            monthlyExports.push(totalImport);
            monthlyImports.push(totalExport);
        }

    }

        //Start running
    run();
    refreshIntervalId = setInterval(run, delay);
    // run();

    // d3.csv("../../data/ustrade_2000-2013.csv", function(csv) {
    // });

}



function buildChords(y,m) {

    countries=countriesGrouped[y].values[m].values;

    countries.sort(function (a,b) {
        //Descending Sort
        if (a.Exports > b.Exports) return -1;
        else if (a.Exports < b.Exports) return 1;
        else return 0;
    });

    export_countries=countries.slice(0,topCountryCount);

    countries.sort(function (a,b) {
        //Descending Sort
        if (a.Imports > b.Imports) return -1;
        else if (a.Imports < b.Imports) return 1;
        else return 0;
    });

    import_countries=countries.slice(0,topCountryCount);

    var  import_matrix = [],
        export_matrix = [];

    e_buf_indexByName=e_indexByName;
    i_buf_indexByName=i_indexByName;

    e_indexByName=[];
    e_nameByIndex=[];
    i_indexByName=[];
    i_nameByIndex=[];
    n = 0;

    // Compute a unique index for each package name
    totalExports=0;
    export_countries.forEach(function(d) {
        totalExports+= Number(d.Exports);
        d = d.Country;
        if (!(d in e_indexByName)) {
            e_nameByIndex[n] = d;
            e_indexByName[d] = n++;
        }
    });

    export_countries.forEach(function(d) {
        var source = e_indexByName[d.Country],
            row = export_matrix[source];
        if (!row) {
            row = export_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[e_indexByName[d.Country]]= d.Exports;
    });

    // Compute a unique index for each country name.
    n=0;
    totalImports=0;
    import_countries.forEach(function(d) {
        totalImports+= Number(d.Imports);
        d = d.Country;
        if (!(d in i_indexByName)) {
            i_nameByIndex[n] = d;
            i_indexByName[d] = n++;
        }
    });

    import_countries.forEach(function(d) {
        var source = i_indexByName[d.Country],
            row = import_matrix[source];
        if (!row) {
            row = import_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[i_indexByName[d.Country]]= d.Imports;
    });

    var exportRange=angleRange*(totalExports/(totalExports + totalImports));
    var importRange=angleRange*(totalImports/(totalExports + totalImports));
    export_chord.startAngle(-(exportRange/2))
        .endAngle((exportRange/2));

    import_chord.startAngle(180-(importRange/2))
        .endAngle(180+(importRange/2));

    import_chord.matrix(import_matrix);
    export_chord.matrix(export_matrix);

    var tempLabels=[];
    var tempChords=[];

    for (var i=0; i < e_labels.length; i++) {
        e_labels[i].label='null';
        e_chords[i].label='null';
    }

    for (var i=0; i < export_chord.groups().length; i++) {
        var d={}
        var g=export_chord.groups()[i];
        var c=export_chord.chords()[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2;
        d.label = e_nameByIndex[g.index];
        d.exports= c.source.value;
        var bIndex=e_buf_indexByName[d.label];
        if (typeof bIndex != 'undefined') {  //Country already exists so re-purpose node.
            e_labels[bIndex].angle= d.angle;
            e_labels[bIndex].label= d.label;
            e_labels[bIndex].index= i;
            e_labels[bIndex].exports= d.exports;

            e_chords[bIndex].index= i;
            e_chords[bIndex].label= d.label;
            e_chords[bIndex].source= c.source;
            e_chords[bIndex].target= c.target;
            e_chords[bIndex].exports = d.exports;

        }
        else { //Country doesnt currently exist so save for later
            tempLabels.push(d);
            tempChords.push(c);
        }
    }

    //Now use up unused indexes
    for (var i=0; i < e_labels.length; i++) {
        if (e_labels[i].label=="null") {
            var o=tempLabels.pop();
            e_labels[i].index=e_indexByName[o.label];
            e_labels[i].label= o.label;
            e_labels[i].angle= o.angle;
            e_labels[i].exports= o.exports;

            var c=tempChords.pop();
            e_chords[i].label= o.label;
            e_chords[i].index= i;
            e_chords[i].source= c.source;
            e_chords[i].target= c.target;
            e_chords[i].exports= c.exports;

        }
    }


    tempLabels=[];
    tempChords=[];

    for (var i=0; i < i_labels.length; i++) {
        i_labels[i].label='null';
        i_chords[i].label='null';
    }

    for (var i=0; i < import_chord.groups().length; i++) {
        var d={}
        var g=import_chord.groups()[i];
        var c=import_chord.chords()[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2;
        d.label = i_nameByIndex[g.index];
        d.imports = c.source.value;
        var bIndex=i_buf_indexByName[d.label];
        if (typeof bIndex != 'undefined') {  //Country already exists so re-purpose node.
            i_labels[bIndex].angle= d.angle;
            i_labels[bIndex].label= d.label;
            i_labels[bIndex].imports= d.imports;
            i_labels[bIndex].index= i;

            i_chords[bIndex].index= i;
            i_chords[bIndex].label= d.label;
            i_chords[bIndex].source= c.source;
            i_chords[bIndex].target= c.target;
            i_chords[bIndex].imports= d.imports;

        }
        else { //Country doesnt currently exist so save for later
            tempLabels.push(d);
            tempChords.push(c);
        }
    }

    //Now use up unused indexes
    for (var i=0; i < i_labels.length; i++) {
        if (i_labels[i].label=="null") {
            var o=tempLabels.pop();
            i_labels[i].index=i_indexByName[o.label];
            i_labels[i].label= o.label;
            i_labels[i].angle= o.angle;
            i_labels[i].imports= o.imports;

            var c=tempChords.pop();
            i_chords[i].label= o.label;
            i_chords[i].index= i;
            i_chords[i].source= c.source;
            i_chords[i].target= c.target;
            i_chords[i].imports= c.imports;

        }
    }

    function getFirstIndex(index,indexes) {
        for (var i=0; i < topCountryCount; i++) {
            var found=false;
            for (var y=index; y < indexes.length; y++) {
                if (i==indexes[y]) {
                    found=true;
                }
            }
            if (found==false) {
                return i;
                //  break;
            }
        }
        //      console.log("no available indexes");
    }

    function getLabelIndex(name) {
        for (var i=0; i < topCountryCount; i++) {
            if (e_buffer[i].label==name) {
                return i;
                //   break;
            }
        }
        return -1;
    }


}

function update(y,m) {

    updateMonths(y,m);

    buildChords(y,m);

   // mainLabel.style("font-size",innerRadius *.05);

    eText = eGroup.selectAll("g.group")
        .data(e_labels, function (d) {
            return d.label;
        });

    iText = iGroup.selectAll("g.group")
        .data(i_labels, function (d) {
            return d.label;
        });

    eChords=eGroup.selectAll("g.chord")
        .data(e_chords, function (d) {
            return d.label;
        });

    iChords=iGroup.selectAll("g.chord")
        .data(i_chords, function (d) {
            return d.label;
        });

    var td=((monthlyExports[y*30+m] / 1024 / 1024))

    console.log(monthlyImports[y*30+m]);
    console.log(monthlyExports[y*30+m]);

    var fs=innerRadius *.1;
    td=formatCurrency(td);
    td = td + ' GB'


    dGroup.transition()
        .select("text")
        .delay(delay)
        .text(td)
        .attr("transform", "translate(" + (outerRadius - (td.length * fs/2)/2 + 30) + ","  + (outerRadius*1.1) +")")
        .style("font-size", fs + "px");

    sGroup.transition()
        .select("text")
        .delay(delay)
        .text((y+ baseYear)+ '/' + (m + 1))
        .attr("transform", "translate(" + (outerRadius - (td.length * fs/2)/2 - 40) + ","  + (outerRadius*1.1) +")")
        .style("font-size", fs + "px");

    eText.enter()
        .append("g")
        .attr("class", "group")
        .append("text")
        .attr("class","export")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); });

    eText.transition()
        .duration(delay-10)
        .select("text")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; });

    eText.exit().remove();

    eChords.enter()
        .append("g")
        .attr("class","chord")
        .append("path")
        .attr("class","chord")
        .style("stroke", function(d) { return d3.rgb(getExportColor(d.source.index)).darker(); })
        .style("fill", function(d) { return getExportColor(d.source.index); })
        .style("fill-opacity", function (d,i) { return .85*(topCountryCount- d.index)/topCountryCount})
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .style("opacity",0)
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); });


    eChords.transition()
        .select("path")
        .duration(delay)
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .style("stroke", function(d) { return d3.rgb(getExportColor(d.source.index)).darker(); })
        .style("fill", function(d) { return getExportColor(d.source.index); })
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topCountryCount-d.index)/topCountryCount,.2);})
        .style("fill-opacity", function (d,i) { return .85*(topCountryCount-d.index)/topCountryCount})
        .style("opacity",1);


    eChords.exit()
        .remove();

    iText.enter()
        .append("g")
        .attr("class", "group")
        .append("text")
        .attr("class","import")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); });

    iText.transition()
        .select("text")
        .duration(delay-10)
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; });

    iText.exit()
        .attr("class", "exit")
        .transition()
        .duration(delay)
        .attr("y",0)
        .attr("fill-opacity",1e-6)
        .remove();

    iChords.enter()
        .append("g")
        .attr("class","chord")
        .append("path")
        .attr("class","chord")
        .style("stroke", function(d) { return d3.rgb(getImportColor(d.source.index)).darker(); })
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topCountryCount-d.index)/topCountryCount,.2);})
        .style("fill", function(d) { return getImportColor(d.source.index); })
        .style("fill-opacity", function (d,i) { return .7*(topCountryCount- d.index)/topCountryCount})
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); });

    iChords.transition()
        .select("path")
        .duration(delay-10)
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .style("stroke", function(d) { return d3.rgb(getImportColor(d.source.index)).darker(); })
        .style("fill", function(d) { return  getImportColor(d.source.index); })
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topCountryCount-d.index)/topCountryCount,.2);})
        .style("fill-opacity", function (d,i) { return .7*(topCountryCount- d.index)/topCountryCount});


    iChords.exit()
        .remove();

}

function updateMonths(y,m) {

    var monthAxis=mGroup.selectAll("g.month")
        .data(months);

    monthEnter= monthAxis.enter()
        .append("g")
        .attr("class","month");

    monthEnter.append("line")
        .attr("x1",function (d,i) {
            return i*monthOffset;
        })
        .attr("x2",function (d,i) { return i*monthOffset; })
        .attr("y1",function (d,i) {
            var ratio=(y*30+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .attr("y2",22)
        .attr("shape-rendering","crispEdges")
        .style("stroke-opacity", function (d,i) {
            var ratio=(y*30+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");



    monthEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*monthOffset-10) + ",-2)"; })
        .text(function(d,i) { return monthsMap[i % 30]; })
        .style("fill-opacity",function (d,i) { return (i==0) ? 1:0;});

    monthEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*monthOffset-10) + ",33)"; })
        .text(function(d,i) {
            if ((i==0) || (i % 30==0)) {

                var result = baseYear + Math.floor(i/30);
                if(result === 9){
                    result = 'sep'
                }
                else if(result === 10){
                    result = 'oct'
                }
                else if(result === 11){
                    result = 'nov'
                }
                else if(result === 12){
                    result = 'dec'
                }

                return  result;
            }
            else
                return "";
        })
        .on("click",function (d) {
            year= Math.floor(d.index/30);
            month=0;
            if (running==true) stopStart();
            update(year,month);
            //          console.log("y=" + y + " m=" + m);
        });

    monthUpdate=monthAxis.transition();

    monthUpdate.select("text")
        .delay(delay/2)
        .style("fill-opacity",function (d) {
            if (d.index==(y*30+m)) {
                return 1;
            }
            else
                return 0;
        });

    monthUpdate.select("line")
        .delay(delay/2)
        .attr("y1",function (d,i) {
            var ratio=(y*30+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .style("stroke-width",function (d,i) {
            var ratio=(y*30+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 2.5;
            else
                return 2;
        })
        .style("stroke-opacity", function (d,i) {
            var ratio=(y*30+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");

}


function getExportColor(i) {
    var country=e_nameByIndex[i];
    if (e_colorByName[country]==undefined) {
        e_colorByName[country]=e_fill(i);
    }

    return e_colorByName[country];
}

function getImportColor(i) {
    var country=i_nameByIndex[i];
    if (i_colorByName[country]==undefined) {
        i_colorByName[country]=i_fill(i);
    }

    return i_colorByName[country];
}
