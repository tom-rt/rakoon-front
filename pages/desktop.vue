<template>
  <div class="flex flex-col h-full">
    <div class="flex p-4 h-16">{{basePath}}</div>
    <div class="flex flex-row w-full p-4 flex-wrap content-start">
      <div
        class="flex flex-col m-4 h-auto w-32 items-center content-start cursor-pointer"
        v-for="dir in this.directoryContent.directories"
        v-bind:key="dir"
      >
        <div class="flex flex-col items-center h-auto rounded border-solid border">
          <img class="w-20" src="../assets/icons/folder.svg" />
          <div class="text-black text-center h-auto mx-6">{{dir}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/directory`, {
      params: { path: "/" }
    });
    return {
      directoryContent: req.data,
      basePath: "/rakoon"
    };
  },
  middleware: "authenticated",
  methods: {
    async getPath() {
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: "/" }
      });
      this.directoryContent = ret.data;
    }
  }
};
</script>

<style>
</style>