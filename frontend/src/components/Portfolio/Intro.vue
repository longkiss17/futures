<style scoped>
.intro {
  position: relative;
  height: 100%;  
  background-image: url(../../assets/svg/bgslide-1.svg);
}
.title {
  position: absolute;
  width: 800px;
  height: 500px;
  left: 15%;
  top: 50%;
  margin-top: -250px;
}
.title > div {
  padding: 20px 0;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}
.name {
  font-size: 36px;
}
.me {
  font-size: 16px;
}
.info {
  overflow: auto;
}
.info dt {
  float: left;
  width: 120px;
  font-size: 16px;
  padding: 5px 0;
}
.info dd {
  float: left;
  width: calc(100% - 120px);
  font-size: 16px;
  font-family:'noto-light';
  padding: 5px 0;
}
#bubble {
  width: 100%;
  height: 100%;
}
.link{position: absolute; bottom: 50px; left: 50px;}
.link span{display: inline-block; border: solid 1px #fff; border-radius: 30px; font-family: sans-serif; vertical-align: middle; margin-right: 5px; cursor:pointer;}
.link span a{color: #fff;}
.link span.git{padding: 10px;}
.link span.mail{padding: 8px 10px;}
.link span.mail img{width: 20px;}
.skill {
  font-family:'noto-light';
  font-size: 16px;
}
</style>
<template>
  <div class="intro">
    <canvas id="bubble"></canvas>
    <div class="link">
      <span class="git">
        <a href="https://github.com/longkiss17" target="_blank">Git</a>
      </span>
      <span class="mail">
        <a href="mailto:longkiss77@naver.com">
          <img src="../../assets/img/mail-icon.png" />
        </a>
      </span>
    </div>
    <div class="title">
      <div class="name">Lee YongCheol</div>
      <div class="me">
        토스팀 Frontend Developer 직군에 지원하게된 이용철입니다.
        <br />현 직장(넥슨코리아)에서 8년간 IT엔지니어로 근무하며 처음으로 이직을 준비하게 되었습니다.
        <br />경력사항 및 자기소개, 그리고 최근 2년간 진행했던 프로젝트를 대략적으로 확인하실 수 있습니다.
      </div>
      <div class="info">
        <dl>
          <dt>나이</dt>
          <dd>83년생</dd>
          <dt>주소</dt>
          <dd>경기도 성남시 분당구 판교로</dd>
          <dt>이메일</dt>
          <dd>longkiss77@naver.com</dd>
          <dt>연락처</dt>
          <dd>82.10.4484.4772</dd>
          <dt>추천인</dt>
          <dd>신지윤</dd>
        </dl>
      </div>
      <div class="skill">
        홈페이지 이력서 제작에 사용된 framework & library
        <br />Javascript(ES6), Vue.js, VueRouter, Vuex, Node.js, Express.js
        <br />Smooth Scrollbar, LavaLamp, vue-agile, D3.js
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro",
  data() {
    return {};
  },
  mounted() {
    (function() {
      "use strict";

      var lava0;
      var ge1doot = {
        screen: {
          elem: null,
          callback: null,
          ctx: null,
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          init: function(id, callback, initRes) {
            this.elem = document.getElementById(id);
            this.callback = callback || null;
            if (this.elem.tagName == "CANVAS")
              this.ctx = this.elem.getContext("2d");

            window.addEventListener(
              "resize",
              function() {
                this.resize();
              }.bind(this),
              false
            );
            this.elem.onselectstart = function() {
              return false;
            };
            this.elem.ondrag = function() {
              return false;
            };
            initRes && this.resize();
            return this;
          },
          resize: function() {
            var o = this.elem;
            this.width = o.offsetWidth;
            this.height = o.offsetHeight;
            for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
              this.left += o.offsetLeft;
              this.top += o.offsetTop;
            }
            if (this.ctx) {
              this.elem.width = this.width;
              this.elem.height = this.height;
            }
            this.callback && this.callback();
          }
        }
      };

      // Point constructor
      var Point = function(x, y) {
        this.x = x;
        this.y = y;
        this.magnitude = x * x + y * y;
        this.computed = 0;
        this.force = 0;
      };
      Point.prototype.add = function(p) {
        return new Point(this.x + p.x, this.y + p.y);
      };

      // Ball constructor
      var Ball = function(parent) {
        var min = 0.1;
        var max = 1.5;
        this.vel = new Point(
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25),
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
        );
        this.pos = new Point(
          parent.width * 0.2 + Math.random() * parent.width * 0.6,
          parent.height * 0.2 + Math.random() * parent.height * 0.6
        );
        this.size =
          parent.wh / 15 +
          (Math.random() * (max - min) + min) * (parent.wh / 15);
        this.width = parent.width;
        this.height = parent.height;
      };

      // move balls
      Ball.prototype.move = function() {
        // bounce borders
        if (this.pos.x >= this.width - this.size) {
          if (this.vel.x > 0) this.vel.x = -this.vel.x;
          this.pos.x = this.width - this.size;
        } else if (this.pos.x <= this.size) {
          if (this.vel.x < 0) this.vel.x = -this.vel.x;
          this.pos.x = this.size;
        }

        if (this.pos.y >= this.height - this.size) {
          if (this.vel.y > 0) this.vel.y = -this.vel.y;
          this.pos.y = this.height - this.size;
        } else if (this.pos.y <= this.size) {
          if (this.vel.y < 0) this.vel.y = -this.vel.y;
          this.pos.y = this.size;
        }

        // velocity
        this.pos = this.pos.add(this.vel);
      };

      // lavalamp constructor
      var LavaLamp = function(width, height, numBalls, c0, c1) {
        this.step = 5;
        this.width = width;
        this.height = height;
        this.wh = Math.min(width, height);
        this.sx = Math.floor(this.width / this.step);
        this.sy = Math.floor(this.height / this.step);
        this.paint = false;
        this.metaFill = createRadialGradient(width, height, width, c0, c1);
        this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
        this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
        this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
        this.ix = [
          1,
          0,
          -1,
          0,
          0,
          1,
          0,
          -1,
          -1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          1,
          1
        ];
        this.grid = [];
        this.balls = [];
        this.iter = 0;
        this.sign = 1;

        // init grid
        for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
          this.grid[i] = new Point(
            (i % (this.sx + 2)) * this.step,
            Math.floor(i / (this.sx + 2)) * this.step
          );
        }

        // create metaballs
        for (var k = 0; k < numBalls; k++) {
          this.balls[k] = new Ball(this);
        }
      };
      // compute cell force
      LavaLamp.prototype.computeForce = function(x, y, idx) {
        var force;
        var id = idx || x + y * (this.sx + 2);

        if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
          force = 0.6 * this.sign;
        } else {
          force = 0;
          var cell = this.grid[id];
          var i = 0;
          var ball;
          while ((ball = this.balls[i++])) {
            force +=
              (ball.size * ball.size) /
              (-2 * cell.x * ball.pos.x -
                2 * cell.y * ball.pos.y +
                ball.pos.magnitude +
                cell.magnitude);
          }
          force *= this.sign;
        }
        this.grid[id].force = force;
        return force;
      };
      // compute cell
      LavaLamp.prototype.marchingSquares = function(next) {
        var x = next[0];
        var y = next[1];
        var pdir = next[2];
        var id = x + y * (this.sx + 2);
        if (this.grid[id].computed === this.iter) {
          return false;
        }
        var dir,
          mscase = 0;

        // neighbors force
        for (var i = 0; i < 4; i++) {
          var idn = x + this.ix[i + 12] + (y + this.ix[i + 16]) * (this.sx + 2);
          var force = this.grid[idn].force;
          if (
            (force > 0 && this.sign < 0) ||
            (force < 0 && this.sign > 0) ||
            !force
          ) {
            // compute force if not in buffer
            force = this.computeForce(
              x + this.ix[i + 12],
              y + this.ix[i + 16],
              idn
            );
          }
          if (Math.abs(force) > 1) mscase += Math.pow(2, i);
        }
        if (mscase === 15) {
          // inside
          return [x, y - 1, false];
        } else {
          // ambiguous cases
          if (mscase === 5) dir = pdir === 2 ? 3 : 1;
          else if (mscase === 10) dir = pdir === 3 ? 0 : 2;
          else {
            // lookup
            dir = this.mscases[mscase];
            this.grid[id].computed = this.iter;
          }
          // draw line
          var ix =
            this.step /
            (Math.abs(
              Math.abs(
                this.grid[
                  x +
                    this.plx[4 * dir + 2] +
                    (y + this.ply[4 * dir + 2]) * (this.sx + 2)
                ].force
              ) - 1
            ) /
              Math.abs(
                Math.abs(
                  this.grid[
                    x +
                      this.plx[4 * dir + 3] +
                      (y + this.ply[4 * dir + 3]) * (this.sx + 2)
                  ].force
                ) - 1
              ) +
              1);
          ctx.lineTo(
            this.grid[
              x + this.plx[4 * dir] + (y + this.ply[4 * dir]) * (this.sx + 2)
            ].x +
              this.ix[dir] * ix,
            this.grid[
              x +
                this.plx[4 * dir + 1] +
                (y + this.ply[4 * dir + 1]) * (this.sx + 2)
            ].y +
              this.ix[dir + 4] * ix
          );
          this.paint = true;
          // next
          return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
        }
      };

      LavaLamp.prototype.renderMetaballs = function() {
        var i = 0,
          ball;
        while ((ball = this.balls[i++])) ball.move();
        // reset grid
        this.iter++;
        this.sign = -this.sign;
        this.paint = false;
        ctx.fillStyle = this.metaFill;
        ctx.beginPath();
        // compute metaballs
        i = 0;
        //ctx.shadowBlur = 50;
        //ctx.shadowColor = "green";
        while ((ball = this.balls[i++])) {
          // first cell
          var next = [
            Math.round(ball.pos.x / this.step),
            Math.round(ball.pos.y / this.step),
            false
          ];
          // marching squares
          do {
            next = this.marchingSquares(next);
          } while (next);
          // fill and close path
          if (this.paint) {
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            this.paint = false;
          }
        }
      };

      // gradients
      var createRadialGradient = function(w, h, r, c0, c1) {
        var gradient = ctx.createRadialGradient(
          w / 1,
          h / 1,
          0,
          w / 1,
          h / 1,
          r
        );
        gradient.addColorStop(0, c0);
        gradient.addColorStop(1, c1);
        return gradient;
      };

      // main loop
      var run = function() {
        requestAnimationFrame(run);
        ctx.clearRect(0, 0, screen.width, screen.height);
        lava0.renderMetaballs();
      };
      // canvas
      var screen = ge1doot.screen.init("bubble", null, true),
        ctx = screen.ctx;
      screen.resize();
      // create LavaLamps
      lava0 = new LavaLamp(
        screen.width,
        screen.height,
        6,
        // "#0077ff",
        // "#6FE6F3"
        "#DDDDDD",
        "#000000"
      );

      run();
    })();
  }
};
</script>
