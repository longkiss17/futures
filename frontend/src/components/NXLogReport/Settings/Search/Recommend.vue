<!-- prettier-ignore -->
<style lang="scss" scoped>    
  .desc{font-size: 13px; padding-bottom: 20px;}
  .data{
    .asm-table-body{max-height: 304px; overflow: auto; border-bottom: solid 1px var(--border-color);;}
  }
  .button{
    padding:30px 0 10px 0; text-align: right;
  }
</style>
<template>
  <div class="desc">특정 검색어를 설정해 검색 이용을 유도할 때 사용합니다. (최대 5개까지 설정)</div>
  <div class="data">
    <div class="asm-table-head">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="20%" />
          <col width="60%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>노출순서</th>
            <th>검색어</th>
            <th>관리</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="asm-table-body">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="20%" />
          <col width="60%" />
          <col width="20%" />
        </colgroup>
        <draggable v-model="recommendData" handle=".move" :item-key="'name'" :animation="100" tag="tbody" ghost-class="ghost">
          <template #item="{ element: entry }">
            <tr v-if="entry.type !== 'delete'">
              <td class="move"><icon :name="'DragHandle'"></icon></td>

              <template v-if="entry.type === 'add'">
                <td style="padding-left: 10px">
                  <el-input v-model="entry.recommendKeyword" placeholder="검색어 입력" clearable />
                </td>
              </template>
              <template v-else>
                <td class="left" style="padding-left: 20px">{{ entry.recommendKeyword }}</td>
              </template>

              <td><icon class="action" @click="del(entry)" :name="'Delete'" :width="22" :height="22"></icon></td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
  <div class="button">
    <el-button @click="add()" style="float: left">+ 검색어 추가</el-button>
    <el-button @click="cancel(false)">취소</el-button>
    <el-button type="primary" @click="save()">저장</el-button>
  </div>
</template>
<script setup>
import { ref, inject, watch } from "vue";
import { ElMessageBox } from "element-plus";
import message from "@/stores/message";

const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");

const emit = defineEmits(["closeRecommend"]);

let { data } = fetch("/api/report/searchkeywordrecommend");

let recommendData = ref([]);

watch(data, () => {
  recommendData.value = data.value;
  recommendData.value.sortKey("ranking", 1);
});

function add() {
  if (recommendData.value.filter((entry) => entry.type !== "delete").length >= 5) {
    ElMessageBox.alert("추천 설정은 최대 5개까지 등록 가능합니다.", "Title", {
      confirmButtonText: "OK",
    });
  } else {
    recommendData.value.push({
      type: "add",
      recommendKeyword: "",
    });
  }
}

function del(entry) {
  entry.type = "delete";
}

function cancel() {
  emit("closeRecommend");
}

function save() {
  recommendData.value
    .filter((entry) => entry.type !== "delete")
    .forEach((entry, i) => {
      entry.ranking = i + 1;
    });

  ElMessageBox({
    title: `추천 설정`,
    message: `작성한 정보로 저장하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";

        for (let entry of recommendData.value) {
          if (entry.type === "add") {
            await fetchAsync("/api/report/searchkeywordrecommend", {}, { recommendKeyword: entry.recommendKeyword, ranking: entry.ranking, useYn: "Y" }, "post");
          } else if (entry.type === "delete") {
            if (entry.searchKeywordRecommendDefineSeq) await fetchAsync("/api/report/searchkeywordrecommend/" + entry.searchKeywordRecommendDefineSeq, {}, {}, "delete");
          } else {
            await fetchAsync("/api/report/searchkeywordrecommend/" + entry.searchKeywordRecommendDefineSeq, {}, { searchKeywordRecommendDefineSeq: entry.searchKeywordRecommendDefineSeq, recommendKeyword: entry.recommendKeyword, ranking: entry.ranking, useYn: "Y" }, "put");
          }
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
    message("success", `추천 설정이 저장되었습니다.`);
    emit("closeRecommend");
  });
}
</script>
