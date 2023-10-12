<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="35%" />
            <col width="7%" />
            <col width="7%" />
            <col width="20%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>노출순서</th>
              <th>제목</th>
              <th>만족도</th>
              <th>조회수</th>
              <th>태그</th>
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
            <col width="35%" />
            <col width="7%" />
            <col width="7%" />
            <col width="20%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <draggable v-if="boardData.filteredData.length > 0" v-model="boardData.filteredData" :item-key="'title'" tag="tbody" handle=".move" ghost-class="ghost">
            <template #item="{ element: entry }">
              <tr>
                <td :class="{ move: sortable }">
                  <icon v-if="sortable" :name="'DragHandle'"></icon>
                  <span v-else>{{ entry.sortNo }}</span>
                </td>
                <td class="left normal">
                  <router-link :to="'faq/modify/' + entry.faqSeq" custom v-slot="{ href, navigate }">
                    <span @click="navigate" class="link" v-html="entry.subject"></span>
                  </router-link>
                </td>
                <td>{{ entry.satisfaction }}</td>
                <td>{{ entry.hits }}</td>
                <td class="normal">{{ entry.tags }}</td>
                <td class="normal">
                  {{ entry.modifyIdLabel }}
                  <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
                </td>
                <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
                <td>
                  <revision-history serviceName="report" menuPath="faq" :menuKey="entry.faqSeq"></revision-history>
                  <icon class="action" @click="deleteRow(entry)" :name="'Delete'" :width="22" :height="22"></icon>
                </td>
              </tr>
            </template>
          </draggable>
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
                <el-button :type="sortable ? 'primary' : 'default'" class="order" @click="changePriority()">노출 순서 변경{{ sortable ? "완료" : "" }}</el-button>
                <el-button type="info" v-if="sortable" class="order" @click="cancelPriority()">취소</el-button>
                <el-button type="default" class="order" @click="showsTag = true">태그 출력 설정</el-button>
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <router-link :to="{ path: 'faq/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
              </div>
            </td>
          </tfoot>
        </table>
      </div>
      <el-dialog v-model="showsTag" :destroy-on-close="true" width="460" :top="'23vh'" title="태그 출력 설정">
        <tag @closeTag="closeTag"></tag>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";
import tag from "./Tag.vue";

const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { metaData } = storeToRefs(store);

const title = "자주 묻는 질문";
const emit = defineEmits(["title"]);
emit("title", `${title} 관리`, `Help Center에 노출되는 자주 묻는 질문의 내용을 등록 관리 합니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
  labels.noticeCategory = metaData.value.noticeCategory;
  labels.serviceSeq = metaData.value.serviceSeq;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/faq", { size: 10000, sort: "faqSeq,desc" });
let { boardData, options, sortKey, del } = board(data, { pageSize: 1000, labels: labels, mergeKeys: mergeKeys });

let isLoading = ref(false);
let sortable = ref(false);
let showsTag = ref(false);

function changePriority() {
  sortable.value = !sortable.value;

  if (!sortable.value) {
    boardData.filteredData.forEach((entry, i) => {
      entry.sortNo = i + 1;
    });

    let postData = boardData.filteredData.map((entry) => {
      return {
        contents: entry.contents,
        useYn: entry.useYn,
        tags: entry.tags,
        faqSeq: entry.faqSeq,
        subject: entry.subject,
        attachfiles: entry.attachfiles,
        sortNo: entry.sortNo,
        hits: entry.hits,
        satisfaction: entry.satisfaction,
      };
    });

    options.isFiltering = !sortable.value;
    options.sortKeys.sortNo = 0;
    sortKey("sortNo");

    fetch("/api/report/faq", {}, postData, "put");

    ElMessage({
      type: "info",
      message: `노출순서가 변경되었습니다.`,
    });
  } else {
    options.isFiltering = !sortable.value;
  }
}

function cancelPriority() {
  options.isFiltering = true;
  options.sortKeys.sortNo = 0;
  sortKey("sortNo");
  sortable.value = !sortable.value;
}

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.subject}"을 삭제하시겠습니까?`, `${title} 삭제`, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/faq/" + row.faqSeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "noticeSeq", value: row.faqSeq });
        ElMessage({
          type: "info",
          message: `${title} "${row.subject}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}

function closeTag() {
  showsTag.value = false;
}
</script>
