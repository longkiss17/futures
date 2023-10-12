<!-- prettier-ignore -->
<style lang="scss" scoped>    
  .wrap{
    // width: 1200px; height:100%; margin:0 auto 0 auto;  transition: .5s ease-in-out;
    width: 100%; height:100%; margin:0 auto 0 auto;  transition: .5s ease-in-out;
    header{ width:100%; height: 50px}
    .container{
      display: flex; min-height:calc(100% - 50px);
      .navi{ width:0px; box-shadow: 5px 0px 8px 0 var(--bg-color-bold);}
      .content{ 
        width:calc(100%);
        .title{     
          position: relative; padding: 0px 0 20px 0; border-bottom: solid 1px var(--border-color); margin-bottom: 10px; color: var(--text-color-bold); font-size: 24px;
          .holder{
            position: absolute; right: 0px; font-size: 11px;
            a, span{
              display: inline-block; margin: 0 2px; text-decoration: none; color: var(--text-color-medium)
            }
          }
        }
      }
      .our-services{ 
        position: absolute; width:200px; height:auto; margin-top: 18px; left:calc(50% + 600px); transition: .9s ease-in-out; z-index: 99;
      }
      .more{
        opacity: 0; right:0px; width:20px; padding:5px 0; text-align: right; transition: .3s ease-in-out; z-index: 100;
        span, svg{
          display: inline-block; vertical-align: middle;
        }
        span{
          border-radius: 20px; cursor: pointer;
          &:hover{box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);}
        }
      }
    }
    @media screen and (min-width: 1400px) and (max-width: 1599px) {
      // margin-left: calc(50% - 700px);
      // .container{        
      //   .our-services{ left:calc(50% + 500px); transition: 1s ease-in-out}
      // }
    }
    @media screen and (min-width: 0px) and (max-width: 1399px) {
      // width:100%;
      // .container{
      //   .our-services{ position: absolute; left:calc(100% - 50px); top: 80px; width:20px;}
      //   .more{visibility: visible; opacity: 1; transition: .3s ease-in-out}
      // }
    }
    @media screen and (min-width: 0px) and (max-width: 1199px) {
      // width: 100%; min-width: 1100px; overflow-x: auto;
    }
  }
  .wide{
    width: 100%;
    .container{
      .content{ width:calc(100% - 0px)}
      .our-services{ 
        position: absolute; left:calc(100% - 40px);  margin-top: 18px;  transition: .7s ease-in-out;  width:0px;
        .banner{
          padding:20px; margin-top:-20px; border-radius: 4px; box-shadow: 0px 0px 12px rgba(var(--default-text-color), .1); background: var(--bg-body); transition: .3s ease-in-out; 
        }      
      }
      .more{ display: inline-block; visibility: visible; transform: translate(0px, 20px); opacity: 1; transition: .3s ease-in-out}      
    }
  }

  .scroll-top{ right: 20px; bottom: 50px; padding: 8px 10px; border-radius: 100px; position: fixed;  background-color: var(--color-active); color: var(--bg-color); cursor: pointer}
  .wide{
    .scroll-top{ bottom: 120px}
  }

  .slide-fade-enter-active {
    transition: all .3s ease-in-out; 
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(200px); opacity: 1;
  }
</style>
<template>
  <!-- <div :class="['wrap', screen]"> -->
  <div :class="['wrap']">
    <header>
      <header1></header1>
    </header>
    <div class="container">
      <div class="navi">
        <navi></navi>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
    <div v-if="y > height / 2" class="scroll-top" @click="scrollTop()">
      <svg fill="currentColor" height="24" width="24"><path d="M11 20V7.825l-5.6 5.6L4 12l8-8 8 8-1.4 1.425-5.6-5.6V20Z" /></svg>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import header1 from "./Common/Header.vue";
import navi from "./Common/Navi.vue";
import banner from "./Common/Banner.vue";
import menuStore from "@/stores/menu";
import uxStore from "@/stores/ux";
import { useRoute, useRouter } from "vue-router";
import components from "@/routes/components";
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const { x, y } = useWindowScroll();
const { width, height } = useWindowSize();

const route = useRoute();
const router = useRouter();
</script>
