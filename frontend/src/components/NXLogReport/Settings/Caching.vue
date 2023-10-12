<!-- prettier-ignore -->
<style lang="scss" scoped>
  .filter{
    .el-button{float: none;}
    .preset-button{float: right;}
    a.link{display: inline-block; margin-left: 10px; font-size: 12px; color:var(--color-active); float: right;}

    div.preset-list{
      padding: 5px 0 0 0; 
      &>span{
        display: inline-block; padding: 4px 10px; margin:0 6px 0px 0;  font-size: 12px; color:var(--color-active); text-decoration: underline;
        // background-color: var(--bg-color); border-radius: 4px; border:solid 1px var(--border-color);
        &:hover{
          cursor: pointer; font-family: 'noto-bold';
          // color: var(--bg-color); background-color: var(--color-active);
          span{ display: inline-block}
        }
        span{
          display: none; position: absolute; color: var(--color-active); border-radius: 10px; margin-left:-2px; margin-top: -4px; color:var(--text-color-bold);
          &:hover{color:var(--color-active)}
        }
      }
    }
  }
  .preset-submit{
    div{
      padding: 5px 0;
      &:nth-child(1){font-size: 13px;}
      &:nth-child(2){padding: 10px 0;}
      &:nth-child(3){text-align: right;}
    }
  }
  .results{ padding:10px 0}
  .json-viewer{
    height: 600px; overflow: auto; background-color: var(--bg-color-header);
  }  
