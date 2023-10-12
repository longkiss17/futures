<!-- prettier-ignore -->
<style lang="scss" scoped>
  ul.add{
    li{
      list-style: none; padding: 4px 0px 8px 0; display: flex;
      div.f {
        width:100%; position:relative;
        .key{ font-size: 12px; font-family: 'noto-medium'; color: var(--text-color-bold) }
        .value{ 
          padding: 8px 0; 
          .editor{
            padding:3px; border:solid 1px var(--border-color-bold); border-radius: 3px;
          }
        }
        .badge{
          &::before{
            content: ""; display: inline-block; position: absolute; margin-top: 0px; margin-left: -6px; width:5px; height:5px; border-radius: 10px; background-color: rgba(var(--text-color-red), .6);
          }
        }
      }
    }
  }
</style>
<template>
  <ul class="add">
    <li>
      <div class="f">
        <div class="key badge">제목</div>
        <div class="value">
          <!-- :class="{ warning: !errors.title }" -->
          <el-input v-model="clone.title" style="width: 100%" ref="titleRef" size="default" placeholder="이슈 제목을 입력해주세요." />
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key badge">기간</div>
        <div class="value">
          <el-date-picker v-model="clone.period[0]" ref="startDateRef" type="date" placeholder="시작일" size="small" :disabled-date="disabledStartDate" style="width: calc(55% - 10px)" />
          <el-time-picker v-model="clone.period[0]" arrow-control placeholder="HH:MM" size="small" style="width: calc(45% - 20px); margin-left: 10px" :default-value="new Date()" />
          <!-- <el-date-picker v-model="issue.period" style="width: calc(100% - 15px)" size="large" type="daterange" range-separator="To" start-placeholder="시작일" end-placeholder="종료일" /> -->
        </div>
      </div>
      <div class="f">
        <div class="key">&nbsp;</div>
        <div class="value">
          <el-date-picker v-model="clone.period[1]" ref="endDateRef" type="date" placeholder="종료일" size="small" :disabled-date="disabledEndDate" style="width: calc(58%)" />
          <el-time-picker v-model="clone.period[1]" arrow-control placeholder="HH:MM" size="small" style="width: calc(42% - 10px); margin-left: 10px" />
          <!-- <el-date-picker v-model="issue.period" style="width: calc(100% - 15px)" size="large" type="daterange" range-separator="To" start-placeholder="시작일" end-placeholder="종료일" /> -->
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key badge">카테고리</div>
        <div class="value">
          <el-select v-model="clone.category" ref="categoryRef" style="width: calc(100% - 20px)" placeholder="카테고리 선택" size="default">
            <el-option v-for="entry in categoryList" :key="entry.key" :label="entry.label" :value="entry.key" />
          </el-select>
        </div>
      </div>
      <div class="f">
        <div class="key badge">상태</div>
        <div class="value">
          <el-select v-model="clone.status" ref="statusRef" style="width: calc(100%)" placeholder="상태 선택" size="default">
            <el-option v-for="entry in statusList" :key="entry.key" :label="entry.label" :value="entry.key" />
          </el-select>
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key">담당자</div>
        <div class="value">
          <el-input v-model="clone.owner" style="width: calc(100% - 20px)" size="default" placeholder="담당자 이름 검색" :prefix-icon="Search" />
        </div>
      </div>
      <div class="f">
        <div class="key">태그</div>
        <div class="value">
          <el-select v-model="clone.tag" style="width: calc(100%)" placeholder="이슈 태그 선택" size="default"></el-select>
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key">내용</div>
        <div class="value">
          <div class="editor" :key="ux.theme">
            <editor v-model="clone.contents" :init="store.editorConfig" :api-key="store.editorApiKey" />
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key">관련 링크</div>
        <div class="value">
          <el-input v-model="clone.link" style="width: 100%" size="default" placeholder="링크 입력" />
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <div class="key">연관 지표</div>
        <div class="value">
          <el-input v-model="clone.report" style="width: 100%" size="default" placeholder="'동시접속'을 입력해보세요." />
        </div>
      </div>
    </li>
    <li>
      <div class="f">
        <el-button style="float: right" :disabled="!valid" :plain="!valid" @click="add()" :type="valid ? 'primary' : 'primary'">이슈 {{ clone.type === "add" ? "등록" : "수정" }}</el-button>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { ref, reactive, watch, inject, onMounted } from "vue";
