<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <span class="prepend">Role 선택</span>
      <el-select v-if="asmrole.data.value" v-model="options.filterKeys.roleNames" filterable placeholder="대상 게임 및 토픽 선택">
        <el-option
          v-for="item in asmrole.data.value.map((entry) => {
            return { key: entry.roleName, label: entry.roleName };
          })"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-input v-model="options.filterGroupKeys.userKey.value" placeholder="이름 or 사번" style="width: 40%" clearable>
        <template #prepend>관리자</template>
      </el-input>
      <el-button
        type="primary"
        @click="
          reset();
          options.filterGroupKeys.userKey.value = '';
        "
      >
        초기화
      </el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="19%" />
            <col width="30%" />
            <col width="20%" />
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
              <th>관리자</th>
              <th>보유 권한 그룹 (Role)</th>
              <th>권한 만료일</th>
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
            <col width="19%" />
            <col width="30%" />
            <col width="20%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td class="left normal">
                <router-link :to="'user/modify/' + entry.userSeq" custom v-slot="{ href, navigate }">
                  <span class="link">
                    <span @click="navigate" v-html="entry.userName"></span>
                    <span @click="navigate" class="small" v-if="entry.userKey">
                      (
                      <span v-html="entry.userKey"></span>
                      )
                    </span>
                  </span>
                </router-link>
              </td>
              <td class="left normal"><span v-html="entry.roleNames"></span></td>
              <td>{{ entry.expirationDate.toDate("YY/MM/DD HH:mm:ss") }}</td>
              <td class="normal">
                {{ entry.modifyIdLabel }}
                <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
              </td>
              <!-- <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td> -->
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="asmuser" :menuKey="entry.userSeq"></revision-history>
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
                <router-link :to="{ path: 'user/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
              </div>
            </td>
          </tfoot>
        </table>
        <div v-else>
          <skeleton :count="10" :style="{ margin: '9px 0 9px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
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
import { inject, watch, reactive } from "vue";
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
emit("title", `관리자 등록 관리`, `분석 서비스 관리에 접근할 수 있는 관리자를 조회 및 관리할 수 있습니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.roleNames = metaData.value.noticeCategory;
  labels.modifyId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data, error } = fetch("/api/report/asmuser", { size: 10000, sort: "noticeSeq,desc" });
let asmrole = fetch("/api/report/asmrole", { size: 10000, sort: "noticeSeq,desc" });

let { boardData, options, sortKey, del, reset, queryStrings } = board(data, {
  labels: labels,
  filterGroupKeys: {
    userKey: {
      value: "",
      keys: ["userName", "userKey"],
    },
  },
  mergeKeys: mergeKeys,
});

watch(options, () => {
  router.push({ path: route.path, query: queryStrings() });
});

function deleteRow(row) {
  ElMessageBox.confirm(`"${row.userName}"을 삭제하시겠습니까?`, "관리자 삭제", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/asmuser/" + row.userKey, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "userKey", value: row.userKey });
        ElMessage({
          type: "info",
          message: `관리자 "${row.userName}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
