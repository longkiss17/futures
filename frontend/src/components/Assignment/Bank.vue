<style scoped>
.bank{width:100%; position: relative; background: #000}

.tabs{ width:100%; overflow: auto;}
.tabs ul li{float: left; position: relative; width:15%; height:50px; overflow: hidden; text-align: center; cursor: pointer; font-family: 'poppins';}    
.tabs ul li span.line{position: absolute; display: block;  left:50%; width:0%; height:47px; animation:lineOut .5s ease-in-out forwards;}
.tabs ul li:hover span.line{border-bottom: solid 3px #fff; animation:lineOver .5s ease-in-out forwards;}
.tabs ul li span.text{position: absolute; display: block; width:100%; height: 200%; animation:textOut .2s ease-in-out forwards;}
.tabs ul li span.text:hover{animation:textOver .5s ease-in-out forwards; }
.tabs ul li a{display: inline-block; width: 100%; height:calc(50% - 14px);  padding: 5px 0 6px 0; font-family: 'poppins'; font-size: 22px; font-weight: 600; color: #bbb }    
.tabs ul li a.b{color:#fff}
.tabs ul li.active a{color: #f1ef7a; }    
.tabs ul li.active a.creative{text-shadow: 1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;}

.tab-content{width:100%; height: 600px}

.chart-options{width: 100%; overflow: auto;}
.chart-options dt{float: left; width:10%;}
.chart-options dd{float: left; width:90%;}
.chart-options dd span{display: inline-block; padding: 0 10px; cursor: pointer}
.chart-options dd span.on{color: #f1ef7a}

.slide-box{position: relative; width: inherit; height:inherit; overflow: hidden; }
.slide-box .slide-bg{position: absolute; width:inherit; height: inherit; left:-100%; background: #333; animation:1s ease-in-out forwards; z-index: 20;}
.slide-box .slide-bg-show{animation-name:slideShow;}
.slide-box .slide-content{position: absolute; width:inherit; height: inherit; background:transparent; animation:1s ease-in-out forwards; opacity: 0; z-index: 10;}
.slide-box .slide-content-show{animation-name:slideContentShow;}

@keyframes textOver { from {margin-top: 0px;} to {margin-top: -50px}}
@keyframes textOut { from {margin-top: -50px;} to {margin-top: 0px;}}

@keyframes lineOver { from {width: 0%;} to {width: 50%; left:25%;}}
@keyframes lineOut { from {width: 100%} to {width: 0%;}}

@keyframes slideShow { 50% {left:0%;} 100% {left:100%;}}
@keyframes slideContentShow { 50% {opacity:.3} 100% {opacity: 1;}}
</style>
<template>
  <div class="bank">
    <nav class="tabs">
      <ul>
        <template v-for="item in tabs">
          <li
            v-bind:key="item.text"
            :class="[ item.active ? 'active' : '']"
            @click="drawChart(item)"
          >
            <span class="line"></span>
            <span class="text">
              <a href="#" class="t">{{item.text}}</a>
              <a href="#" class="b">{{item.text}}</a>
            </span>
          </li>
        </template>
      </ul>
    </nav>
    <div class="chart-options">
      <dl>
        <dt>Bank</dt>
        <dd>
          <template v-for="bank in bankInfo">
            <span
              :key="bank"
              @click="bankInfoClick(bank)"
              :class="bank.active ? 'on' : ''"
            >{{bank.name}}</span>
          </template>
        </dd>
        <dt>Stat</dt>
        <dd>
          <template v-for="stat in bankStat">
            <span
              :key="stat"
              @click="bankStatClick(stat)"
              :class="stat.active ? 'on' : ''"
            >{{stat.name}}</span>
          </template>
        </dd>
      </dl>
    </div>
    <div class="tab-content">
      <div class="slide-box">
        <div :class="['slide-bg', slide ? 'slide-bg-show' : '']"></div>
        <div :class="['slide-content', slide ? 'slide-content-show' : '']">
          <charts :options="chartOptions"></charts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: true,
      chartOptions: {},
      tabs: [
        { text: "LINE", active: true, chart: { type: "line" }, data: [] },
        {
          text: "PERCENTAGE",
          active: false,
          chart: { type: "area" },
          data: []
        },
        {
          text: "STACKED",
          active: false,
          chart: { type: "area" },
          data: []
        },
        { text: "BAR", active: false, chart: { type: "bar" }, data: [] },
        { text: "COLUMN", active: false, chart: { type: "column" }, data: [] },
        { text: "PIE", active: false, chart: { type: "pie" }, data: [] }
      ],
      bankInfo: [
        {
          name: "시중 은행",
          data: ["국민", "우리", "신한", "한국SC", "하나", "한국씨티", "외환"],
          active: true
        },
        {
          name: "인터넷 은행",
          data: ["카카오뱅크", "케이뱅크"],
          active: false
        },
        {
          name: "지방 은행",
          data: ["대구", "부산", "광주", "제주", "전북", "경남"],
          active: false
        },
        {
          name: "특수 은행",
          data: ["산업", "기업", "수출입", "농협", "수협"],
          active: false
        }
      ],
      bankStat: [
        { name: "총 자산", value: "asset", active: true },
        { name: "은행 계정", value: "asset_A", active: false },
        { name: "신탁 계정", value: "asset_B", active: false },
        { name: "종금 계정", value: "asset_C", active: false },
        // { name: "신탁계정 대", value: "asset_D_1", active: false },
        // { name: "신탁계정 차", value: "asset_D_2", active: false },
        // { name: "종금계정 대", value: "asset_D_3", active: false },
        // { name: "종금계정 차", value: "asset_D_4", active: false },
        // { name: "신용카드 채권매출", value: "asset_D_5", active: false },
        { name: "납입 자본", value: "paidin_capital", active: false },
        { name: "자기 자본", value: "equity_capital", active: false }
      ]
    };
  },
  mounted() {},
  created() {
    this.chartOptions = {
      chart: {
        height: "600px",
        type: "area"
      },
      title: {
        text: "Solar Employment Growth by Sector, 2010-2016"
      },
      subtitle: {
        text: "Source: thesolarfoundation.com"
      },

      yAxis: {
        title: {
          text: "Number of Employees"
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    };

    this.drawChart();
  },
  methods: {
    bankInfoClick(bank) {
      this.bankInfo.forEach(b => {
        b.active = false;
      });
      bank.active = true;

      this.drawChart();
    },
    bankStatClick(stat) {
      this.bankStat.forEach(s => {
        s.active = false;
      });
      stat.active = true;

      this.drawChart();
    },
    drawChart(t) {
      let tab = t;

      if (!tab) {
        tab = this.tabs.find(t => {
          return t.active;
        });
      }

      this.tabs.forEach(t => {
        t.active = false;
      });
      tab.active = true;

      let data = [
        {
          name: "우리",
          asset_A: 2560713,
          asset_B: 312260,
          asset_C: 0,
          asset_D_1: 29491,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2843482,
          paidin_capital: 33814,
          equity_capital: 178564,
          year: 2014
        },
        {
          name: "신한",
          asset_A: 2371490,
          asset_B: 309861,
          asset_C: 49563,
          asset_D_1: 16186,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 294,
          asset_D_5: 0,
          asset: 2714433,
          paidin_capital: 79281,
          equity_capital: 203719,
          year: 2014
        },
        {
          name: "한국SC",
          asset_A: 599590,
          asset_B: 23970,
          asset_C: 0,
          asset_D_1: 319,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 623240,
          paidin_capital: 13130,
          equity_capital: 46642,
          year: 2014
        },
        {
          name: "외환",
          asset_A: 1049697,
          asset_B: 294714,
          asset_C: 24363,
          asset_D_1: 4002,
          asset_D_2: 0,
          asset_D_3: 779,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 1363992,
          paidin_capital: 25845,
          equity_capital: 88138,
          year: 2014
        },
        {
          name: "한국씨티",
          asset_A: 499027,
          asset_B: 196743,
          asset_C: 0,
          asset_D_1: 1829,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 693941,
          paidin_capital: 15914,
          equity_capital: 63595,
          year: 2014
        },
        {
          name: "국민",
          asset_A: 2712526,
          asset_B: 316774,
          asset_C: 0,
          asset_D_1: 9504,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3019797,
          paidin_capital: 20219,
          equity_capital: 218454,
          year: 2014
        },
        {
          name: "하나",
          asset_A: 1646247,
          asset_B: 219215,
          asset_C: 0,
          asset_D_1: 4436,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 1861027,
          paidin_capital: 11474,
          equity_capital: 120243,
          year: 2014
        },
        {
          name: "대구",
          asset_A: 398070,
          asset_B: 54214,
          asset_C: 0,
          asset_D_1: 1865,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 450420,
          paidin_capital: 6606,
          equity_capital: 31086,
          year: 2014
        },
        {
          name: "부산",
          asset_A: 460822,
          asset_B: 53255,
          asset_C: 0,
          asset_D_1: 1257,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 512820,
          paidin_capital: 9484,
          equity_capital: 34217,
          year: 2014
        },
        {
          name: "광주",
          asset_A: 171398,
          asset_B: 23367,
          asset_C: 0,
          asset_D_1: 284,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 194481,
          paidin_capital: 2566,
          equity_capital: 13430,
          year: 2014
        },
        {
          name: "제주",
          asset_A: 34638,
          asset_B: 837,
          asset_C: 0,
          asset_D_1: 49,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 35425,
          paidin_capital: 1106,
          equity_capital: 3055,
          year: 2014
        },
        {
          name: "전북",
          asset_A: 133912,
          asset_B: 1953,
          asset_C: 0,
          asset_D_1: 62,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 135803,
          paidin_capital: 3741,
          equity_capital: 9144,
          year: 2014
        },
        {
          name: "경남",
          asset_A: 328067,
          asset_B: 44910,
          asset_C: 0,
          asset_D_1: 539,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 372438,
          paidin_capital: 3921,
          equity_capital: 21457,
          year: 2014
        },
        {
          name: "카카오뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2014
        },
        {
          name: "케이뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2014
        },
        {
          name: "산업",
          asset_A: 2178332,
          asset_B: 308274,
          asset_C: 0,
          asset_D_1: 5429,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2481177,
          paidin_capital: 151804,
          equity_capital: 254126,
          year: 2014
        },
        {
          name: "기업",
          asset_A: 2079304,
          asset_B: 162614,
          asset_C: 0,
          asset_D_1: 12609,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2229309,
          paidin_capital: 32559,
          equity_capital: 152826,
          year: 2014
        },
        {
          name: "수출입",
          asset_A: 730737,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 730737,
          paidin_capital: 77481,
          equity_capital: 98802,
          year: 2014
        },
        {
          name: "농협",
          asset_A: 2085766,
          asset_B: 267970,
          asset_C: 0,
          asset_D_1: 10590,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2343146,
          paidin_capital: 20740,
          equity_capital: 139439,
          year: 2014
        },
        {
          name: "수협",
          asset_A: 227920,
          asset_B: 49973,
          asset_C: 0,
          asset_D_1: 169,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 277724,
          paidin_capital: 11581,
          equity_capital: 10715,
          year: 2014
        },
        {
          name: "우리",
          asset_A: 2765769,
          asset_B: 341356,
          asset_C: 0,
          asset_D_1: 37948,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3069176,
          paidin_capital: 33814,
          equity_capital: 188893,
          year: 2015
        },
        {
          name: "신한",
          asset_A: 2637268,
          asset_B: 373039,
          asset_C: 53033,
          asset_D_1: 24341,
          asset_D_2: 0,
          asset_D_3: 119,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3038879,
          paidin_capital: 79281,
          equity_capital: 204681,
          year: 2015
        },
        {
          name: "한국SC",
          asset_A: 562947,
          asset_B: 25810,
          asset_C: 0,
          asset_D_1: 412,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 588345,
          paidin_capital: 13130,
          equity_capital: 44149,
          year: 2015
        },
        {
          name: "하나",
          asset_A: 2795866,
          asset_B: 510740,
          asset_C: 25656,
          asset_D_1: 25337,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 2323,
          asset_D_5: 0,
          asset: 3304603,
          paidin_capital: 53596,
          equity_capital: 213721,
          year: 2015
        },
        {
          name: "한국씨티",
          asset_A: 499307,
          asset_B: 175615,
          asset_C: 0,
          asset_D_1: 1424,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 673498,
          paidin_capital: 15914,
          equity_capital: 64536,
          year: 2015
        },
        {
          name: "국민",
          asset_A: 2855284,
          asset_B: 379709,
          asset_C: 0,
          asset_D_1: 9810,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3225183,
          paidin_capital: 20219,
          equity_capital: 225804,
          year: 2015
        },
        {
          name: "대구",
          asset_A: 442724,
          asset_B: 63192,
          asset_C: 0,
          asset_D_1: 1576,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 504340,
          paidin_capital: 6806,
          equity_capital: 34666,
          year: 2015
        },
        {
          name: "부산",
          asset_A: 499193,
          asset_B: 68262,
          asset_C: 0,
          asset_D_1: 2103,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 565352,
          paidin_capital: 9594,
          equity_capital: 37945,
          year: 2015
        },
        {
          name: "광주",
          asset_A: 195744,
          asset_B: 25731,
          asset_C: 0,
          asset_D_1: 451,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 221024,
          paidin_capital: 2566,
          equity_capital: 13943,
          year: 2015
        },
        {
          name: "제주",
          asset_A: 44525,
          asset_B: 1226,
          asset_C: 0,
          asset_D_1: 77,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 45674,
          paidin_capital: 1106,
          equity_capital: 3180,
          year: 2015
        },
        {
          name: "전북",
          asset_A: 141017,
          asset_B: 2554,
          asset_C: 0,
          asset_D_1: 204,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 143367,
          paidin_capital: 4241,
          equity_capital: 10373,
          year: 2015
        },
        {
          name: "경남",
          asset_A: 345963,
          asset_B: 48371,
          asset_C: 0,
          asset_D_1: 1149,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 393184,
          paidin_capital: 4071,
          equity_capital: 24565,
          year: 2015
        },
        {
          name: "카카오뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2015
        },
        {
          name: "케이뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2015
        },
        {
          name: "산업",
          asset_A: 2244607,
          asset_B: 326309,
          asset_C: 0,
          asset_D_1: 11606,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2559310,
          paidin_capital: 172354,
          equity_capital: 252556,
          year: 2015
        },
        {
          name: "기업",
          asset_A: 2259615,
          asset_B: 177351,
          asset_C: 0,
          asset_D_1: 18901,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2418064,
          paidin_capital: 32719,
          equity_capital: 167695,
          year: 2015
        },
        {
          name: "수출입",
          asset_A: 818899,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 818899,
          paidin_capital: 88781,
          equity_capital: 110259,
          year: 2015
        },
        {
          name: "농협",
          asset_A: 2287166,
          asset_B: 337964,
          asset_C: 0,
          asset_D_1: 12181,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2612950,
          paidin_capital: 21328,
          equity_capital: 141349,
          year: 2015
        },
        {
          name: "수협",
          asset_A: 243112,
          asset_B: 61555,
          asset_C: 0,
          asset_D_1: 735,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 303932,
          paidin_capital: 11581,
          equity_capital: 11219,
          year: 2015
        },
        {
          name: "우리",
          asset_A: 2907721,
          asset_B: 388077,
          asset_C: 0,
          asset_D_1: 26878,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3268920,
          paidin_capital: 33814,
          equity_capital: 198525,
          year: 2016
        },
        {
          name: "신한",
          asset_A: 2760140,
          asset_B: 450583,
          asset_C: 70578,
          asset_D_1: 26975,
          asset_D_2: 0,
          asset_D_3: 2523,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3251803,
          paidin_capital: 79281,
          equity_capital: 209607,
          year: 2016
        },
        {
          name: "한국SC",
          asset_A: 584167,
          asset_B: 27948,
          asset_C: 0,
          asset_D_1: 1749,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 610366,
          paidin_capital: 13130,
          equity_capital: 46162,
          year: 2016
        },
        {
          name: "하나",
          asset_A: 2947571,
          asset_B: 496894,
          asset_C: 25970,
          asset_D_1: 35974,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 1907,
          asset_D_5: 0,
          asset: 3432554,
          paidin_capital: 53596,
          equity_capital: 218307,
          year: 2016
        },
        {
          name: "한국씨티",
          asset_A: 456849,
          asset_B: 201672,
          asset_C: 0,
          asset_D_1: 306,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 658214,
          paidin_capital: 15914,
          equity_capital: 65418,
          year: 2016
        },
        {
          name: "국민",
          asset_A: 3012050,
          asset_B: 476322,
          asset_C: 0,
          asset_D_1: 14770,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3473602,
          paidin_capital: 20219,
          equity_capital: 231923,
          year: 2016
        },
        {
          name: "대구",
          asset_A: 456726,
          asset_B: 89279,
          asset_C: 0,
          asset_D_1: 1120,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 544884,
          paidin_capital: 6806,
          equity_capital: 36109,
          year: 2016
        },
        {
          name: "부산",
          asset_A: 512850,
          asset_B: 82168,
          asset_C: 0,
          asset_D_1: 2718,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 592300,
          paidin_capital: 9774,
          equity_capital: 42059,
          year: 2016
        },
        {
          name: "광주",
          asset_A: 226068,
          asset_B: 40820,
          asset_C: 0,
          asset_D_1: 459,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 266429,
          paidin_capital: 2566,
          equity_capital: 14795,
          year: 2016
        },
        {
          name: "제주",
          asset_A: 51728,
          asset_B: 1596,
          asset_C: 0,
          asset_D_1: 64,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 53259,
          paidin_capital: 1106,
          equity_capital: 3357,
          year: 2016
        },
        {
          name: "전북",
          asset_A: 157342,
          asset_B: 2842,
          asset_C: 0,
          asset_D_1: 194,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 159990,
          paidin_capital: 4491,
          equity_capital: 11729,
          year: 2016
        },
        {
          name: "경남",
          asset_A: 355123,
          asset_B: 54545,
          asset_C: 0,
          asset_D_1: 1120,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 408547,
          paidin_capital: 4321,
          equity_capital: 28468,
          year: 2016
        },
        {
          name: "카카오뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2016
        },
        {
          name: "케이뱅크",
          asset_A: 0,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 0,
          paidin_capital: 0,
          equity_capital: 0,
          year: 2016
        },
        {
          name: "산업",
          asset_A: 2190759,
          asset_B: 360580,
          asset_C: 0,
          asset_D_1: 6596,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2544743,
          paidin_capital: 175431,
          equity_capital: 225650,
          year: 2016
        },
        {
          name: "기업",
          asset_A: 2414784,
          asset_B: 529592,
          asset_C: 0,
          asset_D_1: 15624,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2928751,
          paidin_capital: 32898,
          equity_capital: 174221,
          year: 2016
        },
        {
          name: "수출입",
          asset_A: 897753,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 897753,
          paidin_capital: 103981,
          equity_capital: 112200,
          year: 2016
        },
        {
          name: "농협",
          asset_A: 2472882,
          asset_B: 336891,
          asset_C: 0,
          asset_D_1: 8432,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2801340,
          paidin_capital: 21328,
          equity_capital: 140043,
          year: 2016
        },
        {
          name: "수협",
          asset_A: 276213,
          asset_B: 56872,
          asset_C: 0,
          asset_D_1: 625,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 332460,
          paidin_capital: 6600,
          equity_capital: 22829,
          year: 2016
        },
        {
          name: "우리",
          asset_A: 2967376,
          asset_B: 438955,
          asset_C: 0,
          asset_D_1: 27115,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3379216,
          paidin_capital: 33814,
          equity_capital: 197941,
          year: 2017
        },
        {
          name: "신한",
          asset_A: 2952765,
          asset_B: 585364,
          asset_C: 76260,
          asset_D_1: 35041,
          asset_D_2: 0,
          asset_D_3: 11,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3579359,
          paidin_capital: 79281,
          equity_capital: 221885,
          year: 2017
        },
        {
          name: "한국SC",
          asset_A: 607390,
          asset_B: 20395,
          asset_C: 0,
          asset_D_1: 913,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 626871,
          paidin_capital: 13130,
          equity_capital: 47959,
          year: 2017
        },
        {
          name: "하나",
          asset_A: 3052412,
          asset_B: 532479,
          asset_C: 29660,
          asset_D_1: 28459,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 9477,
          asset_D_5: 0,
          asset: 3576615,
          paidin_capital: 53596,
          equity_capital: 229509,
          year: 2017
        },
        {
          name: "한국씨티",
          asset_A: 427949,
          asset_B: 222497,
          asset_C: 0,
          asset_D_1: 412,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 650035,
          paidin_capital: 15914,
          equity_capital: 66808,
          year: 2017
        },
        {
          name: "국민",
          asset_A: 3234192,
          asset_B: 474050,
          asset_C: 0,
          asset_D_1: 12651,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3695591,
          paidin_capital: 20219,
          equity_capital: 252407,
          year: 2017
        },
        {
          name: "카카오뱅크",
          asset_A: 58418,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 58418,
          paidin_capital: 8000,
          equity_capital: 6679,
          year: 2017
        },
        {
          name: "케이뱅크",
          asset_A: 13511,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 13511,
          paidin_capital: 3500,
          equity_capital: 2338,
          year: 2017
        },
        {
          name: "대구",
          asset_A: 480559,
          asset_B: 107773,
          asset_C: 0,
          asset_D_1: 1551,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 586781,
          paidin_capital: 6806,
          equity_capital: 37692,
          year: 2017
        },
        {
          name: "부산",
          asset_A: 508412,
          asset_B: 64701,
          asset_C: 0,
          asset_D_1: 2420,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 570693,
          paidin_capital: 9774,
          equity_capital: 44473,
          year: 2017
        },
        {
          name: "광주",
          asset_A: 234071,
          asset_B: 38354,
          asset_C: 0,
          asset_D_1: 456,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 271970,
          paidin_capital: 2566,
          equity_capital: 15825,
          year: 2017
        },
        {
          name: "제주",
          asset_A: 55509,
          asset_B: 1923,
          asset_C: 0,
          asset_D_1: 81,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 57351,
          paidin_capital: 1106,
          equity_capital: 4048,
          year: 2017
        },
        {
          name: "전북",
          asset_A: 174256,
          asset_B: 3224,
          asset_C: 0,
          asset_D_1: 145,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 177335,
          paidin_capital: 4491,
          equity_capital: 11596,
          year: 2017
        },
        {
          name: "경남",
          asset_A: 366335,
          asset_B: 73861,
          asset_C: 0,
          asset_D_1: 1060,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 439136,
          paidin_capital: 4321,
          equity_capital: 31087,
          year: 2017
        },
        {
          name: "산업",
          asset_A: 2131790,
          asset_B: 339756,
          asset_C: 0,
          asset_D_1: 10082,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2461464,
          paidin_capital: 179381,
          equity_capital: 226161,
          year: 2017
        },
        {
          name: "기업",
          asset_A: 2561308,
          asset_B: 530796,
          asset_C: 0,
          asset_D_1: 12851,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3079253,
          paidin_capital: 32898,
          equity_capital: 190046,
          year: 2017
        },
        {
          name: "수출입",
          asset_A: 839459,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 839459,
          paidin_capital: 118150,
          equity_capital: 125133,
          year: 2017
        },
        {
          name: "농협",
          asset_A: 2634454,
          asset_B: 327399,
          asset_C: 0,
          asset_D_1: 12571,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2949283,
          paidin_capital: 21328,
          equity_capital: 145763,
          year: 2017
        },
        {
          name: "수협",
          asset_A: 319739,
          asset_B: 45299,
          asset_C: 0,
          asset_D_1: 567,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 364470,
          paidin_capital: 6600,
          equity_capital: 24511,
          year: 2017
        },
        {
          name: "우리",
          asset_A: 3173929,
          asset_B: 535601,
          asset_C: 0,
          asset_D_1: 30204,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3679326,
          paidin_capital: 33814,
          equity_capital: 210490,
          year: 2018
        },
        {
          name: "신한",
          asset_A: 3157006,
          asset_B: 761613,
          asset_C: 81750,
          asset_D_1: 21744,
          asset_D_2: 0,
          asset_D_3: 1786,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3980410,
          paidin_capital: 79281,
          equity_capital: 235714,
          year: 2018
        },
        {
          name: "한국SC",
          asset_A: 651421,
          asset_B: 29277,
          asset_C: 0,
          asset_D_1: 459,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 680239,
          paidin_capital: 13130,
          equity_capital: 48841,
          year: 2018
        },
        {
          name: "하나",
          asset_A: 3236676,
          asset_B: 675814,
          asset_C: 29403,
          asset_D_1: 41289,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 6009,
          asset_D_5: 0,
          asset: 3894595,
          paidin_capital: 53596,
          equity_capital: 241116,
          year: 2018
        },
        {
          name: "한국씨티",
          asset_A: 449857,
          asset_B: 205966,
          asset_C: 0,
          asset_D_1: 241,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 655582,
          paidin_capital: 15914,
          equity_capital: 60532,
          year: 2018
        },
        {
          name: "국민",
          asset_A: 3499777,
          asset_B: 519036,
          asset_C: 0,
          asset_D_1: 12782,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 4006031,
          paidin_capital: 20219,
          equity_capital: 265707,
          year: 2018
        },
        {
          name: "카카오뱅크",
          asset_A: 121267,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 121267,
          paidin_capital: 13000,
          equity_capital: 11404,
          year: 2018
        },
        {
          name: "케이뱅크",
          asset_A: 21847,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 21847,
          paidin_capital: 4775,
          equity_capital: 2801,
          year: 2018
        },
        {
          name: "대구",
          asset_A: 493887,
          asset_B: 96522,
          asset_C: 0,
          asset_D_1: 1298,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 589111,
          paidin_capital: 6806,
          equity_capital: 41422,
          year: 2018
        },
        {
          name: "부산",
          asset_A: 526119,
          asset_B: 133942,
          asset_C: 0,
          asset_D_1: 2207,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 657854,
          paidin_capital: 9774,
          equity_capital: 48314,
          year: 2018
        },
        {
          name: "광주",
          asset_A: 230292,
          asset_B: 39921,
          asset_C: 0,
          asset_D_1: 368,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 269846,
          paidin_capital: 2566,
          equity_capital: 16961,
          year: 2018
        },
        {
          name: "제주",
          asset_A: 59682,
          asset_B: 2419,
          asset_C: 0,
          asset_D_1: 70,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 62031,
          paidin_capital: 1606,
          equity_capital: 4730,
          year: 2018
        },
        {
          name: "전북",
          asset_A: 174128,
          asset_B: 3298,
          asset_C: 0,
          asset_D_1: 120,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 177307,
          paidin_capital: 4616,
          equity_capital: 12871,
          year: 2018
        },
        {
          name: "경남",
          asset_A: 378886,
          asset_B: 76158,
          asset_C: 0,
          asset_D_1: 1098,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 453946,
          paidin_capital: 4321,
          equity_capital: 32761,
          year: 2018
        },
        {
          name: "산업",
          asset_A: 2097748,
          asset_B: 325649,
          asset_C: 0,
          asset_D_1: 7418,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 2415979,
          paidin_capital: 181081,
          equity_capital: 249852,
          year: 2018
        },
        {
          name: "기업",
          asset_A: 2689266,
          asset_B: 542818,
          asset_C: 0,
          asset_D_1: 22350,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3209734,
          paidin_capital: 32898,
          equity_capital: 200709,
          year: 2018
        },
        {
          name: "수출입",
          asset_A: 897992,
          asset_B: 0,
          asset_C: 0,
          asset_D_1: 0,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 897992,
          paidin_capital: 118150,
          equity_capital: 134826,
          year: 2018
        },
        {
          name: "농협",
          asset_A: 2791503,
          asset_B: 380040,
          asset_C: 0,
          asset_D_1: 20642,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 3150901,
          paidin_capital: 21622,
          equity_capital: 158568,
          year: 2018
        },
        {
          name: "수협",
          asset_A: 372472,
          asset_B: 54993,
          asset_C: 0,
          asset_D_1: 1374,
          asset_D_2: 0,
          asset_D_3: 0,
          asset_D_4: 0,
          asset_D_5: 0,
          asset: 426091,
          paidin_capital: 6600,
          equity_capital: 26480,
          year: 2018
        }
      ];

      let categories = [2014, 2015, 2016, 2017, 2018];
      let bank = [];
      data.reduce((acc, curr) => {
        if (
          !bank.find(item => {
            return item === curr.name;
          })
        ) {
          bank.push(curr.name);
        }
      }, bank);

      let series = [];
      bank.forEach(b => {
        let visible = this.bankInfo
          .find(info => {
            return info.active;
          })
          .data.find(name => {
            return name === b;
          });

        series.push({
          name: b,
          visible: b === visible,
          data: data
            .filter(d => {
              return d.name === b;
            })
            .map(d => {
              return d[
                this.bankStat.find(s => {
                  return s.active;
                })["value"]
              ];
            })
        });
      }, this);

      let options = {};
      options.chart = tab.chart;
      options.series = series;
      options.xAxis = {
        categories: categories
      };

      if (tab.text === "LINE") {
        options.yAxis = {
          labels: {
            format: null
          }
        };
      } else if (tab.text === "PERCENTAGE") {
        options.yAxis = {
          labels: {
            format: "{value}%"
          }
        };
        options.plotOptions = {
          area: {
            stacking: "percent",
            lineColor: "#ffffff",
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: "#ffffff"
            },
            accessibility: {
              pointDescriptionFormatter: function(point) {
                function round(x) {
                  return Math.round(x * 100) / 100;
                }
                return (
                  point.index +
                  1 +
                  ", " +
                  point.category +
                  ", " +
                  point.y +
                  " millions, " +
                  round(point.percentage) +
                  "%, " +
                  point.series.name
                );
              }
            }
          }
        };
      } else if (tab.text === "STACKED") {
        options.yAxis = {
          title: {
            text: "Billions"
          },
          labels: {
            formatter: function() {
              return this.value / 1000;
            }
          }
        };
        options.plotOptions = {
          area: {
            stacking: "normal",
            lineColor: "#666666",
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: "#666666"
            }
          }
        };
      }

      this.chartOptions = Object.assign(this.chartOptions, options);
    }
  }
};
</script>