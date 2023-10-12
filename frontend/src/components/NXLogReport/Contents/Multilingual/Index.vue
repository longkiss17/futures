<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <el-input v-model="searchKey" placeholder="리포트	or report	レポート" clearable style="width: 50%">
        <template #prepend>단어 (다국어 포함)</template>
      </el-input>
      <el-input v-model="searchKey2" placeholder="이름 or 사번" clearable style="width: 30%">
        <template #prepend>등록 담당자</template>
      </el-input>
      <el-button
        type="primary"
        @click="
          reset();
          searchKey = '';
        "
      >
        초기화
      </el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="8%" />
            <col width="21%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
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
              <th>단어</th>
              <th>영어</th>
              <th>일본어</th>
              <th>중국어(간체)</th>
              <th>중국어(번체)</th>
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
            <col width="8%" />
            <col width="21%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td class="normal left">
                <router-link :to="'multilingual/modify/' + entry.multilingualdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" class="link" v-html="entry.word"></span>
                </router-link>
              </td>
              <td class="normal left">
                <router-link :to="'multilingual/modify/' + entry.multilingualdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" v-html="entry.wordEn"></span>
                </router-link>
              </td>
              <td class="normal left">
                <router-link :to="'multilingual/modify/' + entry.multilingualdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" v-html="entry.wordJp"></span>
                </router-link>
              </td>
              <td class="normal left">
                <router-link :to="'multilingual/modify/' + entry.multilingualdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" v-html="entry.wordCn"></span>
                </router-link>
              </td>
              <td class="normal left">
                <router-link :to="'multilingual/modify/' + entry.multilingualdictionarySeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" v-html="entry.wordTw"></span>
                </router-link>
              </td>
              <td class="normal">
                <span v-html="entry.modifyIdLabel"></span>
                <span class="small" v-if="entry.modifyId" v-html="'(' + entry.modifyId + ')'"></span>
              </td>
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="multilingual" :menuKey="entry.multilingualdictionarySeq"></revision-history>
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
                <el-pagination v-model:current-page="options.currentPage" v-model:page-size="pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <router-link :to="{ path: 'multilingual/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
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
import { inject, reactive, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();

const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { metaData } = storeToRefs(store);

const emit = defineEmits(["title"]);
emit("title", `단어 별 번역 관리`, `언어 변환 시 적용될 번역 내용을 등록 관리할 수 있습니다. 단어, 단문 등 간단한 표현 위주의 표현 위주로 입력해주세요.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/multilingual", { sort: "multilingualdictionarySeq,desc", size: 100000 });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, reset, queryStrings } = board(data, {
  filterGroupKeys: {
    word: {
      value: "",
      keys: ["word", "wordEn", "wordJp", "wordCn", "wordTw"],
    },
    modifyId: {
      value: "",
      keys: ["modifyId", "registerId", "modifyIdLabel", "registerIdLabel"],
    },
  },
  labels: labels,
  mergeKeys: mergeKeys,
});

let searchKey = ref("");
let searchKey2 = ref("");
let timer = null;

let pageSize = ref(options.pageSize);
let isLoading = ref(false);

watch(pageSize, async () => {
  isLoading.value = true;
  setTimeout(() => {
    options.pageSize = pageSize.value;
    isLoading.value = false;
  }, 0);
});

watch(searchKey, (curr, prev) => {
  let interval = curr.length < prev.length ? 1000 : 500;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    options.filterGroupKeys.word.value = searchKey.value;
    timer = null;
  }, interval);
});

watch(searchKey2, (curr, prev) => {
  let interval = curr.length < prev.length ? 1000 : 500;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    options.filterGroupKeys.modifyId.value = searchKey2.value;
    timer = null;
  }, interval);
});

watch(options, () => {
  router.push({ path: route.path, query: queryStrings() });
});

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.word}"을 삭제하시겠습니까?`, "단어 삭제", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/multilingual/" + row.multilingualdictionarySeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "multilingualdictionarySeq", value: row.multilingualdictionarySeq });
        ElMessage({
          type: "info",
          message: `단어 "${row.word}" 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
