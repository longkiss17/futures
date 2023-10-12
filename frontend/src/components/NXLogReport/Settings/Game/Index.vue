<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="filter">
      <el-input v-model="options.filterGroupKeys.gameName.value" placeholder="ex) 메이플스토리 or maplestory" style="width: 80%" clearable>
        <template #prepend>게임명 or URL</template>
      </el-input>
      <el-button type="primary" @click="reset">초기화</el-button>
    </div>
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="9%" />
            <col width="11%" />
            <col width="10%" />
            <col width="7%" />
            <col width="9%" />
            <col width="9%" />
            <col width="7%" />
            <col width="7%" />
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
                <span class="badge" v-if="checked('gameType')"></span>
                <dropdown-filter label="카테고리" keyName="gameType" :data="dropdownData('gameType')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
              </th>
              <th>게임명</th>
              <th>URL</th>
              <th>고유번호</th>
              <th>ServiceID</th>
              <th>GameCode</th>
              <th>이미지</th>
              <th class="on">
                <span class="badge" v-if="checked('closedYn')"></span>
                <dropdown-filter label="상태" keyName="closedYn" :data="dropdownData('closedYn')" @toggle="toggle" @reset="resetCheckBox"></dropdown-filter>
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
            <col width="9%" />
            <col width="11%" />
            <col width="10%" />
            <col width="7%" />
            <col width="9%" />
            <col width="9%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td class="number">{{ entry.index }}</td>
              <td>{{ entry.gameTypeLabel.replace("Game :", "") }}</td>
              <td class="left normal">
                <router-link :to="'game/modify/' + entry.serviceSeq" custom v-slot="{ href, navigate }">
                  <span @click="navigate" class="link" v-html="entry.gameName"></span>
                </router-link>
              </td>
              <td class="left"><span v-html="entry.gamePath"></span></td>
              <td class="number">{{ entry.serviceSeq }}</td>
              <td class="number">{{ entry.serviceId }}</td>
              <td class="number">{{ entry.gameCodeId }}</td>

              <td><img width="40" height="40" :src="entry.logoImage" /></td>
              <td>
                <span :class="entry.closedYn === 'N' ? 'enable' : 'disable'">{{ entry.closedYnLabel }}</span>
              </td>
              <td class="normal">
                {{ entry.modifyIdLabel }}
                <span class="small" v-if="entry.modifyId">({{ entry.modifyId }})</span>
              </td>
              <td class="normal number">{{ entry.modifyTime ? entry.modifyTime.toDate("YY/MM/DD HH:mm:ss") : "" }}</td>
              <td>
                <revision-history serviceName="report" menuPath="game" :menuKey="entry.serviceSeq"></revision-history>
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
                <router-link :to="{ path: 'game/add' }"><el-button type="primary" class="add">등록</el-button></router-link>
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

const route = useRoute();
const router = useRouter();
const store = inject("store");
const fetch = inject("fetch");
const board = inject("board");

const { metaData } = storeToRefs(store);

const emit = defineEmits(["title"]);
emit("title", `게임 및 토픽 관리`, `NXLog리포트에서 제공할 게임/토픽 공간을 등록 / 관리할 수 있습니다.`);

let labels = reactive({});
let mergeKeys = reactive({ modifyId: "registerId", modifyTime: "registerTime" });

function setLabels() {
  labels.closedYn = metaData.value.gameClosedYn;
  labels.gameType = metaData.value.gameType;
  labels.serviceSeq = metaData.value.serviceSeq;
  labels.modifyId = metaData.value.asmUserKey;
  labels.registerId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/game", { size: 10000, sort: "serviceSeq,desc" });
let { boardData, options, sortKey, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, {
  labels: labels,
  mergeKeys: mergeKeys,
  filterGroupKeys: {
    gameName: {
      value: "",
      keys: ["gameName", "gamePath"],
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
</script>
