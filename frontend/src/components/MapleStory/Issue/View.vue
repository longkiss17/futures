<!-- prettier-ignore -->
<style lang="scss" scoped>  
  ul{
    li{
      display:flex; padding:15px 0; border-bottom:solid 1px var(--border-color);
      &:last-child{border-bottom:none}
      &>div{        
        &:nth-child(1){
          width:30%; font-size:13px; font-family:'noto-regular'; 
          
        }
        &:nth-child(2){
          width:70%; font-size:13px; font-family:'noto-medium'; 
          span.empty{color:var(--text-color-thin)}
        
        }

        span.number{font-family:'roboto-medium'; font-size:14px}
        a{ 
          color:var(--color-bold); cursor:pointer;                    
          span{
            display:inline-block; vertical-align:middle; height:20px; font-size:13px; font-family:'roboto-medium';
            &.i{width:16px; }            
            &:hover{font-family:'roboto-bold'}
          }
        }
      }
      div.content{
        width:100%; padding:120px 20px; border-radius:5px; background-color:var(--bg-color-sub);

        .no-data{
          text-align:center; font-size:13px; color:var(--text-color-light);
          span.ico{
            display:inline-block; width:80px;
          }
        }
      }
      div.f {
        width:100%;
        .key{ font-size: 12px; font-family: 'noto-medium'; color: var(--text-color-bold) }
        .value{ 
          padding: 8px 0; 
          .editor{
            padding:3px; border:solid 1px var(--border-color-bold); border-radius: 3px;
          }
        }
      }
    }
  }
</style>
<template>
  <div>
    <ul>
      <li>
        <div>이슈 기간</div>
        <div>
          <span class="number">
            <template v-if="moment(props.issue.start).format('HHmm') + moment(props.issue.end).format('HHmm') === '00000000'">{{ moment(props.issue.start).format("YYYY.MM.DD") }} ~ {{ moment(props.issue.end).format("YYYY.MM.DD") }}</template>
            <template v-else>{{ moment(props.issue.start).format("YYYY.MM.DD HH:mm") }} ~ {{ moment(props.issue.end).format("YYYY.MM.DD HH:mm") }}</template>
          </span>
        </div>
      </li>
      <li>
        <div>카테고리</div>
        <div>{{ props.categoryList.find((entry) => entry.key === props.issue.category).label }}</div>
      </li>
      <li>
        <div>태그</div>
        <div><span class="empty">미등록</span></div>
      </li>
      <li>
        <div>담당자</div>
        <div><span class="empty">미등록</span></div>
      </li>
      <li>
        <div>상태</div>
        <div>{{ props.statusList.find((entry) => entry.key === props.issue.status).label }}</div>
      </li>
      <li>
        <div class="content">
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
        </div>
      </li>
      <li>
        <div>연관 지표</div>
        <div>
          <a href="https://maplestats.nexon.com/default.aspx" target="_blank">
            <span class="t">https://maplestats.nexon.com/default.aspx</span>
            <span class="i">
              <svg viewBox="0 0 24 24" fill="none" data-v-525f8598="" style="transform: rotate(180deg)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor" data-v-525f8598=""></path></svg>
            </span>
          </a>
        </div>
      </li>
      <li v-if="false">
        <div class="f">
          <el-button style="float: left" @click="emit('deleteIssue', props.issue)" :type="'info'" plain>삭제</el-button>
          <el-button style="float: right" @click="emit('modifyIssue')" :type="'primary'">이슈 수정</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
const moment = inject("moment");
const props = defineProps(["issue", "categoryList", "statusList"]);
const emit = defineEmits(["modifyIssue", "deleteIssue"]);
</script>
