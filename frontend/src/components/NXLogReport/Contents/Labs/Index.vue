<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="16%" />
            <col width="34%" />
            <col width="10%" />
            <col width="10%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>노출순서</th>
              <th>서비스명</th>
              <th>배너 URL</th>
              <th>이미지</th>
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
        <table v-if="data && !isLoading" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="16%" />
            <col width="34%" />
            <col width="10%" />
            <col width="10%" />
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
                  <router-link :to="'labs/modify/' + entry.bannerSeq" custom v-slot="{ href, navigate }">
                    <span @click="navigate" class="link" v-html="entry.title"></span>
                  </router-link>
                </td>
                <td class="normal left">{{ entry.bannerLink }}</td>

                <td class="normal number">
                  <img :src="entry.thumbnailUrl" :alt="entry.title" width="40" height="40" />
                </td>
                <td>
                  <span :class="entry.useYn === 'Y' ? 'enable' : 'disable'">{{ entry.useYnLabel }}</span>
                </td>
                <td class="normal">
                  {{ entry.modifyIdLabel }}
                  <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
                </td>
                <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
                <td>
                  <revision-history serviceName="report" menuPath="banner" :menuKey="entry.bannerSeq"></revision-history>
                  <icon class="action" @click="deleteRow(entry)" :name="'Delete'"></icon>
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
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <router-link :to="{ path: 'labs/add', query: { sortNo: options.total + 1 } }"><el-button type="primary" class="add">등록</el-button></router-link>
              </div>
            </td>
          </tfoot>
        </table>
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

const { metaData } = storeToRefs(store);

const title = "랩스 서비스";
const emit = defineEmits(["title"]);
emit("title", `${title} 관리`, `통합 홈 하단에 제공되는 랩스 서비스에 표시할 서비스 홍보 배너를 관리합니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/banner", { size: 10000, sort: "sortNo,asc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, { pageSize: 100, labels: labels, mergeKeys: mergeKeys });

let pageSize = ref(options.pageSize);
let isLoading = ref(false);
let sortable = ref(false);

function changePriority() {
  sortable.value = !sortable.value;

  if (!sortable.value) {
    boardData.filteredData.forEach((entry, i) => {
      entry.sortNo = i + 1;
    });

    let postData = boardData.filteredData.map((entry) => {
      return { bannerSeq: entry.bannerSeq, sortNo: entry.sortNo };
    });

    options.isFiltering = !sortable.value;
    options.sortKeys.sortNo = 0;
    sortKey("sortNo");

    postData.forEach((post) => {
      fetch("/api/report/banner/" + post.bannerSeq, {}, post, "put");
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

watch(pageSize, async () => {
  isLoading.value = true;
  setTimeout(() => {
    options.pageSize = pageSize.value;
    isLoading.value = false;
  }, 100);
});

// watch(options, () => {
//   router.push({ path: route.path, query: queryStrings() });
// });

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.title}"을 삭제하시겠습니까?`, `${title} 삭제`, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/banner/" + row.bannerSeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "bannerSeq", value: row.bannerSeq });
        ElMessage({
          type: "info",
          message: `${title} "${row.title}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
