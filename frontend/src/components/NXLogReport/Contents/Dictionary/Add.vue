<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">지표 용어</div>
      <div class="v">
        <el-input v-model="form.reportdictionaryName.value" placeholder="제목" clearable :class="{ warning: !form.reportdictionaryName.isVaild && !form.reportdictionaryName.value }" />
        <span class="message" v-if="!form.reportdictionaryName.isVaild && !form.title.value">{{ form.reportdictionaryName.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">용어설명 (공통)</div>
      <div class="v">
        <div :class="['editor', !form.explanation.isVaild && !form.explanation.value ? 'editor-warning' : '']" :key="ux.theme">
          <editor v-model="form.explanation.value" :init="store.editorConfig" :api-key="store.editorApiKey" />
        </div>
        <span class="message" v-if="!form.explanation.isVaild && !form.explanation.value">{{ form.explanation.message }}</span>
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
import { reactive, watch, inject } from "vue";
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
  name: "지표 용어",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/dictionary",
  actionURL: "/api/report/dictionary",
  redirectRUL: "/nxlogreport/contents/dictionary",
};

emit("title", `${page.name} ${page.actionName}`, `리포트 내 사용되는 지표 용어를 ${page.actionName} 합니다.`);

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.serviceSeq.value = data.value.serviceSeq.toString();
      form.reportdictionaryName.value = data.value.reportdictionaryName;
      form.explanation.value = data.value.explanation.toHtmlEncode();
      form.useYn.value = data.value.useYn;
    }
  });
}

let form = reactive({
  serviceSeq: { value: -1 },
  reportdictionaryName: { value: "", isVaild: true, message: "제목을 입력해주세요." },
  explanation: { value: "", isVaild: true, message: "내용을 입력해주세요." },
  useYn: { value: "Y" },
});

function action() {
  form.reportdictionaryName.isVaild = form.reportdictionaryName.value ? true : false;
  form.explanation.isVaild = form.explanation.value ? true : false;

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
            reportdictionaryName: form.reportdictionaryName.value,
            explanation: form.explanation.value.toHtmlDecode(),
            useYn: form.useYn.value,
          };

          if (page.method === "put") postData.reportdictionarySeq = parseInt(route.params.id);

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
