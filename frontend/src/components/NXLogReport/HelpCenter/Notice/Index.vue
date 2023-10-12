<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <span class="prepend">대상 게임 및 토픽</span>
      <el-select v-model="options.selectKeys.serviceSeq" filterable placeholder="대상 게임 및 토픽 선택">
        <el-option-group v-for="group in serviceGroup" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.key" />
        </el-option-group>
      </el-select>
      <el-input v-model="options.filterKeys.title" placeholder="ex) 테마리포트" style="width: 40%" clearable>
        <template #prepend>공지 제목</template>
      </el-input>
      <el-button type="primary" @click="reset">초기화</el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="9%" />
            <col width="13%" />
            <col width="28%" />
            <col width="10%" />
            <col width="10%" />
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
              <th class="on">
                <span class="badge" v-if="checked('noticeCategory')"></span>
                <dropdown-filter label="카테고리" keyName="noticeCategory" :data="dropdownData('noticeCategory')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>게임명</th>
              <th>제목</th>
              <th>작업시간</th>
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
            <col width="8%" />
            <col width="13%" />
            <col width="28%" />
            <col width="10%" />
            <col width="10%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td>{{ entry.noticeCategoryLabel }}</td>
              <td class="left normal">{{ entry.serviceSeqLabel }}</td>
              <td class="left normal">
                <router-link :to="'notice/modify/' + entry.noticeSeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" class="link" v-html="entry.title"></span>
                </router-link>
              </td>
              <td class="normal number">
                {{ entry.noticeScheduleStart ? entry.noticeScheduleStart.toDate("YY/MM/DD HH:mm") : "" }}
                <br />
                {{ entry.noticeScheduleEnd ? entry.noticeScheduleEnd.toDate("YY/MM/DD HH:mm") : "" }}
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
                <revision-history serviceName="report" menuPath="notice" :menuKey="entry.noticeSeq"></revision-history>
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
                <router-link :to="{ path: 'notice/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
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

const emit = defineEmits(["title"]);
emit("title", `공지사항 관리`, `Help Center 공지사항에 노출하는 공지 내용을 등록 관리합니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
  labels.noticeCategory = metaData.value.noticeCategory;
  labels.serviceSeq = metaData.value.serviceSeq;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;

  if (metaData.value.serviceSeq) {
    metaData.value.serviceSeq[-1] = "전체서비스";
  }
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/notice", { size: 10000, sort: "noticeSeq,desc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, { labels: labels, mergeKeys: mergeKeys });

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
  ElMessageBox.confirm(`"${row.title}"을 삭제하시겠습니까?`, "공지사항 삭제", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/notice/" + row.noticeSeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "noticeSeq", value: row.noticeSeq });
        ElMessage({
          type: "info",
          message: `공지 "${row.title}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
