<!-- prettier-ignore -->
<style lang="scss" scoped>
  div.t{
    width:200px; padding: 0 0 10px 0;  font-family: 'poppins-medium'; font-size: 11px; 
    svg{vertical-align: middle;}
  }
  div.s{
    &:first-child{ background: none}
    width:calc(100% - 20px); padding: 6px 10px; margin-bottom: 5px; background:var(--bg-color-sub); text-align: center; 
    span.name{ font-size: 13px; font-family: 'poppins-medium'; vertical-align: middle; cursor: pointer;  color: var(--text-color-medium)} 
    svg{vertical-align: middle; margin-top: -4px;}              
    &:hover{
      color: var(--text-color-link);
      span.name{ color: var(--text-color-link) } 
    }
  }
  div.our-service{
    overflow: auto; overflow-x: hidden; width:200px; 
    div{
      float: left; width:50%; margin-bottom: 5px; margin-right: 5px; padding: 4px 0px;  background:var(--bg-color-sub); cursor: pointer; text-align: center; 
      a{ font-size: 11px; font-family: 'poppins-medium'; vertical-align: middle; cursor: pointer; color: var(--text-color-medium); letter-spacing: -.5px ; text-decoration: none; }
      a,svg{display: inline-block; vertical-align: middle;}

      &:hover {
        color: var(--text-color-link); background-color: var(--bg-color-sub-active);
        a{ color: var(--text-color-link);  font-family: 'poppins-medium'; }
      }

      // &:first-child{
      //   width:calc(100%);
      //   span{ font-size: 13px;} 
      // }
      &:nth-child(even){width: calc(50% - 5px); margin-right: 0px;}
    }
  }

  div.recent-list{
    margin-bottom: 20px; width:200px; 
    a{
      display: inline-block; padding: 4px 10px; margin: 0 0 4px 4px; background:var(--bg-color-sub); border-radius: 14px; font-size: 11px; text-decoration: none; cursor: pointer; color: var(--text-color-bold); letter-spacing: -1px;
      &:hover{ color: var(--text-color-link); background-color: var(--bg-color-sub-active); font-family: 'noto-medium'; }
    }
  }
  div.email{
    background:var(--bg-color-sub); padding: 5px 3px; font-size: 12px; cursor: pointer; color: var(--text-color-medium); font-family: 'poppins'; letter-spacing: -.5px;
    svg{display: inline-block; vertical-align: middle;}
    &:hover{ color: var(--text-color-link); background-color: var(--bg-color-sub-active); font-family: 'poppins-medium';  }
  }

  div.today{
    margin-bottom: 20px; 
    div{
      padding: 5px 5px 7px 10px; background:var(--bg-color-sub); cursor: pointer;  margin-bottom: 5px; color: var(--text-color-medium);  

      span, svg{
        display: inline-block; vertical-align: middle; font-size: 13px;
      }
      span.more{float: right; margin-top: 4px; font-size: 11px;}
      span.v{width:25px; text-align: right;}

      &:hover{
        color: var(--text-color-link); background-color: var(--bg-color-sub-active); font-family: 'noto-medium';
      }
    }
  }
