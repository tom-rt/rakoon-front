<template>
  <div>DESKTOP</div>
</template>

<script>
export default {
  data() {
    return {
      basePath: "/home/thomas/rakoon"
    };
  },
  middleware: "authenticated",
  methods: {
    async getPath() {
      const ret = await this.$axios.get(`/list/directory`);
      this.userData = ret.data;
    }
  }
};
</script>

<style>
</style>