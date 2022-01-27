<style scoped>
.main{width:100%; height: 100%; background: #000; }
.content{position: absolute; width:100%; height: 100%; z-index: 1000}
.container{width:calc(100% - 40%); height: 100vh; max-width: 1000px; padding: 5% 20%}
.footer{position: fixed; width:100%; height: 100vh; z-index: 999}
.footer .fixed{position: absolute; width:100%; height:400px; bottom: 0px;}
.horizontal{position: fixed; width:400%; height: 100vh; top:0%; z-index: 999}
.horizontal > div{float: left; width:25%; height: 100%; }

.bg-box{position: fixed; width:100%; height:100%; z-index: 2000}
.bg-box div{position: fixed; height: 100%; background: #fff}
.bg-box div:nth-child(1){width:20%; left:0%}
.bg-box div:nth-child(2){width:15%; left:20%}
.bg-box div:nth-child(3){width:15.1%; left:35%}
.bg-box div:nth-child(4){width:15%; left:50%}
.bg-box div:nth-child(5){width:15%; left:65%}
.bg-box div:nth-child(6){width:20%; left:80%}

.bg-box-on{transform: rotate(180deg)}
.bg-box-on div:nth-child(1){animation-delay: .5s}
.bg-box-on div:nth-child(2){animation-delay: .4s}
.bg-box-on div:nth-child(3){animation-delay: .3s}
.bg-box-on div:nth-child(4){animation-delay: .2s}
.bg-box-on div:nth-child(5){animation-delay: .1s}
.bg-box-on div:nth-child(6){animation-delay: .0s}

.bg-box-off div{opacity: 0;}
.bg-box-off div:nth-child(1){animation-delay: .0s}
.bg-box-off div:nth-child(2){animation-delay: .1s}
.bg-box-off div:nth-child(3){animation-delay: .2s}
.bg-box-off div:nth-child(4){animation-delay: .3s}
.bg-box-off div:nth-child(5){animation-delay: .4s}
.bg-box-off div:nth-child(6){animation-delay: .5s}

.bg-box-over{animation:bgOver .5s ease-in-out forwards;}
.bg-box-out{animation:bgOut .5s ease-in-out forwards;}

.bg-line{position: fixed; width:100%; height:100%;}
.bg-line div{position: fixed; height: 100%; border-right: solid 1px #bbb; opacity: .2;}
.bg-line div:nth-child(1){width:20%;}
.bg-line div:nth-child(2){width:15%; left:20%}
.bg-line div:nth-child(3){width:50%; left:30%}

.progress-bar{position: fixed; width:2px; height:100vh; left:0; z-index: 10000; }
.progress-bar .progress-line{width:inherit; background: #fff;}

@keyframes bgOver { from {width:0%; opacity: 1;} to {opacity: 1;}}
@keyframes bgOut { from {} to {width:0%}}

.lee{position: fixed; left:5%; top:5%; cursor: pointer; z-index: 2000}
.navi{position: fixed; right: -15%; top:40%; transform: rotateZ(90deg); z-index: 2000}
.navi li{float: left; padding: 10px 30px; cursor: pointer}

.E-left-stroke {stroke-dasharray: 124px;stroke-dashoffset: 124px;animation: E-left-move 30s ease forwards;}
.E-top-stroke {stroke-dasharray: 47px;stroke-dashoffset: 47px;animation: E-top-move 20s ease forwards;}
.E-mid-stroke {stroke-dasharray: 42px;stroke-dashoffset: 42px;animation: E-mid-move 20s ease forwards;}
.E-bottom-stroke {stroke-dasharray: 47px;stroke-dashoffset: 47px;animation: E-bottom-move 20s ease forwards;}
.E-left-stroke-2 {stroke-dasharray: 124px;stroke-dashoffset: 124px;animation: E-left-move 20s ease forwards;}
.E-top-stroke-2 {stroke-dasharray: 47px;stroke-dashoffset: 47px;animation: E-top-move 10s ease forwards;}
.E-mid-stroke-2 {stroke-dasharray: 42px;stroke-dashoffset: 42px;animation: E-mid-move 10s ease forwards;}
.E-bottom-stroke-2 {stroke-dasharray: 47px;stroke-dashoffset: 47px;animation: E-bottom-move 10s ease forwards;}

@keyframes E-left-move {
  0% {stroke-dashoffset: 124px;}
  2% {stroke-dashoffset: 124px;}
  6% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

@keyframes E-top-move {
  0% {stroke-dashoffset: 47px;}
  6% {stroke-dashoffset: 47px;}
  11% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

@keyframes E-mid-move {
  0% {stroke-dashoffset: 42px;}
  8% {stroke-dashoffset: 42px;}
  13% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

@keyframes E-bottom-move {
  0% {stroke-dashoffset: 47px;}
  11% {stroke-dashoffset: 47px;}
  16% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

.L-one-long-stroke {stroke-dasharray: 124px;stroke-dashoffset: 124px;animation: L-one-long-move 20s ease forwards;}
.L-one-short-stroke {stroke-dasharray: 44px;stroke-dashoffset: 44px;animation: L-one-short-move 10s ease forwards;}

@keyframes L-one-long-move {
  0% {stroke-dashoffset: 124px;}
  2% {stroke-dashoffset: 124px;}
  7% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

@keyframes L-one-short-move {
  0% {stroke-dashoffset: 44px;}
  13% {stroke-dashoffset: 44px;}
  18% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

.L-two-long-stroke {stroke-dasharray: 124px;stroke-dashoffset: 124px;animation: L-two-long-move 20s ease forwards;}
.L-two-short-stroke {stroke-dasharray: 44px;stroke-dashoffset: 44px;animation: L-two-short-move 10s ease forwards;}

@keyframes L-two-long-move {
  0% {stroke-dashoffset: 124px;}
  3% {stroke-dashoffset: 124px;}
  8% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

@keyframes L-two-short-move {
  0% {stroke-dashoffset: 44px;}
  15% {stroke-dashoffset: 44px;}
  20% {stroke-dashoffset: 0px;}
  100% {stroke-dashoffset: 0px;}
}

</style>
<template>
  <div class="main">
    <div class="progress-bar">
      <div class="progress-line" :style="{height: progressLineHeight + 'px'}"></div>
    </div>
    <div style="position: fixed; top:20%; right:0%; z-index: 100000">
      <button @click="slide = !slide">click2</button>
    </div>
    <div class="bg-line">
      <template v-for="index in 3">
        <div :key="index"></div>
      </template>
    </div>
    <div class="bg-box bg-box-on" v-if="!showsBG && showsBGEnd">
      <template v-for="index in 6">
        <div :class="[ showsBG ? '' : 'bg-box-out']" :key="index"></div>
      </template>
    </div>
    <div class="bg-box bg-box-off" v-if="showsBG">
      <template v-for="index in 6">
        <div :class="[ showsBG ? 'bg-box-over' : '']" :key="index"></div>
      </template>
    </div>
    <div class="lee">
      <svg width="220" height="110" viewBox="0 0 300 150" @click="show();">
        <g id="L-two-letter">
          <line
            class="L-two-long-stroke"
            x1="44"
            y1="0"
            x2="44"
            y2="124"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
          <line
            class="L-two-short-stroke"
            x1="60"
            y1="107"
            x2="104"
            y2="107"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
        </g>
        <g id="E-letter">
          <line
            class="E-left-stroke"
            x1="238"
            y1="0"
            x2="238"
            y2="124"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
          <line
            class="E-top-stroke"
            x1="254"
            y1="17"
            x2="301"
            y2="17"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
          <line
            class="E-mid-stroke"
            x1="254"
            y1="62"
            x2="296"
            y2="62"
            stroke="#FFF"
            fill="none"
            stroke-width="28"
          />
          <line
            class="E-bottom-stroke"
            x1="254"
            y1="107"
            x2="301"
            y2="107"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
        </g>
        <g id="E-letter">
          <line
            class="E-left-stroke-2"
            x1="138"
            y1="0"
            x2="138"
            y2="124"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
          <line
            class="E-top-stroke-2"
            x1="154"
            y1="17"
            x2="201"
            y2="17"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
          <line
            class="E-mid-stroke-2"
            x1="154"
            y1="62"
            x2="196"
            y2="62"
            stroke="#FFF"
            fill="none"
            stroke-width="28"
          />
          <line
            class="E-bottom-stroke-2"
            x1="154"
            y1="107"
            x2="201"
            y2="107"
            stroke="#FFF"
            fill="none"
            stroke-width="34"
          />
        </g>
      </svg>
    </div>
    <div class="navi">
      <ul>
        <li @click="go(0)">step 01</li>
        <li @click="go(1)">step 02</li>
        <li @click="go(2)">step 03</li>
        <li @click="go(3)">step 04</li>
        <li @click="go(4)">step 05</li>
        <li @click="go(5)">step 06</li>
        <li @click="go(6)">step 07</li>
        <li @click="go(8)">step 07</li>
      </ul>
    </div>

    <div class="content" id="content">
      <div class="container"></div>
      <div class="container">
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
      <div class="container" style="height:400vh; background: transparent;">box03</div>
      <div class="container">
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
      <div class="container" style="background:transparent">
        <div style="width:100%; height:400px; background:#333"></div>
      </div>
    </div>
    <div class="footer" v-show="showsFooter">
      <div class="fixed">
        <p>
          메타데이터는 게임 개발에 필요한 데이터의 구조화된 데이터로 다른 데이터를 설명해주는 속성 정보입니다.
          NXLog Management Console 사용자는 메타데이터를 등록/수정/삭제하여 메타데이터를 관리 할 수 있으며, 등록된 메타데이터를 시점 내 항목과 연동하여 지표를 구성하실 수 있습니다.
          등록된 메타데이터는 S3에 Json형태로 저장되며, S3 또는 현재 페이지에서 업로드 결과를 확인할 수 있습니다.
          메타데이터 복구 등 그 외 문의사항은 NXLog팀 nxlog@nexon.co.kr으로 문의 부탁드립니다.
        </p>
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
    </div>

    <div class="horizontal" v-show="current >= 2" :style="{marginLeft: horizon.marginLeft + 'px'}">
      <div>
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
      <div>
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
      <div>
        <p>There are a lot more search engines on the Internet than you would have thought, and their usage mainly depends on geographic location. For example, Yandex is very popular in Russia (more popular than Google), whereas in China Baidu is the most used search engine. According to a Q4 2016 research by Statista, these are the four biggest search engines:</p>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";
import D3v3 from "d3-3";

export default {
  data() {
    return {
      showsBG: false,
      showsBGEnd: false,
      showsFooter: false,
      scrollbar: {},
      progressLineHeight: 0,
      horizon: {
        marginLeft: 0,
        top: 0
      },
      current: 0,
      svg: {}
    };
  },
  components: {},
  methods: {
    show() {
      this.showsBGEnd = true;
      this.showsBG = !this.showsBG;
      setTimeout(() => {
        this.showsBGEnd = false;
      }, 1000);
    },
    go(index) {
      this.current = index;
      this.scrollbar.scrollTo(
        0,
        this.scrollbar.size.container.height * index,
        600
      );
    },
    calcIndex(y) {
      let h = this.scrollbar.size.container.height;
      let half = h / 2;

      if (y < half) {
        this.current = 0;
      } else {
        for (let i = 1; i <= 7; i++) {
          if (y > half + h * (i - 1) && y <= half + h * i) {
            this.current = i;
          }
        }
      }
    }
  },
  mounted() {
    let Highcharts = this.highcharts;

    this.scrollbar = Scrollbar.init(document.getElementById("content"), {
      damping: 0.05,
      continuousScrolling: true,
      overscrollEffect: true
    });
    const width = this.scrollbar.size.container.width;
    const height = this.scrollbar.size.container.height;
    this.scrollbar.addListener(status => {
      this.calcIndex(status.offset.y);
      this.progressLineHeight = status.offset.y / 7;
      this.showsFooter = this.current === 7;
      if (status.offset.y > (height * 2) / 9) {
        this.horizon.marginLeft =
          width - width * ((status.offset.y - height * 2) / height);
      }
    });
    // Scrollbar.updatePluginOptions("overscroll", {
    //   effect: "bounce"
    // });

    // let d3 = this.d3;
    // let data = [99, 71, 78, 25, 36, 92];

    //   const svg = d3
    //     .select(this.$refs.svg)
    //     .append("svg")
    //     .attr("width", 500)
    //     .attr("height", 270)
    //     .append("g")
    //     .attr("transform", "translate(0, 10)");
    //   const x = d3.scaleLinear().range([0, 430]);
    //   const y = d3.scaleLinear().range([210, 0]);
    //   d3.axisLeft().scale(x);
    //   d3.axisTop().scale(y);
    //   x.domain(d3.extent(data, (d, i) => i));
    //   y.domain([0, d3.max(data, d => d)]);
    //   const createPath = d3
    //     .line()
    //     .x((d, i) => x(i))
    //     .y(d => y(d));
    //   svg
    //     .append("path")
    //     .style("fill", "none")
    //     .style("stroke", "#76bf8a")
    //     .style("stroke-width", "3px")
    //     .attr("d", createPath(data));
  },
  created() {}
};
</script>
