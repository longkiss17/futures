<style scoped>
.project {
  position: relative;
  width: 100%;
  height: 100%;
}
.collage-viewer {
  width: 100%;
  height: 100%;
  z-index: 100;
}
.image-viewer {
  width: 100%;
  height: 100%;
  z-index: 200;
}
</style>
<style>
.message-404 {
  position: relative;
  z-index: 1;
}
.collage-404 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -286px;
  margin-left: -480px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  perspective: 500px;
  display: inline-block;
}
.collage-404 h1 {
  color: #fff;
  font-size: 30vw;
  margin: 0;
  line-height: 1;
  padding: 0;
  display: inline-block;
  transition: all 1s ease-in-out;
  opacity: 0.1;
}
html.loaded .collage-404 h1 {
  opacity: 0;
}
html.loading .collage-404 > div {
  opacity: 0;
}
.collage-404-images {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.collage-404 a {
  position: absolute;
  width: 5vw;
  width: 7%;
  display: block;
  border-radius: 0.25rem;
  transition: all 1s ease-in-out;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.collage-404 a img {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.collage-404 a:hover {
  z-index: 1;
}
.collage-404 a:hover img {
  transform: scale(1.5) !important;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
}
.collage-404 a.loaded img {
  opacity: 1;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}
.collage-404 a.introduced {
  transition: all 0.1s ease-in-out;
}
.collage-404 a:nth-child(1) {
  left: 19%;
  top: 18%;
}
.collage-404 a:nth-child(2) {
  left: 15%;
  top: 25%;
}
.collage-404 a:nth-child(3) {
  left: 12%;
  top: 32%;
}
.collage-404 a:nth-child(4) {
  left: 8%;
  top: 39%;
}
.collage-404 a:nth-child(5) {
  left: 4%;
  top: 47%;
}
.collage-404 a:nth-child(6) {
  left: 1%;
  top: 55%;
}
.collage-404 a:nth-child(7) {
  left: -2%;
  top: 62%;
}
.collage-404 a:nth-child(8) {
  left: 5%;
  top: 62%;
}
.collage-404 a:nth-child(9) {
  left: 12%;
  top: 62%;
}
.collage-404 a:nth-child(10) {
  left: 19%;
  top: 62%;
}
.collage-404 a:nth-child(11) {
  left: 25.5%;
  top: 62%;
}
.collage-404 a:nth-child(12) {
  left: 19%;
  top: 27%;
}
.collage-404 a:nth-child(13) {
  left: 19%;
  top: 35.5%;
}
.collage-404 a:nth-child(14) {
  left: 19%;
  top: 43.5%;
}
.collage-404 a:nth-child(15) {
  left: 19%;
  top: 53%;
}
.collage-404 a:nth-child(16) {
  left: 19%;
  top: 70%;
}
.collage-404 a:nth-child(17) {
  left: 19%;
  top: 79%;
}
.collage-404 a:nth-child(18) {
  left: 41%;
  top: 20%;
}
.collage-404 a:nth-child(19) {
  left: 38%;
  top: 26%;
}
.collage-404 a:nth-child(20) {
  left: 36%;
  top: 34%;
}
.collage-404 a:nth-child(21) {
  left: 35%;
  top: 43%;
}
.collage-404 a:nth-child(22) {
  left: 35%;
  top: 52%;
}
.collage-404 a:nth-child(23) {
  left: 35.5%;
  top: 61%;
}
.collage-404 a:nth-child(24) {
  left: 37%;
  top: 69%;
}
.collage-404 a:nth-child(25) {
  left: 41%;
  top: 76%;
}
.collage-404 a:nth-child(26) {
  left: 47%;
  top: 79%;
}
.collage-404 a:nth-child(27) {
  left: 52%;
  top: 76%;
}
.collage-404 a:nth-child(28) {
  left: 55.5%;
  top: 69%;
}
.collage-404 a:nth-child(29) {
  left: 57%;
  top: 61%;
}
.collage-404 a:nth-child(30) {
  left: 58%;
  top: 52%;
}
.collage-404 a:nth-child(31) {
  left: 58%;
  top: 43%;
}
.collage-404 a:nth-child(32) {
  left: 57%;
  top: 34%;
}
.collage-404 a:nth-child(33) {
  left: 55%;
  top: 26%;
}
.collage-404 a:nth-child(34) {
  left: 52%;
  top: 20%;
}
.collage-404 a:nth-child(35) {
  left: 47%;
  top: 18%;
}
.collage-404 a:nth-child(36) {
  left: 88%;
  top: 18%;
}
.collage-404 a:nth-child(37) {
  left: 84%;
  top: 25%;
}
.collage-404 a:nth-child(38) {
  left: 81%;
  top: 32%;
}
.collage-404 a:nth-child(39) {
  left: 77%;
  top: 39%;
}
.collage-404 a:nth-child(40) {
  left: 73%;
  top: 47%;
}
.collage-404 a:nth-child(41) {
  left: 70%;
  top: 55%;
}
.collage-404 a:nth-child(42) {
  left: 67%;
  top: 62%;
}
.collage-404 a:nth-child(43) {
  left: 74%;
  top: 62%;
}
.collage-404 a:nth-child(44) {
  left: 81%;
  top: 62%;
}
.collage-404 a:nth-child(45) {
  left: 88%;
  top: 62%;
}
.collage-404 a:nth-child(46) {
  left: 94.5%;
  top: 62%;
}
.collage-404 a:nth-child(47) {
  left: 88%;
  top: 27%;
}
.collage-404 a:nth-child(48) {
  left: 88%;
  top: 35.5%;
}
.collage-404 a:nth-child(49) {
  left: 88%;
  top: 43.5%;
}
.collage-404 a:nth-child(50) {
  left: 88%;
  top: 53%;
}
.collage-404 a:nth-child(51) {
  left: 88%;
  top: 70%;
}
.collage-404 a:nth-child(52) {
  left: 88%;
  top: 79%;
}
.collage-404 img {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  opacity: 0;
  display: block;
  -webkit-filter: grayscale(100);
  filter: grayscale(100);
  transition: all 2s ease-in-out;
}
.collage-404.arkanoid h1 {
  line-height: 0;
}
.collage-404.arkanoid h1 svg {
  opacity: 1;
  width: 40vw;
  height: auto;
}
.collage-404.arkanoid a {
  width: 9.1%;
  height: 12.5%;
  margin: 0;
}
.collage-404.arkanoid a img {
  width: 100%;
  height: auto;
  display: block;
}
.collage-404.arkanoid a:nth-child(1) {
  left: 0%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(2) {
  left: 0%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(3) {
  left: 0%;
  top: 75%;
}
.collage-404.arkanoid a:nth-child(4) {
  left: 9.1%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(5) {
  left: 9.1%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(6) {
  left: 18.2%;
  top: 0%;
}
.collage-404.arkanoid a:nth-child(7) {
  left: 18.2%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(8) {
  left: 18.2%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(9) {
  left: 18.2%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(10) {
  left: 18.2%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(11) {
  left: 18.2%;
  top: 75%;
}
.collage-404.arkanoid a:nth-child(12) {
  left: 27.3%;
  top: 12.5%;
}
.collage-404.arkanoid a:nth-child(13) {
  left: 27.3%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(14) {
  left: 27.3%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(15) {
  left: 27.3%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(16) {
  left: 27.3%;
  top: 87.5%;
}
.collage-404.arkanoid a:nth-child(17) {
  left: 36.4%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(18) {
  left: 36.4%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(19) {
  left: 36.4%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(20) {
  left: 36.4%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(21) {
  left: 36.4%;
  top: 87.5%;
}
.collage-404.arkanoid a:nth-child(22) {
  left: 45.5%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(23) {
  left: 45.5%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(24) {
  left: 45.5%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(25) {
  left: 45.5%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(26) {
  left: 54.6%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(27) {
  left: 54.6%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(28) {
  left: 54.6%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(29) {
  left: 54.6%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(30) {
  left: 54.6%;
  top: 87.5%;
}
.collage-404.arkanoid a:nth-child(31) {
  left: 63.7%;
  top: 12.5%;
}
.collage-404.arkanoid a:nth-child(32) {
  left: 63.7%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(33) {
  left: 63.7%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(34) {
  left: 63.7%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(35) {
  left: 63.7%;
  top: 87.5%;
}
.collage-404.arkanoid a:nth-child(36) {
  left: 72.8%;
  top: 0%;
}
.collage-404.arkanoid a:nth-child(37) {
  left: 72.8%;
  top: 25%;
}
.collage-404.arkanoid a:nth-child(38) {
  left: 72.8%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(39) {
  left: 72.8%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(40) {
  left: 72.8%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(41) {
  left: 72.8%;
  top: 75%;
}
.collage-404.arkanoid a:nth-child(42) {
  left: 81.9%;
  top: 37.5%;
}
.collage-404.arkanoid a:nth-child(43) {
  left: 81.9%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(44) {
  left: 91%;
  top: 50%;
}
.collage-404.arkanoid a:nth-child(45) {
  left: 91%;
  top: 62.5%;
}
.collage-404.arkanoid a:nth-child(46) {
  left: 91%;
  top: 75%;
}
.collage-404.arkanoid a:nth-child(46) ~ * {
  display: none;
}
h2 {
  margin: 0;
  padding: 0;
  font-size: 2.6em;
  font-weight: normal;
  color: #666;
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.1em;
}
@media screen and (max-width: 760px) {
  h1 {
    font-size: 1.5rem;
  }
  .collage-404 a,
  .collage-404 img {
    border-radius: 0.125rem;
  }
  .collage-404 h1 {
    font-size: 50vw;
  }
  .color-range {
    width: 100%;
  }
}
</style>
<template>
  <div class="project">
    <div
      class="image-viewer"
      v-if="showsImageViewer"
      @click.self="showsImageViewer = !showsImageViewer"
    >
      <viewer></viewer>
    </div>
    <div class="collage-viewer" v-show="!showsImageViewer">
      <section class="collage-404">
        <h1>404</h1>
        <div class="collage-404-images"></div>
      </section>
      <div class="explore-cta" style="display:none">
        <div>
          <input
            class="color-range"
            type="range"
            min="0"
            max="100"
            value="75"
            title="Drag me, baby."
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImageViewer from "@/components/Portfolio/ImageViewer.vue";
export default {
  components: {
    viewer: ImageViewer
  },
  data() {
    return {
      src: "",
      showsImageViewer: false
    };
  },
  created() {
    let self = this;
    var dribbble404 = {
      collage: window.document.querySelector(".collage-404"),
      collageImages: window.document.querySelector(".collage-404-images"),
      collageH1: window.document.querySelector(".collage-404 h1"),
      html: window.document.documentElement,
      colorRange: window.document.querySelector(".color-range"),
      colorChoice: window.document.getElementById("color-choice"),
      currentRange: 0,
      shots: [],
      utils: {
        hsl2Rgb: function(h, s, l) {
          s = s / 100;
          l = l / 100;
          var c, x, m, rgb;
          c = (1 - Math.abs(2 * l - 1)) * s;
          x = c * (1 - Math.abs(((h / 60) % 2) - 1));
          m = l - c / 2;
          if (h >= 0 && h < 60) rgb = [c, x, 0];
          if (h >= 60 && h < 120) rgb = [x, c, 0];
          if (h >= 120 && h < 180) rgb = [0, c, x];
          if (h >= 180 && h < 240) rgb = [0, x, c];
          if (h >= 240 && h < 300) rgb = [x, 0, c];
          if (h >= 300 && h <= 360) rgb = [c, 0, x];

          return rgb.map(function(v) {
            return (255 * (v + m)) | 0;
          });
        },
        rgb2Hex: function(r, g, b) {
          var rgb = b | (g << 8) | (r << 16);
          return "#" + (0x1000000 + rgb).toString(16).slice(1);
        },
        hsl2Hex: function(h, s, l) {
          var rgb = this.hsl2Rgb(h, s, l);
          return this.rgb2Hex(rgb[0], rgb[1], rgb[2]);
        },
        hueFromRangeValue: function(val) {
          return ((val / 100) * 360).toFixed(0);
        },
        inputSupported: function(type) {
          var x = document.createElement("input");
          x.setAttribute("type", type);
          return x.type === type;
        },
        listenForKeyCombo: function(combo, callback) {
          if (window.addEventListener) {
            var keys = [];
            var konami = window.addEventListener(
              "keydown",
              function(e) {
                keys.push(e.keyCode);
                if (keys.toString().indexOf(combo) >= 0) {
                  keys = [];
                  callback();
                }
              }.bind(this),
              true
            );
          }
        }
      },
      init: function() {
        this.collage = window.document.querySelector(".collage-404");
        this.collageImages = window.document.querySelector(
          ".collage-404-images"
        );
        this.collageH1 = window.document.querySelector(".collage-404 h1");
        this.html = window.document.documentElement;
        this.colorRange = window.document.querySelector(".color-range");
        this.colorChoice = window.document.getElementById("color-choice");

        this.currentRange = Math.floor(100 * Math.random());

        if (this.colorRange && this.utils.inputSupported("range")) {
          this.colorRange.addEventListener(
            "change",
            this.fetchAndBuildShots.bind(this)
          );
          this.colorRange.addEventListener("input", this.syncColors.bind(this));
          this.colorRange.value = this.currentRange;
          var event = new Event("change");
          this.colorRange.dispatchEvent(event);
        } else {
          this.colorRange.style.display = "none";
          this.fetchAndBuildShots();
        }

        this.utils.listenForKeyCombo(
          "38,38,40,40,37,39,37,39,66,65",
          this.konami.bind(this)
        );
      },
      loading: function() {
        this.html.classList.remove("loaded");
        this.html.classList.add("loading");
      },
      loaded: function() {
        this.html.classList.remove("loading");
        this.html.classList.add("loaded");
      },
      konami: function() {
        this.collageH1.innerHTML =
          '<svg width="176" height="128" viewBox="0 0 176 128" fill="black" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48 0H32V16H48V32H32V48H16V64H0V112H16V80H32V112H48V128H80V112H48V96H128V112H96V128H128V112H144V80H160V112H176V64H160V48H144V32H128V16H144V0H128V16H112V32H64V16H48V0ZM48 64V48H64V64H48ZM128 48H112V64H128V48Z"/></svg>';
        this.collage.classList.add("arkanoid");
        this.loading();
        this.build404Shots(this.shots);
      },
      build404Shots: function(data) {
        this.collageImages.innerHTML = "";
        var numLoaded = 0;
        var that = this;

        //create all links to shots and images
        Array.prototype.forEach.call(data, function(shot, i) {
          if (i > 51) return;

          var link = document.createElement("a");
          //link.href = "#";

          link.addEventListener("click", e => {
            self.showImageViewer(e.target.src);
          });

          //randomly position and style each shot link
          var x = 0 * Math.random();
          var y = 0 * Math.random();
          var z = 500 * Math.random();
          var s = 0.75 + 0.25 * Math.random();
          var transform =
            "translateX(" + x + "%) translateY(" + y + "%) scale(" + s + ") ";
          link.style.transform = transform + " translateZ(" + z + "px)";
          link.style.color = "rgba(0,0,0," + (1 - s) * 0.5 + ")";
          link.style.boxShadow = "0 0 0 currentColor";

          //setup the shot image
          var img = document.createElement("img");

          function imgLoaded() {
            numLoaded++;
            link.classList.add("loaded");
            link.style.transform = transform;
            setTimeout(function() {
              link.classList.add("introduced");
            }, 2000);
            if (numLoaded == data.length) {
              that.loaded();
            }
          }

          //start loading the image
          img.src = shot.img;
          if (img.complete) {
            setTimeout(imgLoaded, 10);
          } else {
            img.addEventListener("load", imgLoaded);
            img.addEventListener("error", imgLoaded);
          }
          // append all to the 404 images
          link.appendChild(img);
          that.collageImages.appendChild(link);
        });
      },
      syncColors: function() {
        var hue = this.utils.hueFromRangeValue(this.currentRange);
        if (this.utils.inputSupported("range")) {
          hue = this.utils.hueFromRangeValue(this.colorRange.value);
        }
        var hsl = "hsl(" + hue + ", 100%, 50%)";
        var hex = this.utils.hsl2Hex(hue, 100, 50);

        this.colorRange.style.color = hsl;
        // this.colorChoice.style.color = hsl;
        // this.colorChoice.innerHTML = hex;
        // this.colorChoice.setAttribute(
        //   "href",
        //   "https://dribbble.com/colors/" + hex.replace("#", "")
        // );
        return hex;
      },
      fetchAndBuildShots: function() {
        var that = this;
        var hex = this.syncColors();
        let host = window.location.host;
        this.loading();
        this.colorRange.disabled = true;
        this.colorRange.disabled = false;
        this.shots = [
          {
            img: "/images/00.png",
            url: "/shots/8172256-Blueprint-landing-page"
          },
          {
            img: "/images/01.png",
            url: "/shots/6787909-icon-set"
          },
          {
            img: "/images/02.png",
            url: "/shots/5101856-Skybox-Icon"
          },
          {
            img: "/images/03.png",
            url: "/shots/6285205-Bogo-Apps-Web-site-design"
          },
          {
            img: "/images/04.png",
            url: "/shots/4460247-Unfollow"
          },
          {
            img: "/images/05.png",
            url: "/shots/7598628-Wickret-Landing-Page-Interaction"
          },
          {
            img: "/images/06.png",
            url: "/shots/2725553-icerik-com"
          },
          {
            img: "/images/07.png",
            url: "/shots/5314733-Skybox-Website"
          },
          {
            img: "/images/08.png",
            url: "/shots/6248741-Mr-Duck-In-The-Rain"
          },
          {
            img: "/images/09.png",
            url: "/shots/7304045-Nick-Naron-Digital-Designer"
          },
          {
            img: "/images/10.png",
            url: "/shots/1921734-Product-Features"
          },
          {
            img: "/images/11.png",
            url: "/shots/5105354-How-to-stay-scrappy"
          },
          {
            img: "/images/12.png",
            url: "/shots/4963449-Pull-to-Refresh-Animation"
          },
          {
            img: "/images/13.png",
            url: "/shots/6690497-Mobile-app-Best-Catering"
          },
          {
            img: "/images/14.png",
            url: "/shots/2755634-Nike"
          },
          {
            img: "/images/15.png",
            url: "/shots/4845906-Creative-Mints-Web-site"
          },
          {
            img: "/images/16.png",
            url: "/shots/4686333-TGIF"
          },
          {
            img: "/images/17.png",
            url: "/shots/5212411-Aerospace-Logo-Construction"
          },
          {
            img: "/images/18.png",
            url: "/shots/4878604--Kandinsky"
          },
          {
            img: "/images/19.png",
            url: "/shots/5274233-Designing-with-real-data"
          },
          {
            img: "/images/20.png",
            url: "/shots/7823730-Sweep-Travel-Expenses-Management-Tool"
          },
          {
            img: "/images/21.png",
            url: "/shots/6908388-Tesla-mobile-app-ui-tutorial"
          },
          {
            img: "/images/22.png",
            url: "/shots/6561893-Thinking"
          },
          {
            img: "/images/23.png",
            url: "/shots/5624935-Google-Translate-Redesign"
          },
          {
            img: "/images/24.png",
            url: "/shots/3206606-Landing-page-UX-UI"
          },
          {
            img: "/images/25.png",
            url: "/shots/4963849-Gogi"
          },
          {
            img: "/images/01.png",
            url: "/shots/6787909-icon-set"
          },
          {
            img: "/images/02.png",
            url: "/shots/5101856-Skybox-Icon"
          },
          {
            img: "/images/03.png",
            url: "/shots/6285205-Bogo-Apps-Web-site-design"
          },
          {
            img: "/images/04.png",
            url: "/shots/4460247-Unfollow"
          },
          {
            img: "/images/05.png",
            url: "/shots/7598628-Wickret-Landing-Page-Interaction"
          },
          {
            img: "/images/06.png",
            url: "/shots/2725553-icerik-com"
          },
          {
            img: "/images/07.png",
            url: "/shots/5314733-Skybox-Website"
          },
          {
            img: "/images/08.png",
            url: "/shots/6248741-Mr-Duck-In-The-Rain"
          },
          {
            img: "/images/09.png",
            url: "/shots/7304045-Nick-Naron-Digital-Designer"
          },
          {
            img: "/images/10.png",
            url: "/shots/1921734-Product-Features"
          },
          {
            img: "/images/11.png",
            url: "/shots/5105354-How-to-stay-scrappy"
          },
          {
            img: "/images/12.png",
            url: "/shots/4963449-Pull-to-Refresh-Animation"
          },
          {
            img: "/images/13.png",
            url: "/shots/6690497-Mobile-app-Best-Catering"
          },
          {
            img: "/images/14.png",
            url: "/shots/2755634-Nike"
          },
          {
            img: "/images/15.png",
            url: "/shots/4845906-Creative-Mints-Web-site"
          },
          {
            img: "/images/16.png",
            url: "/shots/4686333-TGIF"
          },
          {
            img: "/images/17.png",
            url: "/shots/5212411-Aerospace-Logo-Construction"
          },
          {
            img: "/images/18.png",
            url: "/shots/4878604--Kandinsky"
          },
          {
            img: "/images/19.png",
            url: "/shots/5274233-Designing-with-real-data"
          },
          {
            img: "/images/20.png",
            url: "/shots/7823730-Sweep-Travel-Expenses-Management-Tool"
          },
          {
            img: "/images/21.png",
            url: "/shots/6908388-Tesla-mobile-app-ui-tutorial"
          },
          {
            img: "/images/22.png",
            url: "/shots/6561893-Thinking"
          },
          {
            img: "/images/23.png",
            url: "/shots/5624935-Google-Translate-Redesign"
          },
          {
            img: "/images/24.png",
            url: "/shots/3206606-Landing-page-UX-UI"
          },
          {
            img: "/images/25.png",
            url: "/shots/4963849-Gogi"
          },
          {
            img: "/images/00.png",
            url: "/shots/4963849-Gogi"
          }
        ];

        this.loaded();
        this.build404Shots(this.shots);
      }
    };

    setTimeout(function() {
      dribbble404.init();
    }, 500);
  },
  methods: {
    showImageViewer(src) {
      this.showsImageViewer = !this.showsImageViewer;
      this.src = src;
    }
  }
};
</script>
