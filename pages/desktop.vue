<template>
  <div class="m-4">{{basePath}}</div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/directory`, {
      params: { path: "/" }
    });
    return {
      userData: req.data,
      basePath: "/rakoon"
    };
  },
  middleware: "authenticated",
  methods: {
    async getPath() {
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: "/" }
      });
      this.userData = ret.data;
    }
  }
};
</script>

<style>
</style>