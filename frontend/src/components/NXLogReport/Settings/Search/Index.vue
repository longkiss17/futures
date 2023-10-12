<!-- prettier-ignore -->
<style lang="scss" scoped>  
  .list{
    padding: 10px 0; display: flex;
    &>div{
      transition: all .2s; 
      &:first-child{ width:60%; padding-right:20px; margin-right: 20px;border-right: solid 1px var(--border-color);}
      &:last-child{ width:calc(40% - 40px); }
    }
  }
  .sub-title{     
    position: relative; padding: 15px 0; color: var(--text-color-bold); font-size: 16px;   
  }
  .summary{
    display: flex; padding: 15px; height:20px; margin-bottom: 15px; background-color: var(--color-light); border: solid 1px var(--color-medium); border-radius: 4px;
    div{
      width:33.3333%;
      span{
        display: inline-block; font-size: 12px; font-family: "noto-medium"; color: var(--text-color-bold);
        &:last-child{padding:0 10px;}
      }
      &.w50{width:50%;}
    }    
  }  
</style>
<template>
  <div class="c">
    <div class="filter">
      <span class="prepend">기간 선택</span>
      <el-date-picker v-model="dateRange" style="vertical-align: middle; width: 34%; margin-right: 10px" type="daterange" :shortcuts="shortcuts" value-format="YYYY-MM-DD" range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
      <el-input v-model="options.filterKeys.searchKeyword" placeholder="ex) 매출" style="width: 26%" clearable>
        <template #prepend>검색어</template>
      </el-input>
      <span class="prepend">추천</span>
      <el-select v-model="options.selectKeys.integratedStatus" filterable placeholder="대상" style="width: 10%">
        <el-option v-for="item in integratedStatusList" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button type="primary" @click="allReset()">초기화</el-button>
    </div>
    <div class="list">
      <div :style="{ width: data && data.length === 0 ? '100%' : '60%' }">
        <div class="sub-title">
          조회 결과 랭킹
          <el-button size="small" @click="showsRecommend = true" style="margin-top: -0px; float: right">추천 설정</el-button>
          <el-dialog v-model="showsRecommend" :destroy-on-close="true" title="추천 설정" width="460" :top="'15%'">
            <recommend @closeRecommend="closeRecommend"></recommend>
          </el-dialog>
        </div>
        <div v-if="summary && summary.data && summary.data.value" class="summary">
          <div>
            <span>전체 검색어 수 :</span>
            <span>{{ summary.data.value[0].totalKeyword.toComma() }}</span>
          </div>
          <div>
            <span>전체 검색 횟수 :</span>
            <span>{{ summary.data.value[0].totalCount.toComma() }}</span>
          </div>
          <div>
            <span>전체 검색 사용자 수 :</span>
            <span>{{ summary.data.value[0].totalUser.toComma() }}</span>
          </div>
        </div>
        <div class="asm-table-head">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="15%" />
              <col width="18%" />
              <col width="17%" />
            </colgroup>
            <thead>
              <tr>
                <th @click="sortKey('sortOrder')" class="on">
                  기간 내 순위
                  <sort :arrow="options.sortKeys.sortOrder"></sort>
                </th>
                <th>검색어</th>
                <th @click="sortKey('searchCount')" class="on">
                  검색횟수
                  <sort :arrow="options.sortKeys.searchCount"></sort>
                </th>
                <th class="on">
                  <span class="badge" v-if="checked('integratedStatus')"></span>
                  <dropdown-filter label="추천 설정" keyName="integratedStatus" :data="dropdownData('integratedStatus')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
                </th>
                <th>통합 검색 결과</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="asm-table-body">
          <table v-if="data && !isLoading" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="15%" />
              <col width="18%" />
              <col width="17%" />
            </colgroup>
            <tbody v-if="boardData.filteredData.length > 0">
              <tr v-for="entry in boardData.filteredData" :class="{ active: entry.active }">
                <td>{{ entry.sortOrder }}</td>
                <td class="left normal">
                  <span class="link" v-html="entry.searchKeyword" @click="getkeywordDetailData(entry)"></span>
                </td>
                <td>{{ entry.searchCount }}</td>
                <td>{{ entry.integratedStatus }}</td>
                <td>
                  <a class="link" target="_blank" :href="config.nxlogreportUrl + '/search?q=' + encodeURIComponent(entry.searchKeyword)">
                    <icon class="action" :name="'OpenInNew'" style="margin-top: -5px"></icon>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="100">
                  <el-empty :image-size="200" />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="100">
                <div class="pagination" v-if="boardData.filteredData.length">
                  <el-pagination @size-change="changePageSize" v-model:current-page="options.currentPage" v-model:page-size="pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                  <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                </div>
              </td>
            </tfoot>
          </table>
          <div v-else>
            <skeleton :count="options.pageSize" :style="{ margin: '2px 0 2px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
            <br />
            <skeleton :count="1" :style="{ width: '20%' }"></skeleton>
            <skeleton :count="1" :style="{ width: '56%', margin: '0 10px' }"></skeleton>
            <skeleton :count="1" :style="{ width: '20%', float: 'right' }"></skeleton>
          </div>
        </div>
      </div>
      <div v-show="data && data.length && !isLoading">
        <div class="sub-title">검색어 상세 정보</div>
        <div class="summary">
          <template v-if="keywordSummary && keywordSummary.data && keywordSummary.data.value">
            <div class="w50">
              <span>전체 검색 횟수 :</span>
              <span>{{ keywordSummary.data.value[0].totalCount.toComma() }}</span>
            </div>
            <div class="w50">
              <span>전체 검색 사용자 수 :</span>
              <span>{{ keywordSummary.data.value[0].totalUser.toComma() }}</span>
            </div>
          </template>
          <template v-else>
            <skeleton :count="1" :style="{ width: '100%' }"></skeleton>
          </template>
        </div>
        <div class="asm-table-head">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="15%" />
              <col width="25%" />
              <col width="40%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th style="height: 21px">순위</th>
                <th>법인</th>
                <th>사원명</th>
                <th>검색횟수</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="asm-table-body">
          <table v-if="!isLoading2" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="15%" />
              <col width="25%" />
              <col width="40%" />
              <col width="20%" />
            </colgroup>
            <tbody v-if="filteredKeywordDetailData.length > 0">
              <tr v-for="entry in filteredKeywordDetailData">
                <td>{{ entry.sortOrder }}</td>
                <td>{{ entry.deptName }}</td>
                <td :title="entry.userName + '(' + entry.userKey + ')'">
                  {{ entry.userName }}
                  <span class="small" v-if="entry.userKey">({{ entry.userKey }})</span>
                </td>
                <td>{{ entry.searchCount }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="100">
                  <el-empty :image-size="200" />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="100">
                <div class="pagination" v-if="keywordDatailData.length > 10">
                  <el-pagination @size-change="changePageSize" v-model:current-page="keywordDatailOptions.currentPage" v-model:page-size="keywordDatailOptions.pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="keywordDatailOptions.total" class="mt-4" />
                  <!-- <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + keywordDatailOptions.total.toComma() }}개</span> -->
                </div>
              </td>
            </tfoot>
          </table>
          <div v-else>
            <skeleton :count="options.pageSize" :style="{ margin: '2px 0 2px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
            <br />
            <skeleton :count="1" :style="{ width: '20%' }"></skeleton>
            <skeleton :count="1" :style="{ width: '50%', margin: '0 10px' }"></skeleton>
            <skeleton :count="1" :style="{ width: '20%', float: 'right' }"></skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import recommend from "./Recommend.vue";
