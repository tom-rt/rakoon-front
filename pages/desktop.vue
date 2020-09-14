<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center p-4 h-16 text-4xl">{{basePath}}</div>
    <div class="flex flex-row w-full h-full flex-wrap content-start items-center">
      <div
        class="flex flex-col m-4 h-auto w-32 items-center content-start cursor-pointer"
        v-for="(fd, idx) in this.directoryContent"
        :key="idx"
      >
        <div
          class="flex flex-col items-center h-auto rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            v-on:click="cd(fd.name)"
            v-if="fd.type == 'directory'"
            class="w-20"
            src="../assets/icons/folder.svg"
          />
          <img
            v-if="fd.type == 'file'"
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/document.svg"
          />
          <img v-if="fd.type == 'image'" class="w-20" src="../assets/icons/picture.svg" />
          <div class="text-black text-center h-auto mx-6">{{fd.trimmedName}}</div>
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
      basePath: "/rakoon",
      currentPath: ""
    };
  },
  middleware: "authenticated",
  methods: {
    async cd(target) {
      this.currentPath = `${this.currentPath}/${target}`;
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: this.currentPath }
      });
      this.directoryContent = ret.data;
    }
  }
};
</script>

<style>
.file-custom {
  width: 4.5rem;
}
</style>