</style>
<template>
  <div class="banner">
    <!-- <div class="t">today</div>
    <div class="today">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="-2 -2 26 26" fill="currentColor">
          <path
            d="M12 11.375q-1.25 0-2.125-.875T9 8.375q0-1.225.875-2.113.875-.887 2.125-.887t2.125.887Q15 7.15 15 8.375q0 1.25-.875 2.125T12 11.375Zm-7 7.25v-1.65q0-.625.363-1.163.362-.537.962-.837 1.425-.675 2.838-1.013 1.412-.337 2.837-.337 1.425 0 2.838.337 1.412.338 2.837 1.013.6.3.963.837.362.538.362 1.163v1.65Zm1-1h12v-.65q0-.35-.212-.638-.213-.287-.588-.487-1.25-.6-2.562-.912-1.313-.313-2.638-.313t-2.637.313q-1.313.312-2.563.912-.375.2-.587.487-.213.288-.213.638Zm6-7.25q.825 0 1.413-.588Q14 9.2 14 8.375t-.587-1.412q-.588-.588-1.413-.588-.825 0-1.412.588Q10 7.55 10 8.375t.588 1.412q.587.588 1.412.588Zm0-2Zm0 9.25Z"
          />
        </svg>
        <span class="v">786</span>
        <span class="more">
          view visitor
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 22 22" fill="currentColor"><path d="m8 14.417-.479-.479L11.458 10 7.521 6.062 8 5.583 12.417 10Z" /></svg>
        </span>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="-3 -2 26 26" fill="currentColor"><path d="M4.5 18.725v-1h2v-7.5q0-2 1.275-3.513Q9.05 5.2 11 4.825v-.7q0-.45.288-.725.287-.275.712-.275t.713.275q.287.275.287.725v.7q1.95.375 3.225 1.887Q17.5 8.225 17.5 10.225v7.5h2v1Zm7.5-7Zm0 9.9q-.65 0-1.137-.462-.488-.463-.488-1.163h3.25q0 .7-.462 1.163-.463.462-1.163.462Zm-4.5-3.9h9v-7.5q0-1.875-1.312-3.188Q13.875 5.725 12 5.725q-1.875 0-3.188 1.312Q7.5 8.35 7.5 10.225Z" /></svg>
        <span class="v">17</span>
        <span class="more">
          more notifications
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 22 22" fill="currentColor"><path d="m8 14.417-.479-.479L11.458 10 7.521 6.062 8 5.583 12.417 10Z" /></svg>
        </span>
      </div>
    </div> -->
    <div class="t">RECENTS</div>
    <div class="recent-list">
      <router-link :to="entry.menuPath" v-for="entry in menu.history.data.slice(0, 8)">{{ entry.menuName }}</router-link>
    </div>

    <div class="t">
      FRONT SERVICES
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="currentColor" d="M8.583 13H6q-1.25 0-2.125-.875T3 10q0-1.25.875-2.125T6 7h2.583v.417H6q-1.062 0-1.823.76-.76.761-.76 1.823 0 1.062.76 1.823.761.76 1.823.76h2.583Zm-1.041-2.792v-.416h4.916v.416ZM11.417 13v-.417H14q1.062 0 1.823-.76.76-.761.76-1.823 0-1.062-.76-1.823-.761-.76-1.823-.76h-2.583V7H14q1.25 0 2.125.875T17 10q0 1.25-.875 2.125T14 13Z" /></svg>
    </div>
    <div class="our-service">
      <div v-for="entry in menu.menuList.filter((m) => m.menuName !== 'ASM ADMIN')">
        <a href="https://report.na.nexon.com" target="_blank">{{ entry.menuName }}</a>
      </div>
      <div>
        <a href="https://query.na.nexon.com" target="_blank">Query Builder</a>
      </div>
      <div>
        <a href="https://dsr.na.nexon.com/" target="_blank">DSR</a>
      </div>
      <div>
        <a href="https://na.nexon.com/usersegment" target="_blank">UserSegment</a>
      </div>
      <div>
        <a href="https://nexonlog.nexon.co.kr" target="_blank">LogManager</a>
      </div>
    </div>
    <!-- <div class="t" style="margin-top: 20px">contact us</div>
    <div class="email">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="currentColor" d="M4.021 15.167q-.521 0-.854-.334-.334-.333-.334-.854V6q0-.5.334-.833.333-.334.854-.334h11.958q.521 0 .854.334.334.333.334.854V14q0 .5-.334.833-.333.334-.854.334ZM10 10.271 3.5 6.333v7.646q0 .229.146.375t.375.146h11.958q.229 0 .375-.146t.146-.375V6.333Zm0-1.042L16.25 5.5H3.75ZM3.5 6.333V5.5v8.479q0 .229.146.375t.375.146H3.5v-.521Z" /></svg>
      da_service_dev@nexon.co.kr
    </div> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import menuStore from "@/stores/menu";
let menu = menuStore();
</script>
