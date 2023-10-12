<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    div.menu{
      display: flex; 
      div.warning{box-shadow: 0 0 0 1px var(--text-color-red,var(--text-color-red)) inset;}
      &>div{
          height: 500px; overflow: auto; border:solid 1px var(--border-color); border-radius: 4px;
        &:first-child{ width:calc(70% - 10px); margin-right: 20px; padding: 5px; transition: all .3s ease}
      }
    }
    div.checked-list{
      width:0; border:none !important;
      ul{
        li{
          position: relative; list-style: none; padding: 10px; margin-bottom: 4px; font-size:12px; background-color: var(--bg-color-sub);
          &:hover{ background-color: var(--color-light); font-family: 'noto-medium'; color: var(--color-active); cursor: pointer}
          span{
            display: inline-block; vertical-align: middle;
            svg{position: absolute; right: 5px; top:10px; display: inline-block; vertical-align: middle;}
          }
        }
      }          
    }
    div.full{width:100% !important; margin-right: 0px !important; }
    div.show{width:calc(30% - 10px); padding: 5px; }
    div.memo{padding-top: 10px }
    .user-list{
      li{
        padding: 6px 0; list-style: none; font-size: 12px; 
        span, svg{display: inline-block; vertical-align: middle; }
        svg.close{cursor: pointer; margin-left: 5px;}
      }
    }

    table{
      table-layout: fixed; 
      thead{
        th{
          padding: 5px 10px; background-color: var(--color-light); font-size: 12px; font-family: 'noto-medium'; user-select: none;  
          background-image: url(../../../../assets/icons/line.svg); background-repeat: no-repeat; background-position: center right; 
          &:last-child{ background-image: none;}
          &.on{
            &:hover{cursor: pointer; font-family: 'noto-bold'; color: var(--color-active);}
          }            
        }
      }
      tbody{
        tr{
          cursor: pointer;
          &:hover{ background-color: var(--color-light) }
        }
        td{
          padding: 3px 10px; border-bottom: solid 1px var(--border-color); font-size: 12px; text-align: center; font-family: 'noto-medium'; text-overflow:ellipsis; overflow:hidden; white-space:normal;
          &.left{text-align: left}
          &.right{text-align: right}            
          .action{cursor: pointer; margin:0 2px}
          .small{font-size: 11px;}
        }
      }
    }
  }
