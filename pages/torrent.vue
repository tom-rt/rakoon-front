<template>
  <div class="flex justify-center">
    <div
      class="p-4 flex flex-col w-full h-full flex-wrap content-start items-center"
    >
      <div class="text-2xl font-extrabold">Torrent</div>
      <div class="flex">
        <div class="flex w-auto mr-3">
          Importer des fichiers:
        </div>
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
          multiple
        />
        <button
          v-on:click="submitFile()"
          v-bind:class="{
            'cursor-not-allowed': !this.files.length,
            'bg-gray-400': !this.files.length,
            'hover:bg-gray-400': !this.files.length,
            'bg-blue-500': this.files.length != 0,
            'hover:bg-blue-700': this.files.length != 0
          }"
          class="ml-3 text-white font-black py-2 px-4 mr-1 rounded w-auto"
          :disabled="this.files.length === 0"
        >
          Importer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(
      `/user/${context.store.state.userId}`
    );
    return {
      userData: req.data,
      files: []
    };
  },
  middleware: "authenticated",
  methods: {
    async handleFileUpload() {
      this.files = this.$refs.file.files;
    },
    async submitFile() {
      let formData;
      for (let i = 0; i < this.files.length; i++) {
        formData = new FormData();
        formData.append("file", this.files[i]);
        formData.append("path", this.currentPath);
        const ret = await this.$axios.post("/torrent", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
    }
  }
};
</script>

<style>
</style>