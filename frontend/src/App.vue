<!-- prettier-ignore -->
<style lang="scss" scoped>
</style>
<template>
  <router-view />
</template>
<script setup>
import uxStore from "./stores/ux";

const ux = uxStore();
ux.setTheme();
ux.$subscribe((mutation, state) => {
  for (const [key, value] of Object.entries(mutation.payload ? mutation.payload : {})) {
    localStorage.setItem(key, value);
  }
});
</script>
