<!-- prettier-ignore -->
<style lang="scss" scoped>    
  .desc{font-size: 13px; padding-bottom: 20px;}
  .data{
    .asm-table-body{max-height: 304px; overflow: auto; border-bottom: solid 1px var(--border-color);;}
  }
  .button{padding:30px 0 10px 0; text-align: right}
</style>
<template>
  <div class="desc">
    자주묻는질문 상단에 노출할 태그 및 순서를 관리합니다.
    <br />
    노출 태그는 상위 5개만 적용되며, 조정이 필요할 경우 순서를 변경해주세요.
  </div>
  <div class="data">
    <div class="asm-table-head">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="30%" />
          <col width="80%" />
        </colgroup>
        <thead>
          <tr>
            <th>노출순서</th>
            <th>태그</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="asm-table-body">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="30%" />
          <col width="80%" />
        </colgroup>
        <draggable v-model="tagData" handle=".move" :item-key="'name'" :animation="100" tag="tbody" ghost-class="ghost">
          <template #item="{ element: entry }">
            <tr v-if="entry.type !== 'delete'">
              <td class="move"><icon :name="'DragHandle'"></icon></td>
              <td class="left" style="padding-left: 20px">{{ entry.tagName }}</td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
  <div class="button">
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

const emit = defineEmits(["closeTag"]);

let { data } = fetch("/api/report/faqtag");

let tagData = ref([]);

watch(data, () => {
  tagData.value = data.value;
  tagData.value.sortKey("sortNo", 1);
});

function cancel() {
  emit("closeTag");
}

function save() {
  tagData.value
    .filter((entry) => entry.type !== "delete")
    .forEach((entry, i) => {
      entry.sortNo = i + 1;
    });

  ElMessageBox({
    title: `태그 출력 설정`,
    message: `저장하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";

        await fetchAsync("/api/report/faqtag", {}, tagData.value, "put");

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
    message("success", `태그 출력 설정이 저장되었습니다.`);
    emit("closeTag");
  });
}
</script>
