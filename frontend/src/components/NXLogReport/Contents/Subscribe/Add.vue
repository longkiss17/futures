<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    &>div{
      display: flex; padding: 10px 0; border-bottom: solid 1px var(--border-color);    
      &:last-child{border:none}
      div.t{
        position: relative; width:150px; padding: 5px 10px; font-size: 13px; font-family: 'noto-medium';
        .badge{ position: absolute; left:5px; top: 5px;; display: inline-block; width:4px; height:4px; border-radius: 50px; background-color:var(--text-color-red)}
        svg{display: inline-block; vertical-align: middle; margin-top: -2px;}
      }
      div.v{
        width:calc(100% - 150px);
        div.editor{
          border: solid 1px var(--border-color); border-radius: 4px; padding: 2px; 
        }
        div.editor-warning{
          border: solid 1px var(--text-color-red);
        }

        .user-list{
          li{
            padding: 6px 0; list-style: none; font-size: 12px; 
            span, svg{display: inline-block; vertical-align: middle; }
            svg.close{cursor: pointer; margin-left: 5px;}
          }
        }
      }
      div.button{
        width:100%; text-align: right;
      }
    }
    .message{
      display: inline-block; color:var(--text-color-red); font-size: 12px; padding: 3px 0;
    }
  }
</style>
<template>
  <div class="board-add">
    <div>
      <div class="t">
        사용자 정보
        <span class="badge"></span>
      </div>
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
      <div class="t">
        처리 메모
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-input v-model="form.title.value" placeholder="제목" clearable :class="{ warning: !form.title.isVaild && !form.title.value }" />
        <span class="message" v-if="!form.title.isVaild && !form.title.value">{{ form.title.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        대상 게임 및 토픽
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-select v-model="form.serviceSeq.value" filterable placeholder="대상 게임 및 토픽 선택" style="width: 260px" :class="{ warning: !form.serviceSeq.isVaild && !form.serviceSeq.value }">
          <el-option-group v-for="group in serviceGroup.filter((entry, i) => i > 0)" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.key" />
          </el-option-group>
        </el-select>

        <br />
        <span class="message" v-if="!form.serviceSeq.isVaild && !form.serviceSeq.value">{{ form.serviceSeq.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        대상 리포트
        <span class="badge"></span>
      </div>
      <div class="v">
        <span class="message" v-if="!form.title.isVaild && !form.title.value">{{ form.title.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">언어 선택</div>
      <div class="v">
        <el-radio-group v-model="form.locale.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in localeList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">활성 여부</div>
      <div class="v">
        <el-radio-group v-model="form.useYn.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in useYnList">{{ item.label }}</el-radio>
        </el-radio-group>
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
import { ref, reactive, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import uxStore from "@/stores/ux";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const ux = uxStore();
const { serviceGroup, metaData } = storeToRefs(store);

let page = {
  name: "메일 구독",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/notice",
  actionURL: "/api/report/notice",
  redirectRUL: "/nxlogreport/helpcenter/notice",
};

emit("title", `${page.name} ${page.actionName}`, `리포트별로 제공 중인 메일 구독 신청 명단 및 별도 ${page.actionName} 처리를 지원합니다.`);

let userKey = ref("");
let displayUserKey = ref("");

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.serviceSeq.value = data.value.serviceSeq.toString();
      form.noticeCategory.value = data.value.noticeCategory;
      form.title.value = data.value.title;
      form.contents.value = data.value.contents.toHtmlEncode();
      form.useYn.value = data.value.useYn;
      if (data.value.noticeScheduleStart) {
        form.date.value = [data.value.noticeScheduleStart, data.value.noticeScheduleEnd];
      }
    }
  });
}

let localeList = Object.keys(metaData.value.subscriptionLocale).map((key) => {
  return { value: key, label: metaData.value.subscriptionLocale[key] };
});
let useYnList = Object.keys(metaData.value.noticeUseYn).map((key) => {
  return { value: key, label: metaData.value.noticeUseYn[key] };
});

let form = reactive({
  serviceSeq: { value: null, isVaild: true, message: "게임을 선택해주세요." },
  userList: { value: [], isVaild: true, message: "사용자 정보를 입력해주세요." },
  noticeCategory: { value: null, isVaild: true, message: "카테고리를 선택해주세요." },
  date: { value: "" },
  title: { value: "", isVaild: true, message: "제목을 입력해주세요." },
  contents: { value: "", isVaild: true, message: "내용을 입력해주세요." },
  useYn: { value: "Y" },
  locale: { value: "kr" },
});

async function querySearch(query) {
  if (query) {
    let employee = fetch(`api/report/asmusersearch/` + query);

    function getEmployee() {
      return new Promise((resolve, reject) => {
        watch(employee.data, () => {
          employee.data.value.forEach((entry) => {
            entry.value = `${entry.userName}(${entry.userKey})`;
            entry.label = `${entry.userName}(${entry.userKey}) / ${entry.dutyName} / ${entry.deptName}`;
          });

          let data = employee.data.value.filter((entry) => {
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
  form.userList.value.push(entry);
  userKey.value = "";
}

function action() {
  form.serviceSeq.isVaild = form.serviceSeq.value ? true : false;
  form.noticeCategory.isVaild = form.noticeCategory.value ? true : false;
  form.title.isVaild = form.title.value ? true : false;
  form.contents.isVaild = form.contents.value ? true : false;

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
            serviceSeq: form.serviceSeq.value,
            noticeCategory: form.noticeCategory.value,
            title: form.title.value,
            contents: form.contents.value,
            useYn: form.useYn.value,
          };

          if (form.date.value && Array.isArray(form.date.value)) {
            postData.noticeScheduleStart = form.date.value[0];
            postData.noticeScheduleEnd = form.date.value[1];
          }

          if (page.method === "put") postData.noticeSeq = parseInt(route.params.id);

          let { data, error } = fetch(page.actionURL, {}, postData, page.method);

          watch(data, () => {
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
