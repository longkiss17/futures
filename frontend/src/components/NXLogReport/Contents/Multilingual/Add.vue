<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">단어</div>
      <div class="v">
        <template v-if="route.params.id">
          <el-input v-model="form.word.value" placeholder="한국어" disabled />
        </template>
        <template v-else>
          <el-input v-model="form.word.value" placeholder="한국어" clearable :class="{ warning: !form.word.isVaild && !form.word.value }" />
          <span class="message" v-if="!form.word.isVaild && !form.word.value">{{ form.word.message }}</span>
        </template>
      </div>
    </div>
    <div>
      <div class="t b">영어</div>
      <div class="v">
        <el-input v-model="form.wordEn.value" placeholder="English" clearable :class="{ warning: !form.wordEn.value && !form.wordEn.isVaild }" />
        <span class="message" v-if="!form.wordEn.isVaild && !form.wordEn.value">{{ form.wordEn.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">일본어</div>
      <div class="v">
        <el-input v-model="form.wordJp.value" placeholder="日本語" clearable :class="{ warning: !form.wordJp.isVaild && !form.wordJp.value }" />
        <span class="message" v-if="!form.wordJp.isVaild && !form.wordJp.value">{{ form.wordJp.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">중국어 간체</div>
      <div class="v">
        <el-input v-model="form.wordCn.value" placeholder="简体中文" clearable :class="{ warning: !form.wordCn.isVaild && !form.wordCn.value }" />
        <span class="message" v-if="!form.wordCn.isVaild && !form.wordCn.value">{{ form.wordCn.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">중국어 번체</div>
      <div class="v">
        <el-input v-model="form.wordTw.value" placeholder="繁體中文" clearable :class="{ warning: !form.wordTw.isVaild && !form.wordTw.value }" />
        <span class="message" v-if="!form.wordTw.isVaild && !form.wordTw.value">{{ form.wordTw.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        관리 메모
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'처리 이력 등의 관리 기록을 위한 메모 입니다.'">
          <template #reference>
            <icon :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <div :class="['editor']" :key="ux.theme">
          <editor v-model="form.registerMemo.value" :init="store.editorConfig" :api-key="store.editorApiKey" />
          <!-- api-key="i64xl362zdse2gly9nsior50190xu2aivhv6sc6r8c9oo7g3"  -->
        </div>
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
import { ElMessageBox } from "element-plus";
import uxStore from "@/stores/ux";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const ux = uxStore();

let page = {
  name: "단어별 번역",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/multilingual",
  actionURL: "/api/report/multilingual",
  redirectRUL: "/nxlogreport/contents/multilingual",
};

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.word.value = data.value.word;
      form.wordEn.value = data.value.wordEn;
      form.wordJp.value = data.value.wordJp;
      form.wordCn.value = data.value.wordCn;
      form.wordTw.value = data.value.wordTw;
      form.registerMemo.value = data.value.registerMemo.toHtmlEncode();
    }
  });
}

emit("title", `${page.name} - ${page.actionName}`, `언어 변환 시 적용될 번역 내용을 등록 관리할 수 있습니다. 단어, 단문 등 간단한 표현 위주의 표현 위주로 입력해주세요.`);

let form = reactive({
  word: { value: "", isVaild: true, message: "단어를 입력해주세요." },
  wordEn: { value: "", isVaild: true, message: "영어를 입력해주세요." },
  wordJp: { value: "", isVaild: true, message: "일본어를 입력해주세요." },
  wordCn: { value: "", isVaild: true, message: "중국어(간체)를 입력해주세요." },
  wordTw: { value: "", isVaild: true, message: "중국어(번체)를 입력해주세요." },
  registerMemo: { value: "" },
});

let multilingual = fetch("/api/report/multilingual", { size: 10000, sort: "multilingualdictionarySeq,desc" });

function action() {
  if (!route.params.id && multilingual.data.value.find((entry) => entry.word.toLowerCase() === form.word.value.trim().toLowerCase())) {
    form.word.message = `입력하신 단어 "${form.word.value}"는 이미 등록된 단어입니다.`;
    form.word.isVaild = false;
    form.word.value = "";
    return;
  }

  form.word.isVaild = form.word.value ? true : false;
  form.wordEn.isVaild = form.wordEn.value ? true : false;
  form.wordJp.isVaild = form.wordJp.value ? true : false;
  form.wordCn.isVaild = form.wordCn.value ? true : false;
  form.wordTw.isVaild = form.wordTw.value ? true : false;

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
            word: form.word.value,
            wordEn: form.wordEn.value,
            wordJp: form.wordJp.value,
            wordCn: form.wordCn.value,
            wordTw: form.wordTw.value,
            useYn: "Y",
            registerMemo: form.registerMemo.value.toHtmlDecode(),
          };

          if (page.method === "put") postData.multilingualdictionarySeq = parseInt(route.params.id);

          let { data, error } = await fetch(page.actionURL, {}, postData, page.method);

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
