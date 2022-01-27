<style scoped>
.home,
.main {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: auto;
}

@media screen and (min-width: 901px) and (max-width: 4000px) {
  div.navi { position: fixed; right: 8px; top: 50%; margin-top: -125px; padding: 5px; padding: 20px 10px; border: solid 1px #fff; z-index: 999; }
  div.navi li { text-align: center;font-size: 0.5em; padding: 10px 0; cursor: pointer; }
}

@media screen and (min-width: 300px) and (max-width: 900px) {
  div.navi { position: fixed; width: calc(100% - 20px); height: 60px; padding: 10px; border: solid 1px #fff; z-index: 999; }
  div.navi li { text-align: center; width:30%; height:30px; padding: 5px 0; font-size: 0.5em; cursor: pointer; float: left; }
}
div.black {
  border: solid 1px #000;
  color: #000;
}
div.black li {
  color: #000;
}

div.white {
  color: #fff;
}

div.white li {
  color: #fff;
}
div.c {
  position: relative;
  width: 100%;
  height: 100vh;
}
div.b {
  position: absolute;
  width: 100%;
  height: 100vh;
}
div.component {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
div.d0 {
  background: #fff;
}
div.d0 > div.b {
}
div.d1 {
  background: #fff;
}
div.d1 > div.b {
  background: url(../assets/img/bg/pexels-photo-373076.jpeg) center center #fff;
  opacity: 0.2;
}
div.d2 {
  background: #000;
}
div.d2 > div.b {
  background: url(../assets/img/bg/pexels-photo-159888.jpeg) center center #fff;
  opacity: 0.4;
}
div.d3 {
  background: #fff;
}
div.d3 > div.b {
  background: url(../assets/img/bg/pexels-photo-434337.jpeg) center center #fff;
  opacity: 0.5;
}
div.d4 {
  background: #000;
}
div.d4 > div.b {
  background: url(../assets/img/bg/pexels-photo-330771.jpeg) center center #fff;
  opacity: 0.2;
}
div.d5 {
  background: #fff;
}
div.d5 > div.b {
  /* background: url(../assets/img/bg/pexels-photo-590022.jpeg); */
  opacity: 0.7;
}

div.subject {
  position: absolute;
  width:30%;
  font-size: 100px;
  color: #bbb;
  opacity: 0.5;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-400px);
  opacity: 0;
}

.slide-fade2-enter-active {
  transition: all 2s ease;
}
.slide-fade2-enter,
.slide-fade2-leave-to {
  transform: translateY(400px);
  opacity: 0;
}



.wrap {
    /* animation:slide 3s ease-in-out forwards; */
    background:  #000;
    bottom:0;
    position:fixed;
    width:2500px;
    height:3500px;    
    top:-45%;
    z-index:1000;
  }
  .ani{
    animation:slide 3s ease-in-out forwards;
  }

  @keyframes slide {
    0% {}
    15% {margin-left:20%; transform:rotate(-15deg)}
    30% {margin-left:30%; transform:rotate(20deg)}
    45% {margin-left:60%; transform:rotate(-15deg)}
    60% {margin-left:80%; transform:rotate(15deg)}
    100% {margin-left:100%; transform:rotate(0deg)}
  }
  .password{position: absolute; width:340px; height:150px; top:50%; left:50%; margin-left: -170px; margin-top: -75px; border:solid 1px #fff; text-align: center; z-index: 1001;}
  .password .guide{padding: 20px}
  .password input{width:50px; font-size: 20px; padding: 0 5px; border:solid 1px #fff; border-radius: 2px; background: #000; color:#fff; text-align: center; vertical-align: middle}
  .password button{padding: 5px 4px 4px 4px; border:solid 1px #fff; border-radius: 2px; background: #000; color:#fff; text-align: center;; vertical-align: middle}

</style>
<template>
  <div class="home">
    <div :class="['wrap', confirm ? 'ani' : '']"></div>
    <div class="password" v-if="!confirm">
      <div class="guide">
        토스팀 입사지원을 위한 홈페이지 이력서 입니다.
        <br />열람을 원하시면 아래 4자리 패스워드를 입력하세요.
      </div>
      <div>
        <input
          type="password"
          maxlength="4"
          placeholder="****"
          v-model="password"
          v-on:keyup.enter="submit()"
        />
        <button @click="submit()">SUBMIT</button>
      </div>
    </div>
    <div
      :class="[
        'navi',
        current === 0 || current === 2 || current === 4 ? 'white' : 'black'
      ]"
    >
      <ul>
        <li @click="go(0)">Home</li>
        <li @click="go(1)">
          WORK
          <br />EXPERIENCE
        </li>
        <li @click="go(2)">
          PERSONAL
          <br />STATEMENT
        </li>
        <li @click="go(3)">TMI</li>
        <li @click="go(4)">PROJECTS</li>
        <li @click="go(5)">VISUALIZATION</li>
      </ul>
    </div>
    <div id="main" class="main">
      <div class="c d0">
        <intro></intro>
      </div>
      <div class="c d1">
        <div class="b"></div>
        <div class="component">
          <experience v-if="showsExperience"></experience>
        </div>
        <div class="subject" :style="{ right: subject[0].right + 'px' }" style="color:#000">
          WORK
          <br />EXPERIENCE
        </div>
      </div>
      <div class="c d2">
        <div class="b"></div>
        <div class="component">
          <transition name="slide-fade">
            <statement v-show="showsStatement"></statement>
          </transition>
        </div>
        <div class="subject white" :style="{ right: subject[1].right + 'px' }">
          PERSONAL
          <br />STATEMENT
        </div>
      </div>
      <div class="c d3">
        <div class="b"></div>
        <div class="component">
          <transition name="slide-fade2">
            <tmi v-if="showsTMI"></tmi>
          </transition>
        </div>
        <div class="subject" :style="{ right: subject[2].right + 'px' }" style="color:#000">TMI</div>
      </div>
      <div class="c d4">
        <div class="b"></div>
        <div class="component">
          <project v-if="showsProject"></project>
        </div>
        <div class="subject white" :style="{ right: subject[3].right + 'px' }">PROJECTS</div>
      </div>
      <div class="c d5">
        <div class="b"></div>
        <div class="component">
          <visualization></visualization>
        </div>
        <!-- <div class="subject" :style="{ right: subject[4].right + 'px' }">VISUALIZATION</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import Intro from "@/components/Portfolio/Intro.vue";
import Experience from "@/components/Portfolio/Experience.vue";
import Statement from "@/components/Portfolio/Statement.vue";
import TMI from "@/components/Portfolio/TMI.vue";
import Project from "@/components/Portfolio/Project.vue";
import Visualization from "@/components/Portfolio/Visualization.vue";
export default {
  data() {
    return {
      positionY: 0,
      current: 0,
      scroll: {},
      subject: [
        { right: -1000 },
        { right: -1000 },
        { right: -1000 },
        { right: -1000 },
        { right: -1000 }
      ],
      showsExperience: false,
      showsStatement: false,
      showsTMI: false,
      showsProject: false,
      showsVisualization: false,
      password: "",
      confirm: false
    };
  },
  components: {
    intro: Intro,
    experience: Experience,
    statement: Statement,
    tmi: TMI,
    project: Project,
    visualization: Visualization
  },
  methods: {
    go(index) {
      this.current = index;
      this.scroll.scrollTo(0, this.scroll.size.container.height * index, 600);
    },
    calcIndex(y) {
      let h = this.scroll.size.container.height;
      let per = h / 2;

      if (y < per) {
        this.current = 0;
      } else if (y > per && y < per + h) {
        this.current = 1;
      } else if (y > per && y < per + h * 2) {
        this.current = 2;
      } else if (y > per && y < per + h * 3) {
        this.current = 3;
      } else if (y > per && y < per + h * 4) {
        this.current = 4;
      } else if (y > per && y < per + h * 5) {
        this.current = 5;
      }
    },
    submit() {
      this.confirm = this.password === "0712";
      if (!this.confirm) {
        this.password = "";
        alert("access denied");
      }
    }
  },
  mounted() {
    const scrollbar = Scrollbar.init(document.getElementById("main"), {});
    this.scroll = scrollbar;
    const width = scrollbar.size.container.width;
    const height = scrollbar.size.container.height;

    scrollbar.addListener(status => {
      this.calcIndex(status.offset.y);

      let margin = width * 0.4;

      if (status.offset.y > (height * 1) / 9) {
        this.subject[0].right =
          width * ((status.offset.y - height * 0) / height) - margin;
      }
      if (status.offset.y > (height * 2) / 9) {
        this.subject[1].right =
          width * ((status.offset.y - height * 1) / height) - margin;
      }
      if (status.offset.y > (height * 3) / 9) {
        this.subject[2].right =
          width * ((status.offset.y - height * 2) / height) - margin;
      }
      if (status.offset.y > (height * 4) / 9) {
        this.subject[3].right =
          width * ((status.offset.y - height * 3) / height) - margin;
      }
      if (status.offset.y > (height * 5) / 9) {
        this.subject[4].right =
          width * ((status.offset.y - height * 4) / height) - margin;
      }
    });

    scrollbar.updatePluginOptions("overscroll", {
      effect: "glow"
    });
  },
  watch: {
    current() {
      this.showsExperience = this.current === 1;
      this.showsStatement = this.current === 2;
      this.showsTMI = this.current === 3;
      this.showsProject = this.current === 4;
    }
  }
};
</script>
