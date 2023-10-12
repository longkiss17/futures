<!-- prettier-ignore -->
<style lang="scss" scoped>
  .revision-history{
    width:200px;     
    div.title{ padding: 10px; font-family: 'noto-medium'; font-size: 14px;}
    div.history-head{}
    div.history-body{
      max-height: 200px; overflow: auto; overflow-x: hidden;

      tr{
        td{
          &:first-child{
            font-size: 12px; line-height: 16px;
          }
          &:last-child{
            font-size: 12px; font-family: "roboto-medium";
          }
          .s1{}
          .s2{font-size: 11px; font-family: "roboto-medium";}
        }
      }
    }
    ::-webkit-scrollbar {width: 4px; height:8px}
    ::-webkit-scrollbar-track {background: var(--bg-color-sub); }
    ::-webkit-scrollbar-thumb {background: var(--border-color-bold); border-radius:2px}
    ::-webkit-scrollbar-thumb:hover {background: var(--text-color-light);}
  }
</style>
<template>
  <el-dropdown :hide-on-click="false" size="small" @visible-change="open()">
    <span class="el-dropdown-link">
      <icon class="action" :name="'ManageSearch'" :width="24" :height="24"></icon>
    </span>
    <template #dropdown>
      <div class="revision-history">
        <div class="title">
          <span>수정 이력(작업)</span>
        </div>
        <div class="history-head">
          <table cellpadding="0" cellspacing="0" class="asm-table-popup">
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <tr>
                <th>수정 담당자</th>
                <th>수정 일시</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="history-body">
          <table cellpadding="0" cellspacing="0" class="asm-table-popup">
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr v-if="history && history.length > 0" v-for="entry in history">
                <td>
                  <span class="s1">{{ metaData.asmUserKey[entry.userKey] }}</span>
                  <br />
                  <span class="s2">{{ "(" + entry.userKey + ")" }}</span>
                </td>
                <td>{{ entry.registerTime.toDate("YY/MM/DD HH:mm:ss") }}</td>
              </tr>
              <tr v-else>
                <td colspan="2" style="height: 50px; font-family: 'noto-medium'">수정 이력이 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>
<script setup>
import { ref, inject, watch } from "vue";
import { storeToRefs } from "pinia";

const store = inject("store");
const fetch = inject("fetch");

const { metaData } = storeToRefs(store);
const props = defineProps(["serviceName", "menuPath", "menuKey"]);

let history = ref([]);

function open(visible) {
  if (history.value.length === 0) {
    let historyData = fetch("/api/asm/history", { serviceName: props.serviceName, menuPath: props.menuPath, menuKey: props.menuKey });

    watch(historyData.data, () => {
      history.value = historyData.data.value;
      history.value.sortKey("registerTime", -1);
    });
  }
}

let v = ref();
</script>
