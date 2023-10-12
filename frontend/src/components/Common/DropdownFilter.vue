<!-- prettier-ignore -->
<style lang="scss" scoped>
.el-dropdown{ color: inherit}
.el-dropdown-link{
  span, svg{display: inline-block; vertical-align: middle; cursor: pointer; color: inherit; font-size: 11px;}
}
.button{ padding: 0 10px; border-top: solid 1px var(--border-color); text-align: center;}
</style>
<template>
  <el-dropdown :hide-on-click="false" trigger="click" size="small">
    <span class="el-dropdown-link">
      <span>{{ props.label }}</span>
      <icon class="action" :name="'MoreVert'" :viewBox="'0 -3 24 24'" :width="20" :height="20"></icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(entry, i) in data">
          <el-checkbox :label="entry.label" v-model="entry.checked" @change="$emit('toggle', $event, props.keyName, entry)" />
        </el-dropdown-item>
      </el-dropdown-menu>
      <div class="button">
        <el-button type="primary" :disabled="!props.data.some((d) => d.checked)" text @click="resetAll">Reset</el-button>
      </div>
    </template>
  </el-dropdown>
</template>
<script setup>
import { reactive, watch, ref, onMounted } from "vue";
const props = defineProps(["keyName", "label", "data"]);
const emit = defineEmits(["toggle", "reset"]);

watch(
  () => props.data,
  () => {
    if (!data.value.length) {
      data.value = JSON.parse(JSON.stringify(props.data));
    }
  }
);

let data = ref([]);

function resetAll() {
  data.value.forEach((entry) => {
    entry.checked = false;
  });
  emit("reset", props.keyName);
}
</script>
