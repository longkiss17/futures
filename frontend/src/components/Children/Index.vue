<style scoped></style>
<template>
  <div>
    <div>{{ name }}</div>
    <div><input v-model="name" /></div>
    <button @click="click()">click</button>
    <div>text length : {{ count }}</div>
    <div>computed : {{ filtered }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "children",
      count: 0
    };
  },
  created() {
    this.store.commit("increment");
    this.store.commit("decrement");
  },
  methods: {
    click() {
      alert(this.name);
    }
  },
  computed: {
    filtered() {
      return this.name + "/" + this.name;
    }
  },
  watch: {
    name() {
      this.count++;
    }
  }
};
</script>
