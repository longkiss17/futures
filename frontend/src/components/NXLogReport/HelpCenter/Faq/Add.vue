<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">제목</div>
      <div class="v">
        <el-input v-model="form.subject.value" placeholder="제목" clearable :class="{ warning: !form.subject.isVaild && !form.subject.value }" />
        <span class="message" v-if="!form.subject.isVaild && !form.subject.value">{{ form.subject.message }}</span>
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
      <div class="t">파일 첨부</div>
      <div class="v">
        <el-upload v-model:file-list="form.attachfiles.value" :action="uploadUrl" :with-credentials="true">
          <el-button :type="!form.attachfiles.isVaild && !form.attachfiles.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small">파일 첨부</el-button>
          <template #tip>
            <div class="el-upload__tip">1개 파일 jpg, png 만 허용, 파일 용량 200KB이하, 권장 사이즈 500 X 500</div>
          </template>
        </el-upload>
        <span class="message" v-if="!form.attachfiles.isVaild && !form.attachfiles.value.length">{{ form.attachfiles.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">
        태그
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'태그는 최대 3개 까지 입력할 수 있습니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-tag v-for="tag in form.tags.value" :key="tag" style="margin-right: 5px" closable :disable-transitions="false" @close="tagClose(tag)">
          {{ tag }}
        </el-tag>
        <template v-if="tagVisible">
          <el-input ref="tagRef" v-model="tagValue" size="small" style="width: 100px; margin-right: 5px" @keyup.enter="tagInputConfirm" @blur="tagInputConfirm" />
        </template>
        <template v-else>
          <el-button v-if="form.tags.value.length < 3" class="button-new-tag ml-1" size="small" @click="showTagInput">+ 태그 추가</el-button>
        </template>
        <br />
        <span class="message" v-if="!form.tags.isVaild && !form.tags.value.length">{{ form.tags.message }}</span>
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
import { ref, reactive, watch, inject, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { ElInput } from "element-plus";
import uxStore from "@/stores/ux";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const ux = uxStore();
const uploadUrl = window.config.uploadUrl;

let page = {
  name: "자주 묻는 질문",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/faq",
  actionURL: "/api/report/faq",
  redirectRUL: "/nxlogreport/helpcenter/faq",
};

emit("title", `${page.name} ${page.actionName}`, `Help Center에 노출되는 자주 묻는 질문의 내용을 ${page.actionName} 합니다.`);

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.subject.value = data.value.subject;
      form.contents.value = data.value.contents.toHtmlEncode();
      form.attachfiles.value = data.value.attachfiles
        ? JSON.parse(data.value.attachfiles).map((entry) => {
            return { name: entry.fileName, response: { location: entry.fileUrl } };
          })
        : [];
      form.tags.value = data.value.tags ? data.value.tags.split(",") : [];
      form.useYn.value = data.value.useYn;
      if (data.value.noticeScheduleStart) {
        form.date.value = [data.value.noticeScheduleStart, data.value.noticeScheduleEnd];
      }
    }
  });
}

let form = reactive({
  attachfiles: { value: [], isVaild: true, message: "리스트 이미지를 업로드해주세요." },
  subject: { value: "", isVaild: true, message: "제목을 입력해주세요." },
  contents: { value: "", isVaild: true, message: "내용을 입력해주세요." },
  tags: { value: [], isVaild: true, message: "태그를 1개 이상 등록해주세요." },
  useYn: { value: "Y" },
});

const tagValue = ref("");
const tagVisible = ref(false);
const tagRef = ref(ElInput);

function tagClose(tag) {
  form.tags.value.splice(form.tags.value.indexOf(tag), 1);
}

function showTagInput() {
  tagVisible.value = true;
  nextTick(() => {
    tagRef.value.focus();
  });
}

function tagInputConfirm() {
  if (tagValue.value) {
    form.tags.value.push(tagValue.value);
  }
  tagVisible.value = false;
  tagValue.value = "";
}

function action() {
  form.subject.isVaild = form.subject.value ? true : false;
  form.contents.isVaild = form.contents.value ? true : false;
  form.tags.isVaild = form.tags.value.length ? true : false;

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
            subject: form.subject.value,
            contents: form.contents.value.toHtmlDecode(),
            attachfiles: JSON.stringify(
              form.attachfiles.value.map((f) => {
                return { fileName: f.name, fileUrl: f.response.location };
              })
            ),
            tags: form.tags.value.join(","),
            useYn: form.useYn.value,
          };

          if (page.method === "put") postData.faqSeq = parseInt(route.params.id);

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
