<template>
  <div class="flex flex-col h-full">
    <div
      class="flex items-center pl-4 mt-2 pb-2 h-12 text-2xl border border-l-0 border-t-0 border-r-0"
    >
      <img
        v-on:click="cdHome()"
        class="w-8 mr-4 p-1 rounded border border-white hover:border-gray-300 cursor-pointer"
        src="../assets/icons/home.svg"
      />
      <img
        v-on:click="cdPrevious()"
        class="w-8 mr-4 p-1 rounded border border-white hover:border-gray-300 cursor-pointer"
        src="../assets/icons/back.svg"
      />
      <div>/rakoon{{currentPath}}</div>
    </div>
    <div class="flex flex-row w-full h-full flex-wrap content-start items-center">
      <div
        class="flex flex-col m-4 h-auto w-32 items-center content-start"
        v-for="(fd, idx) in this.directoryContent"
        :key="idx"
      >
        <div
          class="flex flex-col items-center h-auto rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            v-on:click="cd(fd.name)"
            v-if="fd.type == 'directory'"
            class="w-20 cursor-pointer"
            src="../assets/icons/folder.svg"
          />
          <img
            v-if="fd.type == 'file'"
            class="file-custom mt-2 mr-10 ml-10 cursor-pointer"
            src="../assets/icons/document.svg"
          />
          <img
            v-if="fd.type == 'image'"
            class="w-20 cursor-pointer"
            src="../assets/icons/picture.svg"
          />
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
    },
    async cdHome() {
      this.currentPath = "";
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: "" }
      });
      this.directoryContent = ret.data;
    },
    async cdPrevious() {
      const idx = this.currentPath.lastIndexOf("/");
      if (idx == 0) {
        this.cdHome();
      } else {
        this.currentPath = this.currentPath.substring(0, idx);
        const ret = await this.$axios.get(`/list/directory`, {
          params: { path: this.currentPath }
        });
        this.directoryContent = ret.data;
      }
    }
  }
};
</script>

<style>
.file-custom {
  width: 4.5rem;
}
</style>