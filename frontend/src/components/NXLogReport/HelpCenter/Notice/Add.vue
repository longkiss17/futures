<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">대상 게임 및 토픽</div>
      <div class="v">
        <el-select v-model="form.serviceSeq.value" filterable placeholder="대상 게임 및 토픽 선택" multiple :disabled="route.params.id" style="width: 260px" :class="{ warning: !form.serviceSeq.isVaild && !form.serviceSeq.value.length }">
          <el-option-group v-for="group in serviceGroup.filter((entry, i) => i > 0)" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.key" />
          </el-option-group>
        </el-select>
        <br />
        <span class="message" v-if="!form.serviceSeq.isVaild && !form.serviceSeq.value.length">{{ form.serviceSeq.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">카테고리</div>
      <div class="v">
        <el-select v-model="form.noticeCategory.value" placeholder="카테고리" :class="{ warning: !form.noticeCategory.isVaild && !form.noticeCategory.value }">
          <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <br />
        <span class="message" v-if="!form.noticeCategory.isVaild && !form.noticeCategory.value">{{ form.noticeCategory.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        작업 시간 설정
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'설정한 시간에 따라 해당 작업의 진행/완료 상태를 표시할 수 있습니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-date-picker v-model="form.date.value" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
      </div>
    </div>
    <div>
      <div class="t b">제목</div>
      <div class="v">
        <el-input v-model="form.title.value" placeholder="제목" clearable :class="{ warning: !form.title.isVaild && !form.title.value }" />
        <span class="message" v-if="!form.title.isVaild && !form.title.value">{{ form.title.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">내용</div>
      <div class="v">
        <div :class="['editor', !form.contents.isVaild && !form.contents.value ? 'editor-warning' : '']" :key="ux.theme">
          <editor v-model="form.contents.value" :init="store.editorConfig" :api-key="store.editorApiKey" />
        </div>
        <span class="message" v-if="!form.contents.isVaild && !form.contents.value">{{ form.contents.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">상태</div>
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
const fetchAsync = inject("fetchAsync");
const ux = uxStore();
const { serviceGroup, metaData } = storeToRefs(store);

let page = {
  name: "공지사항",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/notice",
  actionURL: "/api/report/notice",
  redirectRUL: "/nxlogreport/helpcenter/notice",
};

emit("title", `${page.name} ${page.actionName}`, `Help Center 공지사항에 노출하는 공지 내용을 ${page.actionName}합니다`);

//let serviceSeqOrigin = 0;

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      //serviceSeqOrigin = data.value.serviceSeq;

      form.serviceSeq.value = [data.value.serviceSeq.toString()];
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

let categories = Object.keys(metaData.value.noticeCategory).map((key) => {
  return { value: key, label: metaData.value.noticeCategory[key] };
});
let useYnList = Object.keys(metaData.value.noticeUseYn).map((key) => {
  return { value: key, label: metaData.value.noticeUseYn[key] };
});

let form = reactive({
  serviceSeq: { value: ["-1"], isVaild: true, message: "게임을 선택해주세요." },
  noticeCategory: { value: null, isVaild: true, message: "카테고리를 선택해주세요." },
  date: { value: "" },
  title: { value: "", isVaild: true, message: "제목을 입력해주세요." },
  contents: { value: "", isVaild: true, message: "내용을 입력해주세요." },
  useYn: { value: "Y" },
});

function action() {
  form.serviceSeq.isVaild = form.serviceSeq.value.length ? true : false;
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

          for (let seq of form.serviceSeq.value) {
            let postData = {
              serviceSeq: seq,
              noticeCategory: form.noticeCategory.value,
              title: form.title.value,
              contents: form.contents.value.toHtmlDecode(),
              useYn: form.useYn.value,
            };

            if (form.date.value && Array.isArray(form.date.value)) {
              postData.noticeScheduleStart = form.date.value[0];
              postData.noticeScheduleEnd = form.date.value[1];
            }

            if (page.method === "put") postData.noticeSeq = parseInt(route.params.id);

            let { data, error } = await fetchAsync(page.actionURL, {}, postData, page.method);
          }

          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 600);
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
