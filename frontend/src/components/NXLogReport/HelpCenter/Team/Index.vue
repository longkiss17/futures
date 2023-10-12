<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="c">
    <div class="list">
      <div class="asm-table-head">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="7%" />
            <col width="40%" />
            <col width="29%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>관리부서</th>
              <th>부서 메일</th>
              <th>최초 등록</th>
              <th @click="sortKey('registerTime')" class="on">
                최초 등록일
                <sort :arrow="options.sortKeys.registerTime"></sort>
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
            <col width="40%" />
            <col width="29%" />
            <col width="7%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <tbody v-if="boardData.filteredData.length > 0">
            <tr v-for="entry in boardData.filteredData">
              <td>{{ entry.index }}</td>
              <td class="left">{{ entry.fullName }}</td>
              <td class="left">{{ entry.teamEmail }}</td>

              <td class="normal">
                {{ entry.registerIdLabel }}
                <span class="small" v-if="entry.registerId">({{ entry.registerId }})</span>
              </td>
              <td class="normal number">{{ entry.registerTime ? entry.registerTime.toDate("YY/MM/DD") : "" }}</td>
              <td>
                <icon class="action" @click="deleteRow(entry)" :name="'Delete'" :width="22" :height="22"></icon>
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
                <el-button type="primary" class="add" @click="showsPopup = true">등록</el-button>
              </div>
            </td>
          </tfoot>
        </table>
      </div>
      <el-dialog v-model="showsPopup" width="600" :top="'33vh'" title="관리 부서 등록">
        <div class="board-add">
          <div>
            <div class="t b">부서 검색</div>
            <div class="v">
              <!-- <el-input v-model="form.title.value" placeholder="제목" clearable :class="{ warning: !form.title.isVaild && !form.title.value }" /> -->
              <el-autocomplete v-model="form.teamName.value" :fetch-suggestions="querySearch" @select="handleSelect" clearable class="inline-input w-100" placeholder="팀명 입력" :class="{ warning: !form.teamName.isVaild && !form.teamName.value }" />
              <br />
              <span class="message" v-if="!form.teamName.isVaild && !form.teamName.value">{{ form.teamName.message }}</span>
            </div>
          </div>
          <div>
            <div class="t b">부서 메일 주소</div>
            <div class="v">
              <el-input v-model="form.teamEmail.value" placeholder="수신용 이메일" clearable :class="{ warning: !form.teamEmail.isVaild && !form.teamEmail.value }" />
              <span class="message" v-if="!form.teamEmail.isVaild && !form.teamEmail.value">{{ form.teamEmail.message }}</span>
            </div>
          </div>
          <div>
            <div class="button">
              <el-button @click="showsPopup = false">취소</el-button>
              <el-button type="primary" @click="action">등록</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import message from "@/stores/message";

const route = useRoute();
const router = useRouter();
const store = inject("store");
const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");
const board = inject("board");

const { metaData } = storeToRefs(store);

const title = "관리 부서";
const emit = defineEmits(["title"]);
emit("title", `${title} 등록`, `Help Center에 접수되는 문의 관리 및 답변을 작성하는 담당하는 부서를 등록합니다.`);

let labels = reactive({});

let showsPopup = ref(false);
let form = reactive({
  teamName: { value: null, isVaild: true, message: "게임을 선택해주세요." },
  teamEmail: { value: null, isVaild: true, message: "카테고리를 선택해주세요." },
  fullName: { value: null },
  useYn: { value: "Y" },
});

function setLabels() {
  labels.registerId = metaData.value.asmUserKey;
}

setLabels();
watch(() => metaData.value, setLabels, { deep: true });

let { data } = fetch("/api/report/feedbackadmin", { size: 10000, sort: "feedbackmanagementteamSeq,desc" });
let { boardData, options, sortKey, add, del, dropdownData, checked, toggle, resetCheckBox, reset, queryStrings } = board(data, { labels: labels });

let pageSize = ref(options.pageSize);
let isLoading = ref(false);

let page = {
  name: "관리 부서",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/feedbackadmin",
  actionURL: "/api/report/feedbackadmin",
  redirectRUL: "/nxlogreport/helpcenter/team",
};

async function querySearch(query) {
  if (query) {
    let teamList = await fetchAsync(`/api/report/feedbackadmin/search`, { teamName: query });
    return teamList.data.value.map((entry) => {
      return { value: entry.deptName, fullDeptName: entry.fullDeptName };
    });
  } else return [];
}

function handleSelect(entry) {
  form.fullName.value = entry.fullDeptName;
}

function action() {
  form.teamName.isVaild = form.teamName.value ? true : false;
  form.teamEmail.isVaild = form.teamEmail.value ? true : false;

  let cnt = Object.keys(form).filter((key) => form[key].isVaild !== undefined && form[key].isVaild === false).length;

  if (cnt === 0) {
    ElMessageBox({
      title: `${page.name} ${page.actionName}`,
      message: `작성한 정보로 ${page.actionName}하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      beforeClose: async (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "Loading...";

          let postData = {
            teamName: form.teamName.value,
            teamEmail: form.teamEmail.value,
            fullName: form.fullName.value,
            useYn: form.useYn.value,
          };

          if (page.method === "put") postData.feedbackmanagementteamSeq = parseInt(route.params.id);

          let { data, error } = fetch(page.actionURL, {}, postData, page.method);

          watch(data, () => {
            let row = JSON.parse(JSON.stringify(data.value));
            row.index = boardData.data.length + 1;
            add(row);
            setLabels();
            if (data) {
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 600);
            }
          });
        } else {
          done();
        }
      },
    }).then((action) => {
      showsPopup.value = false;
      message("success", `${page.name}이 ${page.actionName}되었습니다.`);
    });
  }
}

watch(showsPopup, () => {
  form.teamName.value = "";
  form.teamName.isVaild = true;
  form.teamEmail.value = "";
  form.teamEmail.isVaild = true;
});

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
  ElMessageBox.confirm(`"${row.fullName}"을 삭제하시겠습니까?`, `${title} 삭제`, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/feedbackadmin/" + row.feedbackmanagementteamSeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        del({ key: "feedbackmanagementteamSeq", value: row.feedbackmanagementteamSeq });
        ElMessage({
          type: "info",
          message: `${title} "${row.title}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}
</script>
