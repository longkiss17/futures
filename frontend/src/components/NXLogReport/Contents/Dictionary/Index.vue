<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <el-input v-model="options.filterKeys.reportdictionaryName" placeholder="검색어 입력" style="width: 30%" clearable>
        <template #prepend>지표 이름</template>
      </el-input>
      <el-input v-model="options.filterKeys.explanation" placeholder="검색어 입력" style="width: 30%" clearable>
        <template #prepend>지표 설명</template>
      </el-input>
      <el-input v-model="options.filterGroupKeys.modifyId.value" placeholder="검색어 입력" style="width: 28%" clearable>
        <template #prepend>등록/수정 담당자</template>
      </el-input>
      <el-button type="primary" @click="reset">초기화</el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="19%" />
            <col width="35%" />
            <col width="15%" />
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
              <th>지표 이름</th>
              <th>지표 설명</th>
              <th>전체/게임별</th>
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
        <table v-if="data && !isLoading" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="19%" />
            <col width="35%" />
            <col width="15%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td class="left normal">
                <router-link :to="'dictionary/modify/' + entry.reportdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" class="link" v-html="entry.reportdictionaryName"></span>
                </router-link>
              </td>
              <td class="normal left" v-html="entry.explanation.toHtmlEncode()"></td>
              <td class="normal">{{ entry.serviceSeqLabel }}</td>
              <td class="normal">
                <span v-html="entry.modifyIdLabel"></span>
                <span class="small" v-if="entry.modifyId" v-html="'(' + entry.modifyId + ')'"></span>
              </td>
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="dictionary" :menuKey="entry.reportdictionarySeq"></revision-history>
                <icon class="action" @click="deleteRow(entry)" :name="'Delete'"></icon>
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
                <el-pagination @size-change="changePageSize" v-model:current-page="options.currentPage" v-model:page-size="pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <router-link :to="{ path: 'dictionary/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
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
import { ref, reactive, inject, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();
const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { serviceGroup, metaData } = storeToRefs(store);

const title = "지표용어";
const emit = defineEmits(["title"]);
emit("title", `${title} 관리`, `리포트 내 사용되는 지표 용어를 등록 관리합니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
  labels.serviceSeq = metaData.value.serviceSeq;

  if (metaData.value.serviceSeq) {
    metaData.value.serviceSeq[-1] = "전체서비스";
  }
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/dictionary", { size: 10000, sort: "reportdictionarySeq,desc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, {
  labels: labels,
  mergeKeys: mergeKeys,
  filterGroupKeys: {
    modifyId: {
      value: "",
      keys: ["modifyId", "registerId", "modifyIdLabel", "registerIdLabel"],
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

watch(options, () => {
  router.push({ path: route.path, query: queryStrings() });
});

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.reportdictionaryName}"을 삭제하시겠습니까?`, `${title} 삭제`, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/dictionary/" + row.reportdictionarySeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "reportdictionarySeq", value: row.reportdictionarySeq });
        ElMessage({
          type: "info",
          message: `지표용어  "${row.reportdictionaryName}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