</style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">사용자 정보</div>
      <div class="v">
        <span v-if="route.params.id" style="display: inline-block; margin-top: 5px">{{ displayUserKey }}</span>
        <el-autocomplete v-else v-model="userKey" :value-key="'label'" :fetch-suggestions="querySearch" clearable class="inline-input w-100" placeholder="사용자 검색" @select="handleSelect" :class="{ warning: !form.userList.isVaild && !form.userList.value.length }" />
        <br />
        <span class="message" v-if="!form.userList.isVaild && !form.userList.value.length">{{ form.userList.message }}</span>
        <ul class="user-list" v-if="!route.params.id">
          <li v-for="(entry, i) in form.userList.value">
            <icon :width="20" :height="20" :name="'Person'" :viewBox="'0 96 960 960'"></icon>
            <span>{{ entry.userName }} / {{ entry.dutyName }} / {{ entry.deptName }}</span>
            <icon :width="20" :height="20" :name="'Close'" class="close" @click="form.userList.value.splice(i, 1)"></icon>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="t b">
        처리 메모
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'이력관리를 위해 처리 메모는 반드시 입력해야합니다. 처리 근거, 상세 내용 형식으로 작성해주세요..'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.memo.value" placeholder="ex) 000팀 신규 입사자 등록" clearable :class="{ warning: !form.memo.isVaild && !form.memo.value }" />
        <span class="message" v-if="!form.memo.isVaild && !form.memo.value">{{ form.memo.message }}</span>
        <div class="memo" v-if="route.params.id">
          <table style="width: 100%" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="10%" />
              <col width="66%" />
              <col width="12%" />
              <col width="12%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>처리 메모</th>
                <th>처리 담당자</th>
                <th>처리일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="memoList.data.length > 0" v-for="entry in memoList.data" @click="entry.checked = entry.checked ? false : true">
                <td>
                  {{ entry.usermemoSeq }}
                </td>
                <td class="left">
                  {{ entry.memo }}
                </td>
                <td>
                  {{ entry.registerLabel }}
                  <span class="small" v-if="entry.registerId">({{ entry.registerId }})</span>
                </td>
                <td>
                  {{ entry.registerTime ? entry.registerTime.toDate("YY/MM/DD HH:mm:ss") : entry.registerTime }}
                </td>
              </tr>
              <tr v-else>
                <td colspan="100" style="padding: 10px 0">No Data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <div class="t b">권한 그룹(Role)</div>
      <div class="v">
        <div class="menu" v-if="roles.data.value">
          <div :class="{ warning: !form.roleCount.isVaild && !form.roleCount.value, full: roles.data.value.filter((d) => d.checked).length === 0 }">
            <table style="width: 100%" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="30%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>번호</th>
                  <th>Role 이름</th>
                  <th>Role 설명</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in roles.data.value" @click="checkRole(entry, $event)">
                  <td class="checkbox">
                    <el-checkbox v-model="entry.checked" size="large" />
                  </td>
                  <td>
                    {{ entry.roleSeq }}
                  </td>
                  <td class="left">
                    {{ entry.roleName }}
                  </td>
                  <td class="left">
                    {{ entry.roleDesc }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div :class="{ 'checked-list': true, show: roles.data.value.filter((d) => d.checked).length }">
            <ul>
              <li v-for="entry in roles.data.value.filter((d) => d.checked)">
                <span class="name">{{ entry ? entry.roleName : "" }}</span>
                <span class="x" @click="entry.checked = false"><icon :name="'Close'"></icon></span>
              </li>
            </ul>
          </div>
        </div>
        <span class="message" v-if="!form.roleCount.isVaild && !form.roleCount.value">{{ form.roleCount.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">권한 만료일</div>
      <div class="v">
        <el-radio-group v-model="form.expirationDate.ref" class="ml-4">
          <el-radio :label="item.value" v-for="item in expirationTypeList">{{ item.label }}</el-radio>
        </el-radio-group>
        <el-date-picker ref="date" style="margin-left: 35px; margin-top: -8px" v-model="form.expirationDate.value" type="date" value-format="YYYY-MM-DD HH:mm:ss" placeholder="기간 선택" :disabled="form.expirationDate.ref === 'Y' ? true : false" />
        <br />
        <span class="message" v-if="!form.expirationDate.isVaild && !form.expirationDate.value">{{ form.expirationDate.message }}</span>
      </div>
    </div>
    <div>
      <div class="button">
        <el-button @click="cancel">취소</el-button>
        <el-button type="primary" @click="action">{{ page.actionName }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, watchEffect, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");
const { metaData } = storeToRefs(store);

let page = {
  name: "관리자 ",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/asmuser",
  actionURL: "/api/report/asmuser",
  redirectRUL: "/admin/general/user",
};

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;
}

emit("title", `${page.name} ${page.actionName}`, `Help Center 공지사항에 노출하는 공지 내용을 ${page.actionName}합니다`);

let roles = fetch("/api/report/asmrole", { size: 10000 });
let asmuser = fetch("/api/report/asmuser", { size: 10000, sort: "noticeSeq,desc" });
let memoList = reactive({ data: [] });
let expirationTypeList = [
  { value: "Y", label: "영구" },
  { value: "N", label: "기간지정" },
];
let date = ref(null);
let userKey = ref("");
let displayUserKey = ref("");

let expirationDate = "";

watch(roles.data, () => {
  if (route.params.id) {
    let { data, error } = fetch(page.actionURL);
    let memo = fetch(`/api/report/asmusermemo/${route.params.id}`);
    let userRole = fetch(`/api/report/asmuserrole/${route.params.id}`);

    watch(data, () => {
      if (data) {
        form.userList.value.push({ userKey: data.value.userKey, userName: data.value.userName });
        displayUserKey.value = `${data.value.userName}(${data.value.userKey})`;
        form.expirationDate.value = data.value.expirationDate;
        form.expirationDate.ref = data.value.expirationDate === "2999-12-31 00:00:00" ? "Y" : "N";

        expirationDate = data.value.expirationDate;
      }
    });

    watch(memo.data, () => {
      if (memo.data.value) {
        memo.data.value.forEach((entry) => {
          entry.registerLabel = metaData.value.asmUserKey[entry.registerId];
        });
        memoList.data = memo.data;
      }
    });

    watchEffect(() => {
      if (userRole.data.value && roles.data.value) {
        roles.data.value.forEach((entry) => {
          entry.checked = userRole.data.value.some((r) => r.roleCode === entry.roleCode);
        });
      }
    });
  }
});

function checkRole(entry, event) {
  if (event.target.className !== "el-checkbox__inner") {
    entry.checked = entry.checked ? false : true;
    form.roleCount.value = roles.data.value.filter((d) => d.checked).length;
  }
}

async function querySearch(query) {
  if (query) {
    let employee = fetch(`api/report/asmusersearch/` + query);

    function getEmployee() {
      return new Promise((resolve, reject) => {
        watch(employee.data, () => {
          employee.data.value.forEach((entry) => {
            entry.value = `${entry.userName}(${entry.userKey})`;
            entry.label = `${entry.userName}(${entry.userKey}) / ${entry.dutyName} / ${entry.deptName}`;

            let isASMUser = asmuser.data.value.find((d) => d.userKey === entry.userKey && d.userName === entry.userName);
            if (isASMUser) {
              entry.label = entry.label + " (권한 있음 : " + isASMUser.roleNames + ")";
              entry.isUser = true;
            }
          });

          let data = employee.data.value.filter((entry) => {
            //return !asmuser.data.value.some((d) => d.userKey === entry.userKey && d.userName === entry.userName);
            return true;
          });

          data = data.filter((entry) => {
            return !form.userList.value.some((d) => d.userKey === entry.userKey && d.userName === entry.userName);
          });

          resolve(data);
        });
      });
    }

    let results = await getEmployee();

    return results;
  } else return [];
}

function handleSelect(entry) {
  if (entry.isUser) {
    ElMessage({
      type: "warning",
      message: `ASM에 등록된 사용자입니다.`,
    });
  } else {
    form.userList.value.push(entry);
  }

  userKey.value = "";
}

let form = reactive({
  userList: { value: [], isVaild: true, message: "사용자 정보를 입력해주세요." },
  memo: { value: "", isVaild: true, message: "처리 메모를 입력하세요." },
  expirationDate: { isVaild: true, value: "2999-12-31 00:00:00", ref: "Y", message: "권한 만료일을 지정해주세요." },
  roleCount: { value: 0, isVaild: true, message: "최소 1개 이상의 권한 그룹을 선택해주세요." },
});

watch(
  () => form.expirationDate.ref,
  () => {
    if (form.expirationDate.ref === "Y") {
      form.expirationDate.value = "2999-12-31 00:00:00";
    } else {
      if (route.params.id) {
        form.expirationDate.value = expirationDate;
      } else {
        form.expirationDate.value = "";
        date.value.handleOpen();
      }
    }
  }
);

async function action() {
  form.userList.isVaild = form.userList.value.length ? true : false;
  form.memo.isVaild = form.memo.value ? true : false;
  form.expirationDate.isVaild = form.expirationDate.value ? true : false;
  form.roleCount.value = roles.data.value.filter((d) => d.checked).length;
  form.roleCount.isVaild = form.roleCount.value ? true : false;

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

          for (let user of form.userList.value) {
            let postData = {
              userKey: user.userKey,
              userName: user.userName,
              useYn: "Y",
              expirationDate: form.expirationDate.value,
            };

            if (page.method === "put") postData.userSeq = parseInt(route.params.id);

            await fetchAsync(page.actionURL, {}, postData, page.method);

            let all = roles.data.value
              .filter((d) => d.checked)
              .map((v) => {
                return { roleCode: v.roleCode, userKey: user.userKey };
              });

            // await fetchAsync("/api/report/asmuserrole/" + user.userKey, {}, {}, "delete");
            // await fetchAsync("/api/report/asmuserroles", {}, all, "post");

            await fetchAsync("/api/report/asmuserroles/" + user.userKey, {}, all, "put");
            await fetchAsync("/api/report/asmusermemo", {}, { userKey: user.userKey, memo: form.memo.value }, "post");
          }

          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 500);
        } else {
          done();
        }
      },
    }).then((action) => {
      router.push({ path: page.redirectRUL });
      message("success", `${page.name}이 ${page.actionName}되었습니다.`);
    });
  }
}

function cancel() {
  let cnt = Object.keys(form).filter((key) => form[key].isVaild && form[key].value).length;

  if (!route.params.id && cnt > 0) {
    message("cancel", page.actionName, router.back);
  } else {
    router.back();
  }
}
</script>
