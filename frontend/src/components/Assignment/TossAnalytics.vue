<style scoped>
*{color: #000; font-family: 'noto-regular'}

.toss-analytics{background: #fff;}
header{text-align: center; max-height: 94px;}
header img{padding: 30px 0;}
.stage-01{position: absolute; width:600px; left:50%; margin-left:-300px; transition: all 1s ease;}
.stage-01 .text{font-size: 28px; font-weight: bold; padding:74px 0 56px 0}
.stage-01 .search{width:290px; padding-left: 30px; border-bottom:solid 1px #d6d6dd; background: url(../../assets/img/icn-searchfield.png) left center no-repeat; overflow: auto;}
.stage-01 .search input{width:270px; padding:10px; border:none; font-size: 16px}
.stage-01 .search input::placeholder {color:#b6b6c0}
.stage-01 .list{margin-top: 30px}
.stage-01 .list li{padding: 20px 0; background: url(../../assets/img/icn-arrow-rightwards_new.png) right center no-repeat;  cursor: pointer;}
.stage-01 .list li:hover{background-color: #f7f8fa}
.stage-01 .list li.on{font-weight: bold}
.stage-01 .list li div.t{font-size: 20px; color: #333d4b}
.stage-01 .list li div.d{font-size: 15px; color: #6b7684; margin-top:12px}

.slide-leave .text{display: none}
.slide-leave .search{display: none}
.slide-leave .list{margin-top: 220px}
.slide-leave .list li{padding: 10px 0; width:150px}
.slide-leave .list li div.t{font-size: 15px; color: #333d4b}
.slide-leave .list li div.d{font-size: 10px; color: #6b7684; margin-top:0px}

.stage-02{position: absolute; width:1000px; left:100%; padding-bottom: 100px; transition: all 1s ease;}
.stage-02 .text{font-size: 28px; font-weight: bold; padding:74px 0 56px 0}
.stage-02 .title{padding-bottom: 20px; font-size: 24px; font-family: 'noto-medium'}
.stage-02 .summary{margin-top: 50px; padding:25px 0; font-size: 26px; font-family: 'noto-bold'}
.stage-02 .goal{padding:25px 0; font-size: 22px; font-family: 'noto-medium'}
.stage-02 table{width: 100%;}
.stage-02 table td{padding:15px 0;}
.stage-02 table thead td{color:#6b7684}
.stage-02 table tbody td{font-weight: bold; color:#191f28}
.stage-02 table tbody td:first-child{font-weight: bold; color:#6b7684}
.stage-02 table span.red{display: inline-block; vertical-align: middle; color:#f66570; }


.slide-enter{left:50%;}
.slide-leave{left:-30%}
.slide-enter2{left:50%; margin-left:-500px;}
.slide-leave{transform: translateX(1000px);}
</style>
<style>
html{overflow-x: hidden}
</style>
<template>
  <div class="toss-analytics">
    <header>
      <img src="@/assets/img/toss-analytics-4-x.png" />
    </header>
    <div :class="['stage-01', !selected.hasOwnProperty('name') ? 'slide-enter' : 'slide-leave']">
      <div class="text">확인하실 테스트 결과를 선택하세요.</div>
      <div class="search">
        <input type="text" placeholder="테스트명 검색" v-model="filterKey" />
      </div>
      <div class="list">
        <ul>
          <template v-for="result in filteredList">
            <li :key="result.id" @click="drawChart(result)" :class="[result.active ? 'on' : '']">
              <div class="t">{{result.title}}</div>
              <div class="d">{{result.created}}</div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div :class="['stage-02', selected.hasOwnProperty('name') ? 'slide-enter2' : 'slide-leave2']">
      <div class="text">
        테스트 결과 분석
        <span @click="selected = {}">뒤로가기</span>
      </div>
      <div class="title">{{selected.name}} {{selected.item}}</div>
      <div class="search"></div>
      <div class="chart">
        <charts :options="chartOptions"></charts>
      </div>
      <div class="summary">Summary</div>
      <div class="goal">Goal Metrics</div>
      <div class="table">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="50%" />
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <template v-for="item in tableData.head">
                <td :key="item.name">{{item.name}}</td>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in tableData.body">
              <tr :key="i">
                <template v-for="(value, j) in item">
                  <td :key="j">
                    <span v-if="selected.item === value" class="red">*</span>
                    {{value}}
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      filterKey: "",
      chartOptions: {},
      selected: {},
      tableData: {}
    };
  },
  created() {
    moment.lang("ko", {
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
    });
    this.http.get("https://ipd-incubator.toss.im/ta/tests/").then(response => {
      this.list = response.data.map(el => {
        let date = moment(el.created_time);
        el.created = `${date.format("YYYY.MM.DD")} (${moment.weekdaysShort(
          date
        )})`;
        return el;
      });
    });
  },
  methods: {
    drawChart(result) {
      this.list.map(r => {
        r.active = false;
      });
      result.active = true;
      this.http
        .get("https://ipd-incubator.toss.im/ta/tests/" + result.id)
        .then(response => {
          let data = response.data;

          let series = [];
          let categories = [];
          let tableData = { head: [{ name: "" }], body: [] };

          let primary = Object.keys(data.result.metrics).find(m => {
            return data.result.metrics[m].primary;
          });
          let metrics = data.result.metrics[primary];
          let variants = data.result.variants;
          let statistics = data.result.statistics;

          this.selected = {
            name: result.title,
            item: metrics.title
          };

          Object.keys(variants).forEach(key => {
            series.push({
              name: variants[key].name,
              key: key,
              marker: {
                symbol: "circle"
              },
              data: []
            });
          }, this);

          tableData.head = tableData.head.concat(
            series.map(s => {
              return { name: s.name, key: s.key };
            })
          );

          Object.keys(statistics).forEach(key => {
            let item = [];
            tableData.head.forEach(h => {
              if (!h.key) {
                item.push(data.result.metrics[key].title);
              } else
                item.push(
                  Math.floor(statistics[key][h.key].avg * 100) / 100 + "%"
                );
            });
            tableData.body.push(item);
          }, this);

          this.tableData = tableData;

          Object.keys(metrics.values).forEach(v => {
            categories.push(v.substr(5, 5).replace("-", ". ") + ".");
            Object.keys(metrics.values[v]).forEach(key => {
              series
                .find(s => {
                  return s.key === key;
                })
                .data.push(
                  Math.floor(
                    (metrics.values[v][key].numerator /
                      metrics.values[v][key].denominator) *
                      100
                  )
                );
            });
          });

          this.chartOptions = {
            credits: { enabled: false },
            colors: ["#ffb74d", "#2272eb", "#585865"],
            chart: {
              height: "510px",
              style: {
                fontFamily: "'noto-regular', 'poppins'",
                color: "#4e5968"
              }
            },
            title: { text: "" },
            yAxis: {
              title: { text: "" },
              labels: {
                formatter: function() {
                  return this.value + "%";
                }
              }
            },
            legend: {
              align: "left",
              verticalAlign: "top",
              margin: 20,
              padding: 0,
              itemWidth: 176,
              itemStyle: { fontWeight: "normal" },
              borderWidth: 0,
              symbolHeight: 0.1,
              symbolWidth: 30
            },
            plotOptions: {
              line: {
                lineWidth: 3,
                marker: {
                  lineWidth: 7,
                  lineColor: null
                }
              },
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
            },
            xAxis: { categories: categories },
            series: series
          };
        });
    }
  },
  computed: {
    filteredList() {
      let data = this.list;

      let filterKey = this.filterKey && this.filterKey.toLowerCase();

      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }

      return data;
    }
  }
};
</script>