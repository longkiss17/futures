<!-- prettier-ignore -->
<style lang="scss" scoped>
span {
  position: relative; display: inline-block; width: 14px; height: 14px; vertical-align: middle;
  svg {
    position: absolute; left: 0px; top:-5px; color: var(--text-color-thin);
    &:last-child { top: 1px }
    &.active { color: var(--color-active) }
  }
}
</style>
<template>
  <span>
    <svg :class="{ active: props.arrow < 0 ? 'up' : '' }" height="14" width="14" viewBox="5 0 16 16"><path fill="currentColor" d="m6.5 11.792 3.5-3.5 3.5 3.5Z" /></svg>
    <svg :class="{ active: props.arrow > 0 ? 'down' : '' }" height="14" width="14" viewBox="5 0 16 16"><path fill="currentColor" d="m10 11.708-3.5-3.5h7Z" /></svg>
  </span>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["arrow"]);
// console.log(props.arrow, props.arrow === 0 ? "" : props.arrow > 0 ? "up" : "down");

// let arrow = ref(props.arrow === 0 ? "" : props.arrow > 0 ? "up" : "down");
</script>
