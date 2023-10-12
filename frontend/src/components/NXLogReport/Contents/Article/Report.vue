<!-- prettier-ignore -->
<style lang="scss" scoped>  
  .filter{
    padding: 15px; margin-bottom: 15px; background-color: var(--bg-color-sub); border: solid .5px var(--bg-color-bold); border-radius: 5px;
    .el-input, .el-select{ margin-right: 10px;}
    .el-button{float: right;}
    .el-select{ width:260px;}
  }
  .list{
    display: flex; height: 500px; 
    &>div{
      &:first-child{
        width:65%; transition: all .3s ease;
        .asm-table-body{
          height:calc(100% - 61px); overflow: auto;
          tr{
            cursor: pointer;
            &:hover{ background-color: var(--color-thin)}
          }
        }

        &.full{ width:100%}
      }
      &:last-child{
        width:0; border:none !important; height:calc(100% - 23px); border-bottom: solid 1px var(--border-color); overflow: auto;
        &.show{width:calc(35% - 10px); padding-left: 10px; }
        ul{
          li{
            position: relative; list-style: none; padding: 10px; margin-bottom: 4px; font-size:12px; background-color: var(--bg-color-sub);
            &:hover{
              background-color: var(--color-light); font-family: 'noto-medium'; color: var(--color-active); cursor: pointer;
            }
            span{
              display: inline-block; vertical-align: middle;
              &.name{width:90%;}
              svg{position: absolute; right: 5px; top:10px; display: inline-block; vertical-align: middle;}
            }
          }
        }    
      }
    } 
  }
  div.button{
    width:100%; text-align: right;
  }
  
</style>
<template>
  <div class="filter">
    <span class="prepend">리포트 분류</span>
    <el-select v-model="options.selectKeys.option1" filterable placeholder="리포트 분류">
      <el-option v-for="item in division" :key="item" :label="item" :value="item" />
    </el-select>
    <el-input v-model="options.filterKeys.value" placeholder="검색어 입력" style="width: 40%" clearable>
      <template #prepend>리포트명</template>
    </el-input>
    <el-button type="primary" @click="reset">초기화</el-button>
  </div>
  <div class="list">
    <div :class="{ full: boardData.filteredData.filter((d) => d.checked).length === 0 }">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="10%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="45%" />
          </colgroup>
          <thead>
            <tr>
              <th @click="sortKey('index')" class="on">선택</th>
              <th>리포트 번호</th>
              <th>리포트 분류</th>
              <th @click="sortKey('modifyTime')" class="on">
                카테고리
                <sort :arrow="options.sortKeys.modifyTime"></sort>
              </th>
              <th @click="sortKey('value')" class="on">
                리포트명
                <sort :arrow="options.sortKeys.value"></sort>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="asm-table-body">
        <table v-if="data && !isLoading" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="10%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="45%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0 && options.selectKeys.option1">
            <tr v-for="entry in boardData.filteredData" @click="checkReport(entry, $event)">
              <td><el-checkbox v-model="entry.checked" label="" size="small" /></td>
              <td>{{ entry.key }}</td>
              <td v-html="entry.option1"></td>
              <td>{{ entry.option2 }}</td>
              <td v-html="entry.value"></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="100">
                <el-empty :image-size="200" />
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <skeleton :count="options.pageSize" :style="{ margin: '9px 0 9px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
          <br />
          <skeleton :count="1" :style="{ width: '100px' }"></skeleton>
          <skeleton :count="1" :style="{ width: '300px', margin: '0 10px' }"></skeleton>
          <skeleton :count="1" :style="{ width: '80px', margin: '0 10px' }"></skeleton>
          <skeleton :count="1" :style="{ width: '70px', float: 'right' }"></skeleton>
        </div>
      </div>
    </div>
    <div :class="{ 'checked-list': true, show: checkedReportList.length }">
      <ul>
        <li v-for="(entry, index) in checkedReportList">
          <span class="name" v-html="entry.key + ' | ' + (entry.option1 ? entry.option1 + ' | ' : '') + (entry.option2 ? entry.option2 + ' | ' : '') + entry.value"></span>
          <span class="x" @click="deleteReport(entry, index)"><icon :name="'Close'"></icon></span>
        </li>
      </ul>
    </div>
  </div>
  <div class="button">
    <el-button @click="selectReport(false)">취소</el-button>
    <el-button type="primary" @click="selectReport(true)">추가</el-button>
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch, computed } from "vue";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

const emit = defineEmits(["selectReport", "closeReport"]);
const props = defineProps(["showsReport", "selectedReportList"]);

const fetch = inject("fetch");
const board = inject("board");

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

let { data } = fetch("/api/report/meta/reportSeq", { size: 10000 }, {}, "get", (results) => {
  return results.reportSeq.metaValues;
});
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, { labels: labels, mergeKeys: mergeKeys, pageSize: 1000 });

let pageSize = ref(options.pageSize);
let isLoading = ref(false);

let checkedReportList = ref([]);

let division = computed(() => {
  if (boardData.data.length) {
    let group = boardData.data
      .map((entry) => entry.option1)
      .filter((entry) => entry)
      .groupBy();

    options.selectKeys.option1 = group[0];
    return group;
  } else {
    return [];
  }
});

watch(data, () => {
  props.selectedReportList.forEach((report) => {
    let entry = data.value.find((entry) => entry.key == report.key);
    entry.checked = true;
    checkedReportList.value.push(entry);
  });
});

watch(
  () => props.selectedReportList,
  () => {
    // console.log(props.selectedReportList);
  },
  {
    deep: true,
  }
);

watch(options.selectKeys, () => {
  gsap.to(document.querySelector(".asm-table-body"), { duration: 0.6, scrollTo: 0 });
});

watch(pageSize, async () => {
  isLoading.value = true;
  setTimeout(() => {
    options.pageSize = pageSize.value;
    isLoading.value = false;
  }, 100);
});

function checkReport(entry, event) {
  if (event.target.className !== "el-checkbox__inner") {
    entry.checked = entry.checked ? false : true;

    if (entry.checked) checkedReportList.value.push(entry);
    else {
      let index = checkedReportList.value.findIndex((report) => report.key === entry.key);
      checkedReportList.value.splice(index, 1);
    }
  }
}

function deleteReport(entry, index) {
  let report = checkedReportList.value.find((report) => report.key === entry.key);
  report.checked = false;
  checkedReportList.value.splice(index, 1);
}

function selectReport(action) {
  if (action)
    emit(
      "selectReport",
      boardData.data.filter((d) => d.checked)
    );
  else {
    emit("closeReport");
  }
}
</script>
