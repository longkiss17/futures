<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <el-input v-model="options.filterKeys.roleName" placeholder="ex) 00 담당자 or 000 관리자" style="width: 40%" clearable>
        <template #prepend>Role 이름</template>
      </el-input>
      <el-input v-model="options.filterKeys.roleDesc" placeholder="ex) 공지사항 관리" style="width: 40%" clearable>
        <template #prepend>Role 설명</template>
      </el-input>
      <el-button type="primary" @click="reset">초기화</el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="22%" />
            <col width="34%" />
            <col width="13%" />
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
                <span class="badge" v-if="checked('roleName')"></span>
                <dropdown-filter label="Role 이름" keyName="roleName" :data="dropdownData('roleName')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>Role 설명</th>
              <th>권한 그룹 사용자 수</th>
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
            <col width="7%" />
            <col width="22%" />
            <col width="34%" />
            <col width="13%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td>
                <router-link :to="'role/modify/' + entry.roleSeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" class="link" v-html="entry.roleName"></span>
                </router-link>
              </td>
              <td class="left normal"><span v-html="entry.roleDesc"></span></td>
              <td>{{ entry.userCount }}</td>
              <td class="normal">
                {{ entry.modifyIdLabel }}
                <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
              </td>
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="asmrole" :menuKey="entry.roleSeq"></revision-history>
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
                <el-pagination v-model:current-page="options.currentPage" v-model:page-size="options.pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                <router-link :to="{ path: 'role/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
              </div>
            </td>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, inject, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();

const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { serviceGroup, metaData } = storeToRefs(store);

const emit = defineEmits(["title"]);
emit("title", `ASM 권한 그룹(Role) 관리`, `분석 서비스 관리자 설정을 위한 권한 그룹을 등록 및 관리할 수 있습니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.useYn = metaData.value.noticeUseYn;
  labels.noticeCategory = metaData.value.noticeCategory;
  labels.serviceSeq = metaData.value.serviceSeq;
  labels.modifyId = metaData.value.asmUserKey;

  metaData.value.serviceSeq[-1] = "전체서비스";
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data, error } = fetch("/api/report/asmrole", { size: 10000, sort: "noticeSeq,desc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, reset, resetCheckBox, queryStrings } = board(data, { labels: labels, mergeKeys: mergeKeys });

watch(options, () => {
  router.push({ path: route.path, query: queryStrings() });
});

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.roleName}"을 삭제하시겠습니까?`, "권한 그룹(Role) 삭제", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    if (row.userCount > 0) {
      ElMessage({
        type: "error",
        duration: 5000,
        message: `권한 그룹(Rolw)에 연결된 사용자가 있습니다.`,
      });
    } else {
      let { data } = fetch("/api/report/asmrole/" + row.roleSeq, {}, {}, "delete");

      watch(data, () => {
        if (data) {
          del({ key: "roleSeq", value: row.roleSeq });
          ElMessage({
            type: "info",
            message: `권한 그룹(Role) "${row.roleName}"이(가) 삭제되었습니다.`,
          });
        }
      });
    }
  });
}
</script>
