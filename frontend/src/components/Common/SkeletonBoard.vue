<!-- prettier-ignore -->
<style lang="scss" scoped>
</style>
<template>
  <skeleton :count="10" :style="{ margin: '9px 0 9px 0' }"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton>
  <br />
  <skeleton :count="1" :style="{ width: '100px' }"></skeleton>
  <skeleton :count="1" :style="{ width: '300px', margin: '0 10px' }"></skeleton>
  <skeleton :count="1" :style="{ width: '80px', margin: '0 10px' }"></skeleton>
  <skeleton :count="1" :style="{ width: '70px', float: 'right' }"></skeleton>
</template>
<script setup></script>
