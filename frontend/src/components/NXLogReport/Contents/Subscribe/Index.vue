<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <span class="prepend">대상 게임 및 토픽</span>
      <el-select v-model="options.selectKeys.serviceSeq" placeholder="대상 게임 및 토픽." filterable>
        <el-option-group v-for="group in serviceGroup.filter((s) => s.label === '라이브')" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.key" />
        </el-option-group>
      </el-select>
      <el-input v-model="options.filterKeys.userKeyLabel" placeholder="Search" style="width: 30%" clearable>
        <template #prepend>구독자</template>
      </el-input>
      <el-button type="primary" @click="reset()">초기화</el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="8%" />
            <col width="11%" />
            <col width="16%" />
            <col width="11%" />
            <col width="11%" />
            <col width="11%" />
            <col width="8%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th @click="sortKey('index')" class="on">
                번호
                <sort :arrow="options.sortKeys.index"></sort>
              </th>
              <th>구독자</th>
              <th>게임명</th>
              <th>
                <span class="badge" v-if="checked('reportSeq')"></span>
                <dropdown-filter label="리포트명" keyName="reportSeq" :data="dropdownData('reportSeq')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>
                <span class="badge" v-if="checked('tabPane')"></span>
                <dropdown-filter label="탭구분" keyName="tabPane" :data="dropdownData('tabPane')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>
                <span class="badge" v-if="checked('locale')"></span>
                <dropdown-filter label="언어" keyName="locale" :data="dropdownData('locale')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th class="on">
                <span class="badge" v-if="checked('useYn')"></span>
                <dropdown-filter label="상태" keyName="useYn" :data="dropdownData('useYn')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>최종 수정</th>
              <th @click="sortKey('modifyTime')" class="on">
                최종 수정일
                <sort :arrow="options.sortKeys.modifyTime"></sort>
              </th>
              <th>관리</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="asm-table-body">
        <table v-if="data" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="8%" />
            <col width="11%" />
            <col width="16%" />
            <col width="11%" />
            <col width="11%" />
            <col width="11%" />
            <col width="8%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td>
                <span v-html="userKey[entry.userKey] + '<br><span class=\'small\'>(' + entry.userKey + ')</span>'"></span>
              </td>
              <td>{{ entry.serviceSeqLabel }}</td>
              <td class="normal">
                <span v-html="entry.reportSeqLabel"></span>
              </td>
              <td>{{ entry.tabPane }}</td>
              <td>{{ entry.localeLabel }}</td>
              <td>
                <span :class="entry.useYn === 'Y' ? 'enable' : 'disable'">{{ entry.useYnLabel }}</span>
              </td>
              <td class="normal">
                {{ entry.modifyIdLabel }}
                <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
              </td>
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="subscribe" :menuKey="entry.mailsubscriptionSeq"></revision-history>
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
                <el-pagination v-model:current-page="options.currentPage" v-model:page-size="options.pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <!-- <router-link :to="{ path: 'subscribe/add' }"><el-button type="primary" class="add">등록</el-button></router-link> -->
              </div>
            </td>
          </tfoot>
        </table>
        <div v-else>
          <skeleton-board></skeleton-board>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { DocumentAdd, Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { serviceGroup, metaData } = storeToRefs(store);

const emit = defineEmits(["title"]);
emit("title", `메일 구독 관리`, `리포트별로 제공 중인 메일 구독 신청 명단 및 별도 등록 처리를 지원합니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.subscriptionUseYn;
  labels.reportSeq = metaData.value.reportSeq;
  labels.locale = metaData.value.subscriptionLocale;
  labels.serviceSeq = metaData.value.serviceSeq;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
  labels.userKey = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data, error } = fetch("/api/report/subscribe", { size: 10000, sort: "registerTime,desc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, reset, resetCheckBox } = board(data, {
  labels: labels,
  mergeKeys: mergeKeys,
});

let userKeys = fetch("/api/report/meta/userKey", { size: 10000 });
let userKey = reactive({});

watch(userKeys.data, () => {
  userKeys.data.value.userKey.metaValues.forEach((entry) => {
    userKey[entry.key] = entry.value;
  });
});
</script>
