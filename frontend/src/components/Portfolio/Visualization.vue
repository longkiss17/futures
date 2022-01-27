<style scoped>
    .main{width: 100%; height: 100%; }
    .bg{position: absolute; width: 100%; height: 100%; background: url(../../assets/img/bg/pexels-photo-590022.jpeg) center center #fff; z-index: 100; opacity: 1;}
    .fade-in{animation-duration: 2s; animation-name: fadeIn; animation-fill-mode: forwards;}
    .fade-out{animation-duration: 2s; animation-name: fadeOut; animation-fill-mode: forwards;}
    .content{position: absolute; width: 100%; height: 100%; z-index: 99; opacity: .5;}
    .video{position: absolute; width: 100%; height: 100%; z-index: 100;}
    
    .main div.area{position: absolute;  width: 100%; height: 100%; z-index: 50;}
    .main div.area:nth-child(1){background: 000;}
    .main div.area:nth-child(2){background: fff;}
    .main div.area:nth-child(3){background: 000;}
    .main div.active{z-index: 100;}
    
    .main div.link div{position: absolute; width: 600px; left:50%; margin-left:-300px; text-align: center; font-size: 80px; font-weight: bold; color: #000; cursor: pointer; z-index: 200}
    .main div.link div.active{}
    .main div.link div:nth-child(1){top: 20%;}
    .main div.link div:nth-child(2){top: 45%;}
    .main div.link div:nth-child(3){top: 70%;}

    .iframe{position: absolute; width: 100%; height: 100%; background: #fff; z-index: 1000}
    .iframe iframe{width: 100%; height: 100%; padding: 0; margin: 0; border:none;}

    @keyframes fadeOut {
    from { opacity: .5;}
    to {opacity: 0}
    }
    @keyframes fadeIn {
    from { opacity: 0;}
    to {opacity: 1}
    }
</style>
<template>
  <div class="main">
    <div :class="['bg', bg ? 'fade-in' : 'fade-out'] "></div>
    <div>
      <template v-for="(div, index) in areas">
        <video class="video" v-bind:key="div.text" v-if="current === index && !bg" autoplay loop>
          <source :src="'/images/' + div.video" type="video/mp4" />
        </video>
      </template>
    </div>
    <div class="content">
      <template v-for="div in areas">
        <div
          :class="['area', div.active ? 'active' : '']"
          :style="{zIndex: div.zIndex}"
          v-bind:key="div.text"
        >
          <video class="video" autoplay loop>
            <source :src="'/images/' + div.video" type="video/mp4" />
          </video>
        </div>
      </template>
    </div>

    <div class="link">
      <template v-for="(div, index) in links">
        <div
          @mouseover="over(div, index)"
          @mouseleave="leave(div, index)"
          :style="{opacity: div.active ? '1' : (bg ? '1' : '0.2')}"
          v-bind:key="div.text"
        >{{div.text}}</div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg: true,
      current: 0,
      showsFrame: false,
      frameSrc: "",
      areas: [
        { text: "", active: false, zIndex: 50, video: "d303.mp4" },
        { text: "", active: false, zIndex: 50, video: "d302.mp4" },
        { text: "", active: false, zIndex: 50, video: "d301.mp4" }
      ],
      links: [
        { text: "Volume", active: false },
        { text: "Relationship", active: false },
        { text: "Event Browser", active: false }
      ]
    };
  },
  created() {},
  methods: {
    over(div, index) {
      this.current = index;
      div.active = true;
      this.bg = false;
      this.areas.forEach(el => {
        el.zIndex = 50;
      });
      this.areas[index].active = true;
      this.areas[index].zIndex = 100;
    },
    leave(div, index) {
      div.active = false;
      this.bg = true;
      this.areas[index].active = false;
    }
  }
};
</script>