</style>
<!-- prettier-ignore -->
<style lang="scss">
.json-viewer-light {
  white-space: nowrap;  color: var(--text-color-medium); font-size: 14px; font-family: Consolas, Menlo, Courier, monospace;
  .jv-ellipsis {
    color: var(--text-color-light); background-color: var(--bg-color-sub); display: inline-block; line-height: 0.9; font-size: 14; padding: 0px 4px 2px 4px;
    border-radius: 3px; vertical-align: 2px; cursor: pointer; user-select: none;
  }
  .jv-button { color: #49b3ff;}
  .jv-key { color: var(--text-color-medium);}
  .jv-item {
    &.jv-array { color: var(--text-color-medium)}
    &.jv-boolean {color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color: var(--text-color-medium)}
    &.jv-undefined { color: #e08331 }
    &.jv-string { color: #42b983; word-break: break-word; white-space: normal}
  }
  .jv-code {
    .jv-toggle {
      &:before { padding: 0px 2px; border-radius: 2px}
      &:hover {
        &:before { background: var(--bg-color-medium) }
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="filter">
      <el-input v-model="str" ref="strRef" placeholder="빈값을 조회할 경우 전체 캐시가 조회됩니다." style="width: 40%" clearable @keyup.enter="go()">
        <template #prepend>조건 입력</template>
      </el-input>
      <el-button type="primary" @click="go()">조회</el-button>
      <el-popover class="preset-button" placement="bottom" :width="300" trigger="click" :visible="visible">
        <template #reference>
          <el-button @click="visible = true">프리셋저장</el-button>
        </template>
        <div class="preset-submit">
          <div>
            작성한 조건을 저장합니다.
            <br />
            재사용을 위해 아래 간단히 메모를 입력해주세요.
          </div>
          <div>
            조건 : {{ str }}
            <br />
            <el-input v-model="memo" placeholder="메모를 입력하세요." ref="memoRef" style="width: 100%" clearable @keyup.enter="savePreset()"></el-input>
          </div>
          <div>
            <el-button @click="visible = false">취소</el-button>
            <el-button type="primary" @click="savePreset()">저장</el-button>
          </div>
        </div>
      </el-popover>
      <a class="link" target="_blank" href="https://confluence.nexon.com/pages/viewpage.action?pageId=413503109">캐시 데이터 목록</a>
      <a class="link" href="#" @click="showsServiceList = true">서비스 목록</a>
      <div class="preset-list" v-if="presetList.length">
        <span
          v-for="entry in presetList"
          @click="
            str = entry.value;
            go();
          "
        >
          {{ entry.memo }}
          <span @click.stop="deletePreset(entry)">
            <icon class="action" :name="'Close'"></icon>
          </span>
        </span>
      </div>
    </div>
    <el-dialog v-model="showsCacheView" :destroy-on-close="true" width="800" :top="'10%'">
      <template #header>
        <span style="font-size: 24px">Cached Data</span>
        <el-button type="primary" :size="'small'" style="margin-left: 10px; margin-top: -8px" @click="deleteCurrentViewCash()">삭제</el-button>
      </template>
      <div class="json-viewer">
        <span style="position: absolute; z-index: 10">
          <el-button v-if="expandDepth === 3" :size="'small'" @click="expandDepth = 10" link style="color: var(--color-active)">
            <svg height="20" width="20" viewBox="0 96 960 960"><path fill="currentColor" d="M470 790V586H266v-20h204V362h20v204h204v20H490v204h-20Z" /></svg>
            <span>확장</span>
          </el-button>
          <el-button v-else :size="'small'" @click="expandDepth = 3" link style="color: var(--color-active)">
            <svg height="20" width="20" viewBox="0 96 960 960" style="transform: rotate(180deg)"><path fill="currentColor" d="M266 586v-20h428v20H266Z" /></svg>
            <span>축소</span>
          </el-button>
        </span>
        <json-viewer :value="json" :key="expandDepth" :expand-depth="expandDepth" :copyable="true" theme="json-viewer-light"></json-viewer>
      </div>
    </el-dialog>
    <el-dialog v-model="showsServiceList" :destroy-on-close="true" width="800" :top="'10%'">
      <template #header>
        <span style="font-size: 24px">서비스 목록</span>
      </template>
      <service-list></service-list>
    </el-dialog>
    <div class="results" :key="key">
      <div v-if="results.length">
        <div class="list">
          <div class="asm-table-head">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="7%" />
                <col width="10%" />
                <col width="75%" />
                <col width="8%" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>서버</th>
                  <th>KEY</th>
                  <th>관리</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="asm-table-body">
            <table cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="7%" />
                <col width="10%" />
                <col width="75%" />
                <col width="8%" />
              </colgroup>
              <tbody v-if="filteredData.length > 0">
                <tr v-for="entry in filteredData">
                  <td><el-checkbox v-model="entry.checked" label="" size="small" /></td>
                  <td>{{ entry.server }}</td>
                  <td class="left">
                    <span class="link" @click="viewCache(entry.key)">{{ entry.key }}</span>
                  </td>
                  <td><icon class="action" @click="deleteCache(entry.key)" :name="'Delete'"></icon></td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="100" height="403">
                    <el-empty :image-size="200" />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="100">
                  <div class="pagination">
                    <el-pagination @size-change="changePageSize" v-model:current-page="options.currentPage" v-model:page-size="options.pageSize" :page-sizes="options.pageSizes" small background layout="sizes, prev, pager, next" :total="options.total" class="mt-4" />
                    <span class="total">{{ (options.total === options.filteredCount ? "전체 " : "조건 검색 ") + options.total.toComma() }}개</span>
                    <el-input v-model="str2" placeholder="결과 내 검색" style="width: 20%; float: right" clearable></el-input>
                    <template v-if="checkedData.length">
                      <el-button type="primary" style="position: absolute; right: 0px" @click="deleteCheckedCache()">{{ checkedData.length }}건 삭제</el-button>
                    </template>
                    <template v-else>
                      <el-button type="danger" style="position: absolute; right: 0px" @click="deleteAllCache()">전체삭제</el-button>
                    </template>
                  </div>
                </td>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div v-if="isloading">
        <skeleton :count="options.pageSize" :style="{ margin: '7px 0 7px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
        <br />
        <skeleton :count="1" :style="{ width: '100px' }"></skeleton>
        <skeleton :count="1" :style="{ width: '300px', margin: '0 10px' }"></skeleton>
        <skeleton :count="1" :style="{ width: '80px', margin: '0 10px' }"></skeleton>
        <skeleton :count="1" :style="{ width: '70px', float: 'right' }"></skeleton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed, inject, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { ElInput } from "element-plus";
import message from "@/stores/message";
import ServiceList from "@/components/Common/ServiceList.vue";

const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");

const emit = defineEmits(["title"]);
emit("title", "캐싱 관리", `NXLog리포트에서 제공할 게임/토픽 공간을 등록 / 관리할 수 있습니다.`);

onMounted(() => {
  strRef.value.focus();
});

let str = ref("");
let str2 = ref("");
let cloneStr = ref("");
let visible = ref(false);
let showsCacheView = ref(false);
let showsServiceList = ref(false);
let expandDepth = ref(3);

let preset = fetch("/api/report/cache/preset", { size: 10000 });
let presetList = ref([]);
watch(preset.data, () => {
  preset.data.value.forEach((entry) => {
    presetList.value.push(entry);
  });
});

let serviceList = fetch("/api/report/service", { size: 10000 });

let results = ref([]);
let isloading = ref(false);
let key = ref(0);
let memo = ref("");
const memoRef = ref(ElInput);
const strRef = ref(ElInput);

let options = reactive({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100, 1000],
  total: 0,
});

let filteredData = computed(() => {
  let data = results.value;

  if (str2.value) {
    data = data.filter((entry) => {
      return entry["key"].indexOf(str2.value) > -1 ? true : false;
    });
  }
  options.total = data.length;
  return data.slice(options.pageSize * (options.currentPage - 1), options.pageSize * options.currentPage);
});

let checkedData = ref([]);

watch(
  results,
  () => {
    checkedData.value = results.value.filter((entry) => entry.checked);
  },
  { deep: true }
);

async function savePreset() {
  if (memo.value) {
    if (presetList.value.some((entry) => entry.memo === memo.value)) {
      ElMessageBox.alert("같은 이름의 프리셋이 존재합니다.", "", {
        confirmButtonText: "OK",
      });
    } else {
      let params = {
        type: "PRESET",
        memo: memo.value,
        value: str.value,
      };

      let preset = await fetchAsync("/api/report/cache/preset", {}, params, "post");

      presetList.value.push(preset.data.value);

      message("success", `프리셋 '${str.value}'이 저장되었습니다.`);
      visible.value = false;
    }
  } else {
    ElMessageBox.alert("메모를 입려하세요.", "", {
      confirmButtonText: "OK",
    });
  }
}

async function deletePreset(preset) {
  await fetchAsync("/api/report/cache/preset/" + preset.cachePresetSeq, {}, {}, "delete");
  let index = presetList.value.findIndex((entry) => entry.cachePresetSeq === preset.cachePresetSeq);
  presetList.value.splice(index, 1);
}

async function go() {
  results.value = [];

  isloading.value = true;

  str.value = str.value ? str.value : "*";
  let data = await fetchAsync("/api/report/cache/scan", {}, `${str.value ? str.value : "*"}`, "post", { "content-type": "application/text" });

  Object.keys(data.data.value).forEach((key) => {
    data.data.value[key].forEach((entry) => {
      results.value.push({ server: key, key: entry, checked: false });
    });
  });

  options.total = results.value.length;
  options.currentPage = 1;
  key.value++;

  if (results.value.length === 0) {
    ElMessage({
      type: "info",
      message: `존재하지 않는 캐시입니다.`,
      duration: 1000,
    });
  }

  cloneStr.value = str.value;
  isloading.value = false;
}

let json = ref([]);
let currentKey = ref("");

async function viewCache(key) {
  currentKey.value = key;

  let data = await fetchAsync("/api/report/cache/value", {}, key, "post", { "content-type": "application/text" });

  json.value = [];

  try {
    Object.keys(data.data.value).forEach((key) => {
      let jsonData = JSON.parse(data.data.value[key]);
      json.value.push(jsonData);
    });

    showsCacheView.value = true;
  } catch (ex) {
    ElMessage.error(ex.message);
  }
}

function deleteCurrentViewCash() {
  deleteCache(currentKey.value);
  showsCacheView.value = false;
}

function deleteCheckedCache() {
  ElMessageBox({
    title: ``,
    message: `선택된 ${checkedData.value.length}건의 Cache를 식제하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";

        for (let item of checkedData.value) {
          await fetchAsync("/api/report/cache/remove", {}, item.key, "post", { "content-type": "application/text" });
          item.checked = false;
          let index = results.value.findIndex((entry) => entry.key === item.key);
          results.value.splice(index, 1);
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
    message("success", `식제되었습니다.`);
  });
}

function deleteCache(key) {
  ElMessageBox({
    title: ``,
    message: `해당 Cache를 식제하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";

        await fetchAsync("/api/report/cache/remove", {}, key, "post", { "content-type": "application/text" });

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
    let index = results.value.findIndex((entry) => entry.key === key);
    results.value.splice(index, 1);
    message("success", `식제되었습니다.`);
  });
}

function deleteAllCache() {
  ElMessageBox({
    title: ``,
    message: `총 ${results.value.length}건의 Cache를 식제하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";

        await fetchAsync("/api/report/cache/remove", {}, cloneStr.value, "post", { "content-type": "application/text" });

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
    results.value = [];
    message("success", `식제되었습니다.`);
  });
}

watch(visible, () => {
  if (visible.value) {
    memo.value = "";
    memoRef.value.focus();
  }
});
</script>
