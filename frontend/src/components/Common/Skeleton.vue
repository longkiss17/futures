<!-- prettier-ignore -->
<style lang="scss" scoped>
.skeleton-box {
  display: inline-block; width:100%; height: 30px; position: relative; overflow: hidden; background-color: var(--bg-color-sub); border-radius: 5px;
  &::after {
    position: absolute; top: 0; right: 0; bottom: 0; left: 0; transform: translateX(-100%); 
    background-image: linear-gradient(90deg, rgba(var(--default-color), 0) 0, rgba(var(--default-color), 0.01) 20%, rgba(var(--default-color), 0.05) 60%, rgba(var(--default-color), 0));
    animation: shimmer 1.5s infinite; content: '';
  }

  @keyframes shimmer { 100% { transform: translateX(100%)}}
}
</style>
<template>
  <template v-for="i in count">
    <div class="skeleton-box" :style="props.style"></div>
    <slot></slot>
  </template>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["count", "style", "margin"]);
let count = props.count ? props.count : 1;
</script>
