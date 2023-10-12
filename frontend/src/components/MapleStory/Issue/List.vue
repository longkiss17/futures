<!-- prettier-ignore -->
<style lang="scss" scoped>
  .date{
    position:relative; padding:20px 0 10px 0; font-size: 14px; font-family: 'noto-bold'; color: var(--text-color-demiilight); border-top: solid 1px var(--border-color-bold);
    span{
      position:absolute; top: 22px; right:8px; font-size: 11px; font-family: 'noto-regular'; color: var(--text-color-demiilight)
    }
  }
  ul{        
    li{
      position:relative; list-style: none; padding: 10px; margin-bottom: 10px; border-top-right-radius:3px; border-bottom-right-radius:3px; cursor:pointer;
      p{            
        position: relative; 
        span.category{ position: absolute; right:0px; top:0px; padding: 1px 5px 2px 5px; border-radius: 3px; font-size: 11px; font-family: 'noto-regular'; display: inline-block }
        span.duration{ font-family:'noto-medium'; font-size: 11px; margin-left:5px; color: var(--text-color-light)}
        &:nth-child(1){ font-size: 14px; font-family: 'noto-semibold'; }
        &:nth-child(2){ margin-top: 5px; font-size: 12px; font-family: 'poppins-medium'; color: var(--text-color-demiilight) }
      }
      svg{ display:none; position:absolute; top: 18px; right:8px }
      @for $i from 1 through 7 {
        &.color-#{$i} {               
          background: linear-gradient(65.19deg, rgba(var(--color-0#{$i}), .04) 14.47%, rgba(var(--color-0#{$i}), .17) 123.42%);
          border-left:solid 6px rgba(var(--color-0#{$i}), .4);
          &:hover{ 
            background-color: rgba(var(--color-0#{$i}), .3);
            p { color: var(--text-color-bold) }
            svg{ display:inline-block}
            span.category{ display:none}
          }
          p{ 
            span.category{ background-color: rgba(var(--color-0#{$i}), .7); color: #fff }
          }
        }
      }
    }
  }
  .no-data{
    text-align:center; font-size:13px; font-family:"noto-bold"; color:var(--text-color-light);
    span.ico{
      display:inline-block; width:100px;
    }
  }
</style>
<template>
  <div>
    <div class="date">
      {{ moment(day.full).format("YYYY년 MM월 DD일") }}
      <span>이슈 {{ day.issue }}건</span>
    </div>
    <ul>
      <template v-for="entry in issueList">
        <router-link :to="'?date=' + day.full.substring(0, 10) + '&issue=' + entry.issueID" custom v-slot="{ href, navigate }">
          <li :class="'color-' + entry.category" @click="navigate">
            <p>
              {{ entry.title }}
              <span class="category">{{ entry.categoryLabel }}</span>
            </p>
            <p>
              <template v-if="moment(entry.start).format('HHmm') + moment(entry.end).format('HHmm') === '00000000'">{{ moment(entry.start).format("YYYY.MM.DD") }} ~ {{ moment(entry.end).format("YYYY.MM.DD") }}</template>
              <template v-else>{{ moment(entry.start).format("YYYY.MM.DD HH:mm") }} ~ {{ moment(entry.end).format("YYYY.MM.DD HH:mm") }}</template>
              <span class="duration">({{ moment(entry.end).diff(moment(entry.start), "days") + 1 }}일)</span>
            </p>
            <svg height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
          </li>
        </router-link>
      </template>
      <template v-if="issueList.length === 0">
        <div class="no-data">
          <span class="ico">
            <svg viewBox="0 0 96 96" fill="none" class="mirror css-z12rr9">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M64 8H26v80h58V28H64V8zM36 37h38v4H36v-4zm0 9h38v4H36v-4zm38 9H36v4h38v-4zm-8 12l4 4-4 4-4-4 4-4zM50 18l-3 3 3 3 3-3-3-3z" fill="url(#not-found-data_svg__paint0_linear_22059_32288)"></path>
              <path opacity="0.3" d="M86 50l3-3 3 3-3 3-3-3zM47 21l3-3 3 3-3 3-3-3zM84 28H64V8l20 20z" fill="#929AA5"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.172 73.171l14.5-14.5 5.656 5.658-14.5 14.5-5.656-5.657z" fill="url(#not-found-data_svg__paint1_linear_22059_32288)"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M51 48c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm4 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z" fill="url(#not-found-data_svg__paint2_linear_22059_32288)"></path>
              <defs>
                <linearGradient id="not-found-data_svg__paint0_linear_22059_32288" x1="55" y1="8" x2="55" y2="88" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#929AA5" stop-opacity="0.1"></stop>
                  <stop offset="1" stop-color="#929AA5" stop-opacity="0.25"></stop>
                </linearGradient>
                <linearGradient id="not-found-data_svg__paint1_linear_22059_32288" x1="4.172" y1="68.75" x2="24.328" y2="68.75" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#929AA5"></stop>
                  <stop offset="1" stop-color="#76808F"></stop>
                </linearGradient>
                <linearGradient id="not-found-data_svg__paint2_linear_22059_32288" x1="15" y1="48" x2="55" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#929AA5"></stop>
                  <stop offset="1" stop-color="#76808F"></stop>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <br />
          등록된 내용이 없습니다.
        </div>
      </template>

      <!-- <li v-for="entry in issueList" :class="'color-' + entry.category" @click="showIssue(entry)">
        <p>
          {{ entry.title }}
          <span>{{ entry.categoryLabel }}</span>
        </p>
        <p>{{ moment(entry.start).format("YYYY.MM.DD HH:mm") }} ~ {{ moment(entry.end).format("YYYY.MM.DD HH:mm") }}</p>
        <svg height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
      </li>
      <li v-if="issueList.length === 0">이슈 없음</li> -->
    </ul>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
const moment = inject("moment");
const props = defineProps(["day", "issueList"]);
const emit = defineEmits(["showIssue"]);

function showIssue(entry) {
  emit("showIssue", entry);
}
</script>
