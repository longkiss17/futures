<!-- prettier-ignore -->
<style lang="scss" scoped>
  span{display: inline-block; vertical-align: middle; color: inherit;}
  svg{width: 100%; height: 100%; display: inline-block;}
</style>
<template>
  <span :style="{ width: width ? width + 'px' : '', height: height ? height + 'px' : '' }">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="icons[props.name].viewBox">
      <path fill="currentColor" :d="icons[props.name] ? icons[props.name].d : icons['Default'].d" />
    </svg>
  </span>
</template>
<script setup>
import { ref } from "vue";
import icons from "./ICon.json";
const props = defineProps(["name", "width", "height", "viewBox"]);
let width = ref(props.width ? props.width : 20);
let height = ref(props.height ? props.height : 20);
</script>
