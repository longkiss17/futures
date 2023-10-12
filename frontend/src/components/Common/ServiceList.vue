<!-- prettier-ignore -->
<style lang="scss" scoped>  
  .filter{
    padding: 15px; background-color: var(--bg-color-sub); border: solid .5px var(--bg-color-bold); border-radius: 5px;
    .el-input, .el-select{ margin-right: 10px;}
    .el-select{ width:260px;}

    .el-button{float: right;}
  }
  .list{
    padding: 10px 0;
  }
  
</style>
<template>
  <div class="c">
    <div class="filter">
      <el-input v-model="options.filterGroupKeys.gameName.value" ref="strRef" placeholder="ex) 메이플 or 430011397 or 3" style="width: 100%" clearable>
        <template #prepend>서비스 검색</template>
      </el-input>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="17%" />
            <col width="17%" />
            <col width="30%" />
            <col width="13%" />
            <col width="10%" />
            <col width="13%" />
          </colgroup>
          <thead>
            <tr>
              <th @click="sortKey('serviceSeq')" class="on">
                ServiceSeq
                <sort :arrow="options.sortKeys.serviceSeq"></sort>
              </th>
              <th @click="sortKey('serviceId')" class="on">
                서비스아이디
                <sort :arrow="options.sortKeys.serviceId"></sort>
              </th>
              <th @click="sortKey('gameName')" class="on">
                게임
                <sort :arrow="options.sortKeys.gameName"></sort>
              </th>
              <th>
                <dropdown-filter label="타입" keyName="gameType" :data="dropdownData('gameType')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>
                <dropdown-filter label="리전" keyName="regionId" :data="dropdownData('regionId')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>
                <dropdown-filter label="UseYN" keyName="useYn" :data="dropdownData('useYn')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="asm-table-body">
        <table v-if="data && !isLoading" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="17%" />
            <col width="17%" />
            <col width="30%" />
            <col width="13%" />
            <col width="10%" />
            <col width="13%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td v-html="entry.serviceSeq"></td>
              <td v-html="entry.serviceId"></td>
              <td class="normal left" style="padding-left: 10px" v-html="entry.gameName"></td>
              <td class="normal" v-html="entry.gameType"></td>
              <td class="normal" v-html="entry.regionId"></td>
              <td>
                <span :class="entry.useYn === 'Y' ? 'enable' : 'disable'">{{ entry.useYnLabel }}</span>
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
              <div class="pagination">
                <el-pagination @size-change="changePageSize" v-model:current-page="options.currentPage" v-model:page-size="pageSize" :page-sizes="options.pageSizes" small background layout="prev, pager, next" :total="options.total" class="mt-4" />
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
              </div>
            </td>
          </tfoot>
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
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ElInput } from "element-plus";

const route = useRoute();
const router = useRouter();
const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");
const strRef = ref(ElInput);

const { metaData } = storeToRefs(store);

let labels = reactive({});

onMounted(() => {
  nextTick(() => {
    strRef.value.focus();
  });
});

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/service", { size: 10000, sort: "serviceSeq,desc" });
let { boardData, options, sortKey, toggle, dropdownData, resetCheckBox } = board(data, {
  labels: labels,
  filterGroupKeys: {
    gameName: {
      value: "",
      keys: ["gameName", "serviceSeq", "serviceId", "gameType", "regionId"],
    },
  },
});

let pageSize = ref(options.pageSize);
let isLoading = ref(false);

watch(pageSize, async () => {
  isLoading.value = true;
  setTimeout(() => {
    options.pageSize = pageSize.value;
    isLoading.value = false;
  }, 100);
});
</script>
