<style scoped>
#imageviewer {
  position: absolute;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  margin: 0 auto;
  max-width: 900px;
  top: 50%;
  left: 50%;
  margin-top: -380px;
  margin-left: -450px;
}

.main {
  margin-bottom: 30px;
}

.thumbnails {
  margin: 0 -5px;
  width: calc(100% + 10px);
}

.slide {
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: flex;
  height: 630px;
  -webkit-box-pack: center;
  justify-content: center;
}
.slide--thumbniail {
  cursor: pointer;
  height: 100px;
  padding: 0 5px;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.slide--thumbniail:hover {
  opacity: 0.75;
}
.slide img {
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  width: 100%;
}
</style>
<style>
.agile__nav-button {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 24px;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.thumbnails .agile__nav-button {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.thumbnails .agile__nav-button--prev {
  left: -75px;
  top: -320px;
}
.thumbnails .agile__nav-button--next {
  right: -75px;
  top: -320px;
}
.agile__nav-button:hover {
  color: #888;
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  width: 10px;
}
.gile__actions {
  display: none;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #888;
}
#imageviewer div.title{font-size: 100px; position: absolute; color: #000; text-align: center; font-weight: bold; opacity: .4;}
#imageviewer div.text{ top:60%; font-size: 20px; position: absolute; color: #000; text-align: center; font-weight: bold; opacity: .7;}
</style>
<template>
  <div id="imageviewer">
    <agile class="main" ref="main" :options="options1" :as-nav-for="asNavFor1">
      <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
        <img :src="slide.img" />
        <div class="title">{{slide.title}}</div>
        <div class="text">{{slide.text}} {{slide.period}}</div>
      </div>
    </agile>
    <agile
      class="thumbnails"
      ref="thumbnails"
      :options="options2"
      :as-nav-for="asNavFor2"
      @afterChange="showCurrentSlide($event)"
    >
      <div
        class="slide slide--thumbniail"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index}`"
        @click="$refs.thumbnails.goTo(index)"
      >
        <img :src="slide.img" />
      </div>
      <template slot="prevButton">
        <i class="fas fa-chevron-left">
          <img src="../../assets/img/white-arrow.png" width="80" style="transform: rotate(90deg)" />
        </i>
      </template>
      <template slot="nextButton">
        <i class="fas fa-chevron-right">
          <img src="../../assets/img/white-arrow.png" width="80" style="transform: rotate(270deg)" />
        </i>
      </template>
    </agile>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";
export default {
  name: "carrousel",
  components: {
    agile: VueAgile
  },
  data() {
    return {
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false
      },

      options2: {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]
      },

      slides: []
    };
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  },
  created() {
    let data = [];
    let num = parseInt(this.$parent.src.split("images/")[1].split(".")[0]);
    for (let i = 0; i <= 25; i++) {
      let target = num + i;
      if (target > 25) target = target - 26;

      let title = "Project 01";
      let text = "조건 별 유저 검색 서비스";
      let period = "Apr 2019 ~ Dec 2019";

      if (target >= 8 && target <= 14) {
        title = "Project 02";
        text = "이벤트 SQL 빌더(for presto)";
        period = "Apr 2019 ~ Dec 2019";
      } else if (target >= 15 && target <= 16) {
        title = "Project 03";
        text = "게임 별 이벤트 적용 현황 조회";
        period = "Aug 2019";
      } else if (target >= 17 && target <= 20) {
        title = "Project 04";
        text = "이벤트 익스플로러";
        period = "Sep 2018";
      } else if (target >= 21 && target <= 25) {
        title = "Project 05";
        text = "이벤트 통합 관리 콘솔";
        period = "Dec 2017 ~ Mar 2019";
      }

      data.push({
        img: "/images/" + target.toString().padStart(2, "0") + ".png",
        title: title,
        text: text,
        period: period
      });
    }

    this.slides = data;
  },
  methods: {
    showCurrentSlide(event) {
      console.log(this.$refs.main.getCurrentSettings());
    }
  }
};
</script>
