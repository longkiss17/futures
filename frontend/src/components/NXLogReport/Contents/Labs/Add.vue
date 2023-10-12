<!-- prettier-ignore -->
<style lang="scss" scoped></style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">
        서비스명
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'배너 하단에 서비스명으로 표기됩니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.title.value" placeholder="ex) Query Builder" clearable :class="{ warning: !form.title.isVaild && !form.title.value }" />
        <span class="message" v-if="!form.title.isVaild && !form.title.value">{{ form.title.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">배너 이미지</div>
      <div class="v">
        <template v-if="form.thumbnailUrl.value">
          <img :src="form.thumbnailUrl.value" alt="" width="50" height="50" style="vertical-align: middle" />
          <icon :name="'Close'" @click="clearImage()" style="vertical-align: middle; cursor: pointer"></icon>
        </template>
        <template v-else>
          <el-upload v-model:file-list="uploadList" :action="uploadUrl" :with-credentials="true" :limit="1" :on-success="upload">
            <el-button :type="!form.thumbnailUrl.isVaild && !form.thumbnailUrl.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small">파일 첨부</el-button>
            <template #tip>
              <div class="el-upload__tip">1개 파일 jpg, png 만 허용, 파일 용량 200KB이하, 권장 사이즈 50 X 50</div>
            </template>
          </el-upload>
        </template>
        <span class="message" v-if="!form.thumbnailUrl.isVaild && !form.thumbnailUrl.value.length">{{ form.thumbnailUrl.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">배너 URL</div>
      <div class="v">
        <el-input v-model="form.bannerLink.value" placeholder="ex) https://query.na.nexon.com" clearable :class="{ warning: !form.bannerLink.isVaild && !form.bannerLink.value }" />
        <span class="message" v-if="!form.bannerLink.isVaild && !form.bannerLink.value">{{ form.bannerLink.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        배너 설명
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'선택 항목입니다. 10자 이내로 권장하며, 입력 시 개제한 배너의 툴팁으로 출력됩니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.description.value" placeholder="ex) Query Builder" clearable />
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

const uploadUrl = window.config.uploadUrl;

let page = {
  name: "랩스 서비스 관리",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/banner",
  actionURL: "/api/report/banner",
  redirectRUL: "/nxlogreport/contents/labs",
};

emit("title", `${page.name} ${page.actionName}`, `통합 홈 하단에 제공되는 랩스 서비스에 표시할 서비스 홍보 배너를 ${page.actionName} 합니다`);

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.title.value = data.value.title;
      form.thumbnailUrl.value = data.value.thumbnailUrl;
      form.thumbnailOriginalImageFilename.value = data.value.thumbnailOriginalImageFilename;
      form.description.value = data.value.description;
      form.bannerLink.value = data.value.bannerLink;
      form.useYn.value = data.value.useYn;
    }
  });
}

let useYnList = Object.keys(metaData.value.noticeUseYn).map((key) => {
  return { value: key, label: metaData.value.noticeUseYn[key] };
});

let form = reactive({
  title: { value: "", isVaild: true, message: "서비스명을 입력해주세요." },
  thumbnailUrl: { value: "", isVaild: true, message: "섬네일 이미지를 업로드해주세요." },
  thumbnailOriginalImageFilename: { value: "" },
  bannerLink: { value: "", isVaild: true, message: "배너URL을 입력해주세요." },
  description: { value: "" },
  useYn: { value: "Y" },
});

let uploadList = ref([]);

function clearImage() {
  form.thumbnailUrl.value = "";
  form.thumbnailOriginalImageFilename.value = "";
  uploadList.value = [];
}

function upload(files, uploadFiles) {
  form.thumbnailUrl.value = uploadFiles.response.location;
  form.thumbnailOriginalImageFilename.value = uploadFiles.name;
}

function action() {
  form.title.isVaild = form.title.value ? true : false;
  form.thumbnailUrl.isVaild = form.thumbnailUrl.value ? true : false;
  form.bannerLink.isVaild = form.bannerLink.value ? true : false;

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
            title: form.title.value,
            thumbnailUrl: form.thumbnailUrl.value,
            thumbnailOriginalImageFilename: form.thumbnailOriginalImageFilename.value,
            bannerLink: form.bannerLink.value,
            description: form.description.value,
            useYn: form.useYn.value,
          };

          if (page.method === "put") postData.bannerSeq = parseInt(route.params.id);
          else {
            postData.sortNo = route.query.sortNo;
            postData.hits = 0;
            postData.deleteYn = "N";
          }

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
