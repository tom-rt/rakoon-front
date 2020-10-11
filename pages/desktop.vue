<template>
  <div class="flex flex-col h-full">
    <div
      v-on:click="importOpen = true"
      class="fixed flex flex-row content-start items-center bg-white w-auto top-0 left-0 border ml-8 mt-32 rounded-full bg-green-400 p-4 cursor-pointer"
    >
      <img class="w-8" src="../assets/icons/add3.png" />
    </div>
    <div
      v-if="importOpen"
      class="fixed flex flex-col content-start items-center bg-white w-64 top-0 left-0 border border-2 border-black ml-16 mt-40 cursor-pointer"
    >
      <div
        class="flex pl-4 bg-gray-700 h-12 content-start items-center text-white font-black"
      >
        <div class="w-full">
          IMPORTER
        </div>
        <div
          v-on:click="importOpen = false"
          class="w-auto px-2 py-1 mr-1 bg-white text-black border cursor hover:bg-gray-300"
        >
          X
        </div>
      </div>
      <div
        class="flex pl-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
      >
        Creer un dossier
      </div>
      <div
        class="flex pl-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
      >
        Importer un fichier
      </div>
    </div>

    <div
      v-if="fileMenuOpen == true"
      class="fixed flex flex-col content-start mt-64 items-center w-64 border border-2 border-black cursor-pointer"
    >
      <div
        class="flex pl-4 h-12 content-start items-center text-white font-black"
        :style="menuPos"
      >
        <div class="w-full">
          {{ fileName }}
        </div>
        <div
          v-on:click="fileMenuOpen = false"
          class="w-auto px-2 py-1 mr-1 bg-white text-black border cursor hover:bg-gray-300"
        >
          X
        </div>
      </div>
      <div
        class="flex pl-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
      >
        Renommer fichier
      </div>
      <div
        class="flex pl-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
      >
        Supprimer fichier
      </div>
    </div>

    <div
      class="fixed flex flex-row content-start items-center bg-white w-full border border-l-0 border-t-0 border-r-0 pl-32"
    >
      <div class="flex pl-4 h-12">
        <img
          v-on:click="cdHome()"
          class="w-8 mr-4 mt-2 mb-2 p-1 rounded border border-white hover:border-gray-300 cursor-pointer"
          src="../assets/icons/home.svg"
        />
        <img
          v-on:click="cdPrevious()"
          class="w-8 mr-4 mt-2 mb-2 p-1 rounded border border-white hover:border-gray-300 cursor-pointer"
          src="../assets/icons/back.svg"
        />
        <div class="flex w-full justify-between">
          <div class="w-auto text-base flex items-center">
            /rakoon{{ currentPath }}
          </div>
          <div class="flex w-48 items-center pr-1">
            <input
              v-model="filter"
              class="shadow border rounded border border-gray-500 w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none"
              type="text"
              placeholder="Filtrer"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-12 pl-32 pr-32 flex flex-row w-full h-full flex-wrap content-start items-center"
    >
      <div
        class="flex flex-col m-4 h-auto w-32 items-center content-start"
        v-for="(fd, idx) in this.filteredContent"
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
            v-on:click="openFileMenu()"
            v-if="fd.type == 'file'"
            class="file-custom mt-2 mr-10 ml-10 cursor-pointer"
            src="../assets/icons/document.svg"
          />
          <img
            v-on:click="openFileMenu()"
            v-if="fd.type == 'image'"
            class="w-20 cursor-pointer"
            src="../assets/icons/picture.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
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
      importOpen: false,
      fileMenuOpen: false,
      fileName: "",
      directoryContent: req.data,
      filteredContent: req.data,
      currentPath: "",
      filter: ""
    };
  },
  data() {
    return {
      xMenu: "#000000"
    };
  },
  middleware: "authenticated",
  computed: {
    menuPos() {
      console.log("menuPos", console.log(this.xMenu));
      return {
        "background-color": this.xMenu
      };
    }
  },
  methods: {
    async cd(target) {
      this.currentPath = `${this.currentPath}/${target}`;
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: this.currentPath }
      });
      this.filter = "";
      this.directoryContent = ret.data;
      this.filteredContent = ret.data;
    },
    async cdHome() {
      this.currentPath = "";
      const ret = await this.$axios.get(`/list/directory`, {
        params: { path: "" }
      });
      this.filter = "";
      this.directoryContent = ret.data;
      this.filteredContent = ret.data;
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
        this.filter = "";
        this.directoryContent = ret.data;
        this.filteredContent = ret.data;
      }
    },
    async openFileMenu(fileName, $event) {
      this.fileMenuOpen = true;
      this.importOpen = false;
      this.fileName = fileName;
      this.xMenu = event.screenX;
    },
    async downloadFile(fileName) {
      const ret = await this.$axios.get(`/file`, {
        params: { path: `${this.currentPath}/${fileName}` },
        responseType: "blob"
      });

      var fileURL = window.URL.createObjectURL(new Blob([ret.data]));
      var fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", fileName);
      document.body.appendChild(fileLink);

      fileLink.click();
    }
  },
  watch: {
    filter: function() {
      this.filteredContent = this.directoryContent.filter(el => {
        return el.name.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }
};
</script>

<style>
.file-custom {
  width: 4.5rem;
}
</style>