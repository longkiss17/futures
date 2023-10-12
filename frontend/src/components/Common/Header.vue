<!-- prettier-ignore -->
<style lang="scss" scoped>
.wrap{
  display: flex; height: 50px; margin: 0 auto;
  .el-menu-demo{border-bottom: none;}

  &>div{
    &:nth-child(1){
      width:230px; text-align: left; padding: 10px 20px;
      span{
        display: inline-block;  vertical-align: middle; 
        &:first-child{width: 140px; font-size: 19px; font-family: 'poppins-bold'; color: var(--color-active);}
        // &:last-child{width: 90px; font-size: 10px; margin-top: 2px; font-family: 'poppins-medium'; line-height: 10px; color: var(--color-active);}
      }
    }
    &:nth-child(2){
      position: relative;; width:calc(100% - 410px); text-align: right;
      &>span{
        display: inline-block; padding: 15px 0 12px 0; margin: 0 15px; font-family: 'poppins'; font-size: 14px; cursor: pointer; color: var(--text-color-medium);
        span, svg{ display: inline-block; vertical-align: middle}
        &.active{ border-bottom: solid 2px var(--color-active); font-family: 'poppins-medium'; color: var(--color-active)}
        &:hover{color: var(--color-active)}
        &.disable{color: rgba(var(--default-text-color), .4); cursor: default}
        &.admin{position: absolute; left:0px; top:16px; padding: 0.5px 5px; margin:0 0; background: var(--bg-color); border:solid 1px var(--border-color);  border-radius: 4px; font-family: 'poppins'; font-size: 10px; }
        &.active-admin{background: var(--color-active); color:var(--bg-color);}
      }
    }
    &:nth-child(3){
      width:160px;
      span.label-group{
        display: inline-block; height: 16px; margin-top: 8px; padding: 2px 5px; background: var(--bg-color); border-radius: 20px; border:solid 1px var(--border-color); vertical-align: middle;
        &>span{
          display: inline-block; width:16px; height:16px; margin:0px 0px; border-radius: 30px; color: var(--bg-color); cursor: pointer;
          &.active{ background:var(--bg-color); color: var(--text-color-bold)}
          span{margin-top: -6px;}
        }
        &:hover{
          border:solid 1px rgba(var(--default-color), .5);
          span.active{color:rgba(var(--default-color), 1)}
        }
      }
      span.v{height: 15px; display: inline-block; margin: 18px 10px 10px 10px; border-right: solid 1px var(--border-color); vertical-align: middle}      
      span.icon{
        display: inline-block; color: var(--text-color-bold);  margin-top: 9px; vertical-align: middle; cursor: pointer;
        svg{vertical-align: middle}
      }
      a{
        color: inherit;
      }
    }
  }
}
.header-line{
  position: absolute; left:0px; width:100%; height: 50px; background: var(--bg-color-header); border-bottom: solid 1px var(--bg-color-header);; z-index: -1;
}
  
