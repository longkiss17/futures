<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    div.report-list{
      ul{
        li{
          list-style: none; display: flex; padding: 10px 0; border-bottom: solid 1px var(--border-color);
          &:hover{ background-color: var(--color-thin)}
          div{
            text-align: center;
            &:nth-child(1){width:10%; svg{cursor: move;}}
            &:nth-child(2){width:15%}
            &:nth-child(3){width:15%}
            &:nth-child(4){width:15%}
            &:nth-child(5){width:45%}
          }
        }
      }
    }
    .article-section{
      div{
        font-family: "noto-medium";
        .asm-table-body{
          tr{
            &:hover{ background-color: var(--color-thin)}
            td{padding: 4px 0; cursor: pointer;}
          }                    
        }
        &:nth-child(5){
          text-align: right;
        }
        &:nth-child(2){
          padding: 10px 0; position: relative;
          span{position: absolute; top:16px; display: inline-block; margin-left: 4px; font-size: 13px; cursor: pointer;}
        }
      }
    }
  }
</style>
<style lang="scss">
.article-section {
  .el-radio {
    margin-right: 0px;
  }

  .el-radio__label {
    display: none;
  }
}
</style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">제목</div>
      <div class="v">
        <el-input v-model="form.title.value" placeholder="제목" clearable :class="{ warning: !form.title.isVaild && !form.title.value }" />
        <span class="message" v-if="!form.title.isVaild && !form.title.value">{{ form.title.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">리스트용 이미지</div>
      <div class="v">
        <template v-if="form.listImage.value.length > 0">
          <img :src="form.listImage.value[0].response.location" alt="" width="200" height="120" style="vertical-align: middle" />
          <icon :name="'Close'" @click="form.listImage.value = []" style="vertical-align: middle; cursor: pointer"></icon>
        </template>
        <template v-else>
          <el-upload v-model:file-list="form.listImage.value" class="upload-demo" :action="uploadUrl" :with-credentials="true" :limit="1" :on-success="upload">
            <el-button :type="!form.listImage.isVaild && !form.listImage.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small">파일 첨부</el-button>
            <template #tip>
              <div class="el-upload__tip">1개 파일 jpg, png 만 허용, 파일 용량 200KB이하, 권장 사이즈 200 X 120</div>
            </template>
          </el-upload>
        </template>
        <span class="message" v-if="!form.listImage.isVaild && !form.listImage.value.length">{{ form.listImage.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">메인용 이미지</div>
      <div class="v">
        <template v-if="form.mainImage.value.length > 0">
          <img :src="form.mainImage.value[0].response.location" alt="" width="500" height="500" style="vertical-align: middle" />
          <icon :name="'Close'" @click="form.mainImage.value = []" style="vertical-align: middle; cursor: pointer"></icon>
        </template>
        <template v-else>
          <el-upload v-model:file-list="form.mainImage.value" :action="uploadUrl" :with-credentials="true" :limit="1">
            <el-button :type="!form.mainImage.isVaild && !form.mainImage.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small">파일 첨부</el-button>
            <template #tip>
              <div class="el-upload__tip">1개 파일 jpg, png 만 허용, 파일 용량 200KB이하, 권장 사이즈 500 X 500</div>
            </template>
          </el-upload>
        </template>
        <span class="message" v-if="!form.mainImage.isVaild && !form.mainImage.value.length">{{ form.mainImage.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">
        작성자(표기용)
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'리스트에 제목과 함께 사용될 요약 텍스트 입니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.articleEditor.value" placeholder="제목" clearable :class="{ warning: !form.articleEditor.isVaild && !form.articleEditor.value }" />
        <span class="message" v-if="!form.articleEditor.isVaild && !form.articleEditor.value">{{ form.articleEditor.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">
        요약 텍스트
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'리스트에 제목과 함께 사용될 요약 텍스트 입니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.abridged.value" placeholder="요약 텍스트" :rows="5" type="textarea" clearable :class="{ warning: !form.abridged.isVaild && !form.abridged.value }" />
        <span class="message" v-if="!form.abridged.isVaild && !form.abridged.value">{{ form.abridged.message }}</span>
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
      <div class="t b">
        태그
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'태그는 최대 3개 까지 입력할 수 있습니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-tag v-for="tag in form.tags.value" :key="tag" style="margin-right: 5px" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag.tagName }}
        </el-tag>
        <template v-if="tagVisible">
          <el-input ref="tagRef" v-model="tagValue" size="small" style="width: 100px; margin-right: 5px" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        </template>
        <template v-else>
          <el-button v-if="form.tags.value.length < 3" :type="!form.tags.isVaild && !form.tags.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small" @click="showInput">+ 태그 추가</el-button>
        </template>
        <br />
        <span class="message" v-if="!form.tags.isVaild && !form.tags.value.length">{{ form.tags.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        연관 리포트
        <el-popover placement="right" :width="'auto'" trigger="hover">
          <span>
            아티클과 함께 추천할 리포트를 추가해주세요
            <br />
            (3개 이하로 권장, 라이브 상태의 리포트만 게재할 수 있습니다.)
          </span>
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-button class="button-new-tag ml-1" size="small" @click="showsReport = true">+ 리포트 추가</el-button>
        <br />
        <el-dialog v-model="showsReport" title="리포트 추가">
          <report @selectReport="selectReport" @closeReport="closeReport" :shows-report="showsReport" :selected-report-list="form.reports.value"></report>
        </el-dialog>
        <el-dialog v-model="sectionInfo.visible" title="섹션 지정" width="500" :top="'30vh'" class="article-section">
          <div>리포트명 : 마비노기 AUU (리전통합)</div>
          <div>
            <el-radio v-model="sectionInfo.selected" :label="0"></el-radio>
            <span @click="sectionInfo.selected = 0">리포트 기본 설정 (자동 설정)</span>
          </div>
          <div class="asm-table-head">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="70%" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>섹션 번호</th>
                  <th>섹션명</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="asm-table-body" style="height: 300px; overflow: auto">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr v-for="entry in sectionInfo.data" @click="sectionInfo.selected = entry.section_seq">
                  <td><el-radio v-model="sectionInfo.selected" :label="entry.section_seq"></el-radio></td>
                  <td>{{ entry.section_seq }}</td>
                  <td>{{ entry.section_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <el-button @click="sectionInfo.visible = false">취소</el-button>
            <el-button type="primary" @click="selectSection">{{ page.actionName }}</el-button>
          </div>
        </el-dialog>
        <div v-if="form.reports.value.length" style="margin-top: 10px">
          <div class="asm-table-head">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="10%" />
                <col width="12%" />
                <col width="13%" />
                <col width="15%" />
                <col width="23%" />
                <col width="15%" />
                <col width="10%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>노출순서</th>
                  <th>리포트 번호</th>
                  <th>리포트 분류</th>
                  <th>
                    카테고리
                    <el-popover placement="right" :width="'auto'" trigger="hover" :content="'리포트 섹션이나 실시간 리포트 탭을 지정할 수 있습니다.'">
                      <template #reference>
                        <icon :width="20" :height="20" :name="'Help'" style="display: inline-block; vertical-align: middle; margin-top: -3px"></icon>
                      </template>
                    </el-popover>
                  </th>
                  <th>리포트명</th>
                  <th>섹션/탭 지정</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="asm-table-body">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="10%" />
                <col width="12%" />
                <col width="13%" />
                <col width="15%" />
                <col width="23%" />
                <col width="15%" />
                <col width="10%" />
                <col width="7%" />
              </colgroup>
              <draggable v-model="form.reports.value" handle=".move" :item-key="'name'" :animation="100" tag="tbody" ghost-class="ghost">
                <template #item="{ element: entry }">
                  <tr>
                    <td class="move"><icon :name="'DragHandle'"></icon></td>
                    <td>{{ entry.key }}</td>
                    <td>{{ entry.option1 }}</td>
                    <td>{{ entry.option2 }}</td>
                    <td class="normal" v-html="entry.value"></td>
                    <td class="normal">
                      {{ entry.brickSeq ? entry.brickName : "리포트 기본설정" }}
                      <el-button v-if="entry.option3 === 'section'" class="button-new-tag ml-1" size="small" @click="changeSection(entry)">변경</el-button>
                    </td>
                    <td>
                      <span :class="entry.option6 === 'Y' ? 'enable' : 'disable'">{{ entry.option6 === "Y" ? "라이브" : "숨김" }}</span>
                    </td>
                    <td><icon class="action" @click="deleteRow(entry)" :name="'Delete'" :width="22" :height="22"></icon></td>
                  </tr>
                </template>
              </draggable>
            </table>
          </div>
        </div>
        <div v-else style="font-size: 12px; margin-top: 5px">아티클과 함께 추천할 리포트를 추가할 수 있습니다. (3개 이하로 권장, 라이브 상태의 리포트만 게재됩니다.)</div>
        <div v-if="showsSkeleton">
          <skeleton :count="1" :style="{ margin: '9px 0 9px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
        </div>
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
import { ref, reactive, watch, inject, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { storeToRefs } from "pinia";
import uxStore from "@/stores/ux";
import message from "@/stores/message";
import { ElInput } from "element-plus";
import report from "./Report.vue";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const moment = inject("moment");
const fetchAsync = inject("fetchAsync");
const ux = uxStore();
const { metaData } = storeToRefs(store);

const uploadUrl = window.config.uploadUrl;

let page = {
  name: "아티클",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/article",
  actionURL: "/api/report/article",
  redirectRUL: "/nxlogreport/contents/article",
};

emit("title", `${page.name} ${page.actionName}`, `리포트 아티클 콘텐츠를 ${page.actionName} 합니다.`);

let showsSkeleton = ref(false);
let openTime;
let useYn;

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, async () => {
    showsSkeleton.value = true;
    if (data) {
      let tags = await fetchAsync("/api/report/articletag/" + route.params.id);
      let reports = await fetchAsync("/api/report/articlereport/" + route.params.id);
      let allReports = fetch("/api/report/meta/reportSeq", { size: 10000 });

      form.title.value = data.value.title;
      form.listImage.value = [{ name: data.value.listThumbnailOriginalFilename, response: { location: data.value.listThumbnailUrl } }];
      form.mainImage.value = [{ name: data.value.thumbnailOriginalImageFilename, response: { location: data.value.thumbnail } }];
      form.contents.value = data.value.contents.toHtmlEncode();
      form.abridged.value = data.value.abridged;
      form.articleEditor.value = data.value.articleEditor;
      form.tags.value = tags.data.value;
      form.reports.value = [];
      form.useYn.value = data.value.useYn;
      form.openTime.value = data.value.openTime;

      openTime = data.value.openTime;
      useYn = data.value.useYn;

      watch(allReports.data, () => {
        reports.data.value.forEach((report) => {
          let item = allReports.data.value.reportSeq.metaValues.find((v) => v.key == report.reportSeq);

          let sectionList = JSON.parse(item.option4);
          let section = sectionList ? sectionList.find((section) => section.section_seq == report.brickSeq) : null;

          item.brickSeq = report.brickSeq;
          item.brickName = section ? section.section_name : "리포트 기본설정";
          form.reports.value.push(item);
        });

        showsSkeleton.value = false;
      });
    }
  });
}

const tagValue = ref("");
const tagVisible = ref(false);
const tagRef = ref(ElInput);

function handleClose(tag) {
  form.tags.value.splice(form.tags.value.indexOf(tag), 1);
}

function showInput() {
  tagVisible.value = true;
  nextTick(() => {
    tagRef.value.focus();
  });
}

async function handleInputConfirm() {
  if (tagValue.value) {
    let tag = await fetchAsync(
      "/api/report/articletagdefine",
      {},
      {
        tagName: tagValue.value,
        useYn: "Y",
      },
      "post"
    );

    form.tags.value.push(tag.data.value);
  }
  tagVisible.value = false;
  tagValue.value = "";
}

const showsReport = ref(false);

let sectionInfo = reactive({
  visible: false,
  selected: 0,
  report: {},
  data: [],
});

function closeReport() {
  showsReport.value = false;
}

function selectReport(data) {
  form.reports.value = data;
  showsReport.value = false;
}

function changeSection(entry) {
  sectionInfo.visible = true;
  sectionInfo.data = JSON.parse(entry.option4);
  sectionInfo.reportSeq = entry.key;
  sectionInfo.selected = entry.brickSeq ? entry.brickSeq : 0;
}

function selectSection() {
  let report = form.reports.value.find((report) => report.key == sectionInfo.reportSeq);
  report.brickSeq = sectionInfo.selected;
  let section = sectionInfo.data.find((section) => section.section_seq === sectionInfo.selected);
  report.brickName = section ? section.section_name : "리포트 기본설정";
  sectionInfo.visible = false;
}

function deleteRow(entry) {
  let index = form.reports.value.findIndex((report) => report.key === entry.key);
  form.reports.value.splice(index, 1);
}

let useYnList = Object.keys(metaData.value.noticeUseYn).map((key) => {
  return { value: key, label: metaData.value.noticeUseYn[key] };
});

let form = reactive({
  title: { value: "", isVaild: true, message: "제목을 입력해주세요." },
  listImage: { value: [], isVaild: true, message: "리스트 이미지를 업로드해주세요." },
  mainImage: { value: [], isVaild: true, message: "메인 이미지를 업로드해주세요." },
  contents: { value: "", isVaild: true, message: "내용을 입력해주세요." },
  abridged: { value: "", isVaild: true, message: "요약 텍스트를 입력해주세요." },
  articleEditor: { value: "", isVaild: true, message: "작성자(표기용)을 입력해주세요." },
  tags: { value: [], isVaild: true, message: "태그를 1개 이상 등록해주세요." },
  reports: { value: [], isVaild: true, message: "태그를 1개 이상 등록해주세요." },
  useYn: { value: "Y" },
  openTime: { value: "" },
});

function action() {
  form.title.isVaild = form.title.value ? true : false;
  form.abridged.isVaild = form.abridged.value.length ? true : false;
  form.articleEditor.isVaild = form.articleEditor.value.length ? true : false;
  form.listImage.isVaild = form.listImage.value.length ? true : false;
  form.mainImage.isVaild = form.mainImage.value.length ? true : false;
  form.contents.isVaild = form.contents.value ? true : false;
  form.tags.isVaild = form.tags.value.length ? true : false;

  let cnt = Object.keys(form).filter((key) => form[key].isVaild !== undefined && form[key].isVaild === false).length;

  if (showsSkeleton.value) {
    ElMessageBox.alert("연관 리포트를 불러오는 중입니다.", "", {
      confirmButtonText: "OK",
    });
    return;
  }

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
            contents: form.contents.value.toHtmlDecode(),
            abridged: form.abridged.value,
            articleEditor: form.articleEditor.value,
            useYn: form.useYn.value,
            thumbnail: form.mainImage.value[0].response.location,
            thumbnailOriginalImageFilename: form.mainImage.value[0].name,
            listThumbnailUrl: form.listImage.value[0].response.location,
            listThumbnailOriginalFilename: form.listImage.value[0].name,
            hits: 0,
          };

          let now = moment().format("YYYY-MM-DD HH:mm:ss");

          if (page.method === "put") {
            postData.articleSeq = parseInt(route.params.id);

            if (useYn === "N" && form.useYn.value === "Y" && !openTime) {
              postData.openTime = now;
            }
          } else {
            if (form.useYn.value === "Y") {
              postData.openTime = now;
            }
          }

          let { data, error } = fetch(page.actionURL, {}, postData, page.method);

          watch(data, async () => {
            if (data) {
              if (page.method === "put") {
                await fetchAsync("/api/report/articlereport/" + route.params.id, {}, {}, "delete");
                await fetchAsync("/api/report/articletag/" + route.params.id, {}, {}, "delete");
              }

              let articlereport = form.reports.value.map((report) => {
                return {
                  articleRecommendReportSeq: 0,
                  articleSeq: data.value.articleSeq,
                  reportSeq: report.key,
                  brickSeq: report.brickSeq ? report.brickSeq : 0,
                };
              });

              let articletag = form.tags.value.map((tag) => {
                return {
                  articleSeq: data.value.articleSeq,
                  articleTagDefineSeq: tag.articleTagDefineSeq,
                  articleTagMappingSeq: 0,
                };
              });

              await fetchAsync("/api/report/articlereport", {}, articlereport, "post");
              await fetchAsync("/api/report/articletag", {}, articletag, "post");

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