import config from "@/stores/config";

const route = useRoute();
const router = useRouter();
const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");
const board = inject("board");
const moment = inject("moment");

const emit = defineEmits(["title"]);
emit("title", `검색 통계 및 설정`, `통합 검색 이용 현황 확인 및 추천 검색어를 관리할 수 있습니다.`);

fetch("/api/report/meta/realtime_tabpane");

let integratedStatusList = ref([
  { key: "", label: "전체" },
  { key: "Y", label: "추천 설정만" },
  { key: "N", label: "추천 설정 제외" },
]);

let dateRange = ref([moment().add("days", -100).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]);
watch(
  dateRange,
  () => {
    isLoading.value = true;
    setTimeout(() => {
      params.startDate = dateRange.value[0];
      params.endDate = dateRange.value[1];
      isLoading.value = false;
    }, 500);
  },
  { deep: true }
);

const shortcuts = [
  ["Today", 0],
  ["Last week", 7],
  ["Last month", 30],
  ["Last 3 months", 90],
  ["Last 1 years", 365],
  ["All Time", 1500],
].map((entry) => {
  return {
    text: entry[0],
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * entry[1]);
      return [start, new Date()];
    },
  };
});

let params = reactive({ startDate: dateRange.value[0], endDate: dateRange.value[1], searchOption: "ALL" });

let { data } = fetch("/api/report/searchkeywordranking", {}, params, "post");
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data);

let summary = fetch("/api/report/searchkeywordsummary", {}, params, "post");
let keywordSummary = {};
let keywordDatailData = ref([]);
let keywordDatailOptions = reactive({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100, 1000],
  total: 0,
});

let pageSize = ref(options.pageSize);
let isLoading = ref(false);
let isLoading2 = ref(false);

watch(pageSize, async () => {
  isLoading.value = true;
  setTimeout(() => {
    options.pageSize = pageSize.value;
    isLoading.value = false;
  }, 100);
});

watch(options, () => {
  router.push({ path: route.path, query: queryStrings() });
});

watch(data, () => {
  if (data.value && data.value.length) getkeywordDetailData(data.value[0]);
  else keywordDatailData.value = [];
});

let filteredKeywordDetailData = computed(() => {
  return keywordDatailData.value.slice(keywordDatailOptions.pageSize * (keywordDatailOptions.currentPage - 1), keywordDatailOptions.pageSize * keywordDatailOptions.currentPage);
});

function getkeywordDetailData(entry) {
  let prevEntry = boardData.data.find((d) => d.active);
  if (prevEntry) prevEntry.active = false;

  isLoading2.value = true;

  setTimeout(async () => {
    entry.active = true;
  }, 100);

  setTimeout(async () => {
    let text = entry.searchKeywordOrigin ? entry.searchKeywordOrigin : entry.searchKeyword;
    let results = await fetchAsync("/api/report/searchkeyworddetail", {}, { startDate: dateRange.value[0], endDate: dateRange.value[1], searchDetailText: text }, "post");
    keywordDatailData.value = results.data.value;
    keywordDatailOptions.total = results.data.value.length;
    isLoading2.value = false;

    keywordSummary = fetch("/api/report/searchkeyworddetailsummary", {}, { startDate: dateRange.value[0], endDate: dateRange.value[1], searchDetailText: text }, "post");
  }, 200);
}

function allReset() {
  reset();
  dateRange.value = [moment().add("days", -60).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];
}

let showsRecommend = ref(false);

function closeRecommend() {
  showsRecommend.value = false;
}
</script>