</style>
<template>
  <div class="header-line"></div>
  <div class="wrap">
    <div>
      <span>NEXON STATS</span>
      <!-- <span>Nexon Stats</span> -->
    </div>
    <div>
      <template></template>
      <template v-if="route.name !== 'login'">
        <router-link :to="entry.menuPath" v-for="entry in menuList.filter((m) => m.menuName === 'ASM ADMIN')" custom v-slot="{ href, navigate }">
          <span @click="navigate" :class="{ 'active-admin': entry.active, disable: !entry.enable, admin: true }">
            <!-- :viewBox="'136 96 960 960'" -->
            <span>ADMIN</span>
          </span>
        </router-link>
        <router-link :to="entry.menuPath" v-for="entry in menuList.filter((m) => m.menuName !== 'ASM ADMIN')" custom v-slot="{ href, navigate }">
          <span v-if="entry.enable" @click="navigate" :class="{ active: entry.active }">
            <icon :name="entry.icon"></icon>
            <span>{{ entry.menuName }}</span>
          </span>
          <span v-else :class="{ disable: true }">
            <icon :name="entry.icon"></icon>
            <span>{{ entry.menuName }}</span>
          </span>
        </router-link>
      </template>
    </div>
    <div>
      <span class="v" style="margin-left: 0"></span>
      <span class="label-group">
        <span :class="{ active: ux.theme === 'light' }" title="Light" @click="ux.$patch({ theme: 'light' })">
          <icon :name="'LightMode'" :width="16" :height="16"></icon>
        </span>
        <span :class="{ active: ux.theme === 'dark' }" title="Dark" @click="ux.$patch({ theme: 'dark' })">
          <icon :name="'DarkMode'" :width="20" :height="20"></icon>
        </span>
      </span>
      <span class="v"></span>
      <span class="icon">
        <el-color-picker v-model="rgba" size="small" show-alpha :predefine="predefineColors" :change="changeColor()" />
      </span>
      <!-- <span class="v"></span>
      <span class="icon" :title="screen === 'normal' ? 'Wide' : 'Fit'" @click="ux.$patch({ screen: screen === 'normal' ? 'wide' : 'normal' })">
        <icon v-if="screen === 'normal'" :name="'WidthWide'" :width="22" :height="22"></icon>
        <icon v-else :name="'FitPage'"></icon>
      </span> -->
      <span class="v"></span>
      <span class="icon" title="Logout">
        <a :href="logoutUrl">
          <icon :name="'Logout'"></icon>
        </a>
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch, onMounted, getCurrentInstance } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import menuStore from "@/stores/menu";
import uxStore from "@/stores/ux";

const route = useRoute();
let menu = menuStore();
let { menuList } = storeToRefs(menu);

let logoutUrl = `${window.config.apiUrl}/logout`;

const ux = uxStore();
const { theme, screen, color } = storeToRefs(ux);

let rgba = ref("rgba(" + color.value + ", 1)");

let colors = {
  light: ["rgba(50, 100, 220, 1)", "rgba(0, 150, 60, 1)", "rgba(180, 120, 0, 1)", "rgba(180, 10, 10, 1)", "rgba(0, 0, 0, 1)"],
  dark: ["rgba(150, 200, 255, 1)", "rgba(60, 180, 130, 1)", "rgba(240, 180, 10, 1)", "rgba(248, 120, 120, 1)", "rgba(250, 250, 250, 1)"],
};

let predefineColors = reactive(colors[theme.value]);

function changeColor() {
  ux.$patch({ color: rgba.value.replace(/(rgba\()|(, 1\))/g, "") });
}

watch(theme, (curr, prev) => {
  document.querySelector("html").className = theme.value;
  predefineColors = reactive(colors[theme.value]);

  let prevColorIndex = colors[prev].findIndex((entry) => entry === rgba.value);

  // 테마를 변경했을 때 선택된 컬러가 predefineColors를 사용하고 있다면 해당 테마에 맞는 컬러 값을 매칭
  if (prevColorIndex > -1) rgba.value = predefineColors[prevColorIndex];
  else rgba.value = predefineColors[0];

  ux.$patch({ color: predefineColors[0].replace(/(rgba\()|(, 1\))/g, "") });
});

watch(color, () => {
  document.querySelector("html").style.setProperty("--default-color", color.value);

  let rgb = color.value
    .split(",")
    .map((entry) => parseInt(entry))
    .reduce((p, c) => p + c);

  let elColor = "#fff";
  // 컬러값이 화이트에 가깝다면 elplus 컬러를 블랙으로 변경
  if (rgb > 420) elColor = "rgba(30, 30, 30, 1)"; // 24, 26, 32
  document.querySelector("html").style.setProperty("--el-color-white", elColor);
});

watch(screen, () => {
  document.querySelector(".wrap").classList.remove("normal", "wide");
  document.querySelector(".wrap").classList.add(screen.value);
});
</script>