import lodash from "lodash";
import uxStore from "@/stores/ux";
import { ElInput, ElDatePicker, ElSelect, ElMessage, ElMessageBox } from "element-plus";
import { Search, DocumentAdd, Edit } from "@element-plus/icons-vue";

const props = defineProps(["issue", "issueList", "categoryList", "statusList", "shows"]);
const emit = defineEmits(["init", "closeIssue", "updateIssue", "scrollToIssue"]);

const ux = uxStore();
const store = inject("store");
const ajv = inject("ajv");
const moment = inject("moment");
const titleRef = ref(ElInput);
const startDateRef = ref(ElDatePicker);
const endDateRef = ref(ElDatePicker);
const categoryRef = ref(ElSelect);
const statusRef = ref(ElSelect);

onMounted(() => {
  setTimeout(() => {
    titleRef.value.focus();
  }, 500);
});

let clone = reactive(lodash.cloneDeep(props.issue));

let schema = reactive({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    category: { type: "integer" },
    status: { type: "integer" },
    start: { type: "string" },
    end: { type: "string" },
  },
  required: ["title", "category", "status", "start", "end"],
  additionalProperties: false,
});

let validate = ajv.compile(schema);
let errors = reactive({
  title: true,
  category: true,
  status: true,
  start: true,
  end: true,
});
let valid = ref(clone.type === "add" ? false : true);

watch(
  clone,
  () => {
    let event = {
      title: clone.title,
      category: clone.category,
      status: clone.status,
      start: clone.start,
      end: clone.end,
    };

    if (clone.period.length > 0) {
      event.start = moment(clone.period[0]).format("YYYY-MM-DD HH:mm:ss");
      event.end = moment(clone.period[1]).format("YYYY-MM-DD HH:mm:ss");
    }

    valid.value = validate(event);

    Object.entries(errors).forEach(([key, value]) => {
      if (validate.errors) {
        let valid = validate.errors.some((error) => error.instancePath.replace(/\//gi, "") === key);
        errors[key] = valid ? false : true;
      }
    });
  },
  { deep: true }
);

watch(() => clone.period[0], focus, { deep: true });
watch(() => clone.period[1], focus, { deep: true });
watch(() => clone.category, focus, { deep: true });

function focus() {
  if (!clone.period[0]) {
    startDateRef.value.focus();
  } else if (!clone.period[1]) {
    endDateRef.value.focus();
  } else if (!clone.category) {
    categoryRef.value.visible = true;
  } else if (!clone.status) {
    statusRef.value.visible = true;
  }
}

function disabledStartDate(date) {
  if (clone.period[1]) return date > clone.period[1];
  else true;
}

function disabledEndDate(date) {
  if (clone.period[0]) return date < clone.period[0];
  else true;
}

function add() {
  let actionName = clone.type === "add" ? "등록" : "수정";
  ElMessageBox.confirm(`'${clone.title}' ${actionName}하시겠습니까?`, "이슈 " + actionName, {
    autofocus: false,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    type: "",
  })
    .then(() => {
      if (clone.period.length > 0) {
        clone.start = moment(clone.period[0]).format("YYYY-MM-DD HH:mm:ss");
        clone.end = moment(clone.period[1]).format("YYYY-MM-DD HH:mm:ss");
      }

      if (clone.type === "add") {
        clone.issueID = props.issueList.length + 1;
        props.issueList.push(clone);
        emit("init");
        emit("closeIssue");
        emit("scrollToIssue", clone);
      } else {
        let target = props.issueList.find((entry) => entry.issueID === clone.issueID);
        target = Object.assign(target, clone);
        emit("init");
        emit("closeIssue");
        emit("updateIssue");
      }
      ElMessage({
        type: "info",
        message: actionName + "되었습니다.",
      });
    })
    .catch(() => {});
}
</script>
