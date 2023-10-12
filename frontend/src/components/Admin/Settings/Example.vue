<!-- prettier-ignore -->
<style lang="scss" scoped>  
  h1{font-family: 'poppins-medium'}
  .api-list{
    padding:10px 0 30px 0; 
    span{
      display: inline-block; margin-right: 20px; font-size: 18px; font-family: 'poppins';  cursor: pointer;
      &.active{ padding:6px 0; border-bottom: solid 2px var(--color-active); font-family: 'poppins-medium'}
    }    
  }

  .tag-list{
    span{ 
      display: inline-block; padding: 3px 8px; border-radius: 30px; background-color: var(--bg-color-bold); color:var(--color-active); font-size: 11px; margin-right: 5px;; cursor: pointer;
      &:hover{ background-color: var(--color-active); color:var(--bg-color)}
    }
  }
  .input{ padding: 10px 0}
  .chatgpt{
    &>div{
      display: flex; font-size: 14px;
      div{
        padding: 5px 0;
        &:nth-child(1){ width: 30px; font-size: 18px; font-family: 'roboto-medium'}
        &:nth-child(2){ width: calc(100% - 30px)}
      }
    }
  }
</style>
<template>
  <h1>Open AI</h1>
  <div class="api-list">
    <span v-for="entry in apiList" :class="{ active: entry.active }" @click="toggle(entry)">
      {{ entry.label }}
    </span>
  </div>
  <div class="tag-list">
    <span
      v-for="entry in currentApi.tagList"
      @click="
        message = entry;
        sendMessage();
      "
    >
      {{ entry }}
    </span>
  </div>
  <div class="input">
    <el-input v-model="message" ref="inputRef" :disabled="editable" :placeholder="placeholder" @change="sendMessage()" clearable>
      <template #append>Enter</template>
    </el-input>
  </div>
  <div v-show="question && currentApi.key === 'text'" class="chatgpt">
    <div>
      <div>Q :</div>
      <div>{{ question }}</div>
    </div>
    <div>
      <div>A :</div>
      <div id="answer"></div>
    </div>
  </div>
  <div v-show="question && currentApi.key === 'image'">
    <img v-if="imageUrl" :src="imageUrl" alt="" />
    <skeleton v-else :count="1" :style="{ width: '256px', height: '256px' }"></skeleton>
  </div>
</template>
<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { computedAsync } from "@vueuse/core";
import { useObservable } from "@vueuse/rxjs";
import { from, lastValueFrom, Observable, Subject, BehaviorSubject } from "rxjs";
import { ElInput } from "element-plus";
import { Configuration, OpenAIApi } from "openai";
import TypeIt from "typeit";
// AICodeHelper
// ctrl alt shift M : 코드생성 or 질문
// ctrl alt shift R : 리팩토링
// ctrl alt shift Z : 주석
// ctrl alt shift C : 리뷰
// 1,000 token = $0.002
// 10라인 함수 = 500 token
// 함수 1회당 $0.001
// $1 = 2,000회 (추정치)

const emit = defineEmits(["title"]);
emit("title", `Lab`, `이곳은 아이디어 기술검토를 위한 공간입니다.`);

const configuration = new Configuration({
  organization: "org-QP5qSvI6eqLhDmrO8udeW6mp",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const apiList = ref([
  { key: "text", label: "Text completion", placeholder: "Send a message..", tagList: ["SQL Order By란?", "Meta 데이터란?"], active: true },
  { key: "image", label: "Image generation", placeholder: "red bird", tagList: ["white cat", "zebra"], active: false },
]);

let currentApi = computed(() => {
  return apiList.value.find((entry) => entry.active);
});

// const tagList = ref();
const message = ref("");
const response = reactive({});
const question = ref("");
const placeholder = ref(currentApi.value.placeholder);
const editable = ref(false);
const inputRef = ref(ElInput);

let typeit = null;
let imageUrl = ref("");

onMounted(() => {
  typeit = new TypeIt("#answer", {
    speed: 30,
  });
});

async function sendMessage() {
  editable.value = true;
  question.value = JSON.parse(JSON.stringify(message.value));
  placeholder.value = message.value;

  let msg = message.value;
  message.value = "";

  if (currentApi.value.key === "text") {
    typeit.type(() => "").flush();
    typeit.reset().go();

    response.value = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg,
      temperature: 0.9,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    let text = "";
    response.value.data.choices.forEach((entry) => {
      text += entry.text;
    });

    typeit
      .type(() => text.replace(/\n\n/gi, "").replace(/\n/gi, "<br>"))
      .flush(() => {
        editable.value = false;
        inputRef.value.focus();
      });
    typeit.reset().go();
  } else if (currentApi.value.key === "image") {
    imageUrl.value = "";
    const response2 = await openai.createImage({
      prompt: msg,
      n: 1,
      size: "256x256",
    });
    imageUrl.value = response2.data.data[0].url;
    editable.value = false;
    inputRef.value.focus();
  }
}

function toggle(target) {
  apiList.value.forEach((entry) => {
    entry.active = target.label === entry.label ? true : false;
  });

  placeholder.value = currentApi.value.placeholder;
  question.value = "";
}
</script>
