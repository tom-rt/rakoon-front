<template>
  <div class="flex flex-col h-auto">
    <div
      v-on:click="openImportMenu"
      class="fixed flex flex-row content-start items-center bg-white w-auto top-0 left-0 border ml-8 mt-32 rounded-full bg-green-400 p-4 cursor-pointer"
    >
      <img class="w-8" src="../assets/icons/add3.png" />
    </div>
    <div
      v-click-outside="clearImportMenu"
      v-if="importOpen"
      class="fixed flex flex-col content-start items-center bg-white w-auto top-0 left-0 border border-2 border-black ml-16 mt-40"
    >
      <div
        class="flex pl-4 bg-gray-700 h-12 content-start items-center text-white font-black"
      >
        <div class="w-full">Importer</div>
        <div
          v-on:click="importOpen = false"
          class="w-auto px-2 py-1 mr-1 bg-white text-black border cursor hover:bg-gray-300 cursor-pointer"
        >
          X
        </div>
      </div>

      <div
        class="flex flex-col bg-white h-auto content-start items-center font-extrabold hover:bg-gray-300"
      >
        <div
          class="flex bg-white h-auto content-start items-center font-extrabold hover:bg-gray-300"
        >
          <div
            class="flex flex-col px-4 py-4 bg-white h-auto content-start font-extrabold hover:bg-gray-300 cursor-pointer"
            v-on:click="createFolderOpen = true"
          >
            Créer un dossier
            <div
              v-if="createFolderOpen"
              class="flex flex-col mt-2 content-start items-center font-extrabold bg-gray-300 border border-gray-500 rounded p-3"
            >
              <div class="px-1">
                <input
                  v-model="newFolderName"
                  v-bind:class="{ 'border-red-500': invalidNewFolderName }"
                  class="flex shadow border rounded text-gray-700 focus:outline-none w-full pl-2"
                  type="text"
                  placeholder="Dossier"
                />
              </div>

              <div class="flex">
                <button
                  v-on:click="createFolder()"
                  class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-black py-2 px-4 mr-1 rounded w-full"
                >
                  Créer
                </button>
                <button
                  v-on:click.stop="
                    createFolderOpen = false;
                    newFolderName = '';
                  "
                  class="bg-red-500 mt-2 hover:bg-red-700 text-white font-black py-2 px-4 ml-1 rounded w-full"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex pl-4 py-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
          v-if="this.$store.getters.getCopiedPath.length > 0"
          v-on:click="pastePath()"
        >
          Coller {{ this.$store.getters.getCopiedPathName }}
        </div>

        <div
          class="flex pl-4 py-4 bg-white h-12 content-start items-center font-extrabold hover:bg-gray-300"
        >
          <div class="flex w-auto mr-3">Fichier:</div>
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
              'cursor-not-allowed': this.files.length === 0,
              'bg-gray-400': this.files.length === 0,
              'hover:bg-gray-400': this.files.length === 0,
              'bg-blue-500': this.files.length != 0,
              'hover:bg-blue-700': this.files.length != 0,
            }"
            class="ml-3 text-white font-black py-2 px-4 mr-1 rounded w-auto"
            :disabled="this.files.length === 0"
          >
            Importer
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="folderMenuOpen"
      v-click-outside="clearFolderMenu"
      class="fixed flex flex-col content-start items-center w-auto h-auto bg-white border border-2 border-black cursor-pointer"
      v-bind:style="{ top: top + 'px', left: left + 'px' }"
    >
      <div
        class="flex pl-4 h-12 content-start items-center text-white font-black bg-gray-700"
      >
        <div class="w-full mr-4">
          {{ folderName }}
        </div>
        <div
          v-on:click="clearFolderMenu()"
          class="w-auto px-2 py-1 mr-1 bg-white text-black border cursor hover:bg-gray-300"
        >
          X
        </div>
      </div>
      <div
        class="flex flex-col px-4 py-4 bg-white w-full h-auto content-start font-extrabold hover:bg-gray-300"
        v-on:click="folderRenameOpen = true"
      >
        Renommer
        <div
          v-if="folderRenameOpen"
          class="flex flex-col mt-2 content-start items-center font-extrabold bg-gray-300 border border-gray-500 rounded p-3"
        >
          <div class="px-1">
            <input
              v-model="folderRename"
              v-bind:class="{ 'border-red-500': invalidFolderRename }"
              class="flex shadow border rounded text-gray-700 focus:outline-none w-full pl-2"
              type="text"
              placeholder="Dossier"
            />
          </div>

          <div class="flex">
            <button
              v-on:click.stop="renamePath('folder')"
              class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-black py-2 px-4 mr-1 rounded w-full"
            >
              Renommer
            </button>
            <button
              v-on:click.stop="
                folderRenameOpen = false;
                invalidFolderRename = false;
                folderRename = '';
              "
              class="bg-red-500 mt-2 hover:bg-red-700 text-white font-black py-2 px-4 ml-1 rounded w-full"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex px-4 py-4 bg-white h-auto w-full content-start items-center font-extrabold hover:bg-gray-300"
        v-on:click.stop="deletePath('folder')"
      >
        Supprimer
      </div>
      <div
        class="flex px-4 py-4 bg-white h-auto w-full content-start items-center font-extrabold hover:bg-gray-300"
        v-on:click.stop="copyPath(folderName)"
      >
        Copier
      </div>
    </div>

    <div
      v-if="fileMenuOpen"
      v-click-outside="clearFileMenu"
      class="fixed flex flex-col content-start items-center w-auto bg-white border border-2 border-black cursor-pointer"
      v-bind:style="{ top: top + 'px', left: left + 'px' }"
    >
      <div
        class="flex pl-4 h-12 content-start items-center text-white font-black bg-gray-700"
      >
        <div class="w-full mr-4">
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
        v-on:click="downloadFileStream()"
        class="flex px-4 bg-white h-12 w-full content-start items-center font-extrabold hover:bg-gray-300"
      >
        Télécharger
      </div>
      <div
        v-on:click="copyPath(fileName)"
        class="flex px-4 bg-white h-12 w-full content-start items-center font-extrabold hover:bg-gray-300"
      >
        Copier
      </div>
      <div
        class="flex flex-col px-4 py-4 bg-white w-full h-auto content-start font-extrabold hover:bg-gray-300"
        v-on:click="fileRenameOpen = true"
      >
        Renommer
        <div
          v-if="fileRenameOpen"
          class="flex flex-col mt-2 content-start items-center font-extrabold bg-gray-300 border border-gray-500 rounded p-3"
        >
          <div class="px-1">
            <input
              v-model="fileRename"
              v-bind:class="{ 'border-red-500': invalidFileRename }"
              class="flex shadow border rounded text-gray-700 focus:outline-none w-full pl-2"
              type="text"
              placeholder="Fichier"
            />
          </div>

          <div class="flex">
            <button
              v-on:click.stop="renamePath('file')"
              class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-black py-2 px-4 mr-1 rounded w-full"
            >
              Renommer
            </button>
            <button
              v-on:click.stop="
                fileRenameOpen = false;
                invalidFileRename = false;
                fileRename = '';
              "
              class="bg-red-500 mt-2 hover:bg-red-700 text-white font-black py-2 px-4 ml-1 rounded w-full"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex px-4 bg-white h-12 w-full content-start items-center font-extrabold hover:bg-gray-300"
        v-on:click.stop="deletePath('file')"
      >
        Supprimer
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
      class="mt-12 mb-32 px-32 flex flex-row w-full h-full flex-wrap content-start items-center"
    >
      <div
        class="flex flex-col m-4 h-auto w-32 items-center content-start"
        v-for="(fd, idx) in this.filteredContent"
        :key="idx"
      >
        <div
          v-if="fd.type == 'directory'"
          @contextmenu.prevent="openFolderMenu(fd.name)"
          v-on:click="cd(fd.name)"
          class="flex flex-col items-center cursor-pointer h-auto w-40 rounded border-solid border border-white hover:border-gray-300"
        >
          <img class="w-20" src="../assets/icons/folder.svg" />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>
        <div
          v-if="fd.type == 'file'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/document.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>

        <div
          v-if="fd.type == 'torrent'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/torrent.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>

        <div
          v-if="fd.type == 'archive'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/archive.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>

        <div
          v-if="fd.type == 'pdf'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/pdf.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>

        <div
          v-if="fd.type == 'video'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img
            class="file-custom mt-2 mr-10 ml-10"
            src="../assets/icons/video.svg"
          />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>

        <div
          v-if="fd.type == 'image'"
          @contextmenu.prevent="openFileMenu(fd.name)"
          v-on:dblclick="downloadFileStream(fd.name)"
          class="flex flex-col items-center h-auto w-40 cursor-pointer rounded border-solid border border-white hover:border-gray-300"
        >
          <img class="w-20" src="../assets/icons/picture.svg" />
          <div class="text-black text-center h-auto mx-6">
            {{ fd.trimmedName }}
          </div>
        </div>
      </div>
      <div
        v-for="(fileName, idx) in this.uploadingFiles"
        :key="idx + 'upload'"
        class="flex flex-col justify-end items-center w-40 h-6r rounded border-solid border border-white hover:border-gray-300 m-4"
      >
        <scale-loader :color="loaderColor" class="w-auto"></scale-loader>
        <div class="text-black text-center h-auto mx-6 mt-3">
          {{ fileName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/directory`, {
      params: { path: "/" },
    });
    return {
      fileMenuOpen: false,
      fileRenameOpen: false,
      invalidFileRename: false,
      fileRename: "",

      folderMenuOpen: false,
      folderRenameOpen: false,
      invalidFolderRename: false,
      folderRename: "",

      importOpen: false,
      createFolderOpen: false,
      invalidNewFolderName: false,
      newFolderName: "",

      fileName: "",
      folderName: "",

      directoryContent: req.data || [],
      filteredContent: req.data || [],
      currentPath: "",
      filter: "",

      top: 0,
      left: 0,

      files: [],

      loaderColor: "#4A5568",
      uploadingFiles: [],
    };
  },
  components: {
    ScaleLoader,
  },
  middleware: "authenticated",
  methods: {
    async handleFileUpload() {
      this.files = this.$refs.file.files;
    },
    async submitFile() {
      let formData;
      let uploadingFileName;
      let requests = [];
      this.importOpen = false;
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].name.length > 15) {
          uploadingFileName = this.files[i].name.substring(0, 13) + "...";
        } else {
          uploadingFileName = this.files[i].name;
        }
        this.$store.commit("addToUploadQueue", {
          path: this.currentPath,
          fileName: uploadingFileName,
        });
        formData = new FormData();
        formData.append("file", this.files[i]);
        formData.append("path", this.currentPath);
        requests.push(
          this.$axios.post("/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );
      }
      this.clearImportMenu();
      this.uploadingFiles =
        this.$store.getters.getUploadQueue[this.currentPath] || [];
      const resps = await Promise.all(requests);
      this.$store.commit("clearUploadQueue", {
        path: this.currentPath,
        uploads: resps,
      });
      await this.refreshDirectoryContent(this.currentPath);
    },
    async refreshDirectoryContent(path) {
      const ret =
        (await this.$axios.get(`/list/directory`, {
          params: { path: path },
        })) || {};
      this.filter = "";
      this.directoryContent = ret.data || [];
      this.filteredContent = ret.data || [];
      this.uploadingFiles = this.$store.getters.getUploadQueue[path] || [];
      // this.uploadingFiles =
      //   this.$store.getters.getUploadQueue[this.currentPath] || [];
    },
    async cd(target) {
      const ret = await this.refreshDirectoryContent(
        `${this.currentPath}/${target}`
      );
      this.currentPath = `${this.currentPath}/${target}`;
    },
    async cdHome() {
      this.currentPath = "";
      await this.refreshDirectoryContent("");
    },
    async cdPrevious() {
      const idx = this.currentPath.lastIndexOf("/");
      if (idx == 0) {
        this.cdHome();
      } else {
        this.currentPath = this.currentPath.substring(0, idx);
        await this.refreshDirectoryContent(this.currentPath);
      }
    },
    async openImportMenu() {
      this.importOpen = true;
      this.fileMenuOpen = false;
      this.clearFileMenu();
      this.clearFolderMenu();
    },
    async openFolderMenu(folderName, $event) {
      this.folderMenuOpen = true;
      this.importOpen = false;
      this.fileMenuOpen = false;
      this.folderRenameOpen = false;
      this.folderRename = "";
      this.invalidFolderRename = false;
      this.folderName = folderName;
      this.top = event.clientY;
      this.left = event.clientX;
    },
    async openFileMenu(fileName, $event) {
      this.folderMenuOpen = false;
      this.fileMenuOpen = true;
      this.importOpen = false;
      this.invalidNewFolderName = false;
      this.newFolderName = "";
      this.fileName = fileName;
      this.top = event.clientY;
      this.left = event.clientX;
    },
    async downloadFileBlob(fileName = null) {
      if (!fileName) {
        fileName = this.fileName;
      }

      const ret = await this.$axios.get(`/file`, {
        params: { path: `${this.currentPath}/${fileName}` },
        responseType: "blob",
      });

      var fileURL = window.URL.createObjectURL(new Blob([ret.data]));
      var fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", fileName);
      document.body.appendChild(fileLink);

      fileLink.click();
      this.fileMenuOpen = false;
    },
    async downloadFileStream(fileName = null) {
      this.fileMenuOpen = false;
      this.$store.commit("showToast");
      if (!fileName) {
        fileName = this.fileName;
      }

      const refresh = await this.$axios.post("/refresh/token");
      const token = refresh.data.token;

      var url = new URL("https://api.rakoon.tech:443/v1/file");
      // var url = new URL("http://localhost:8081/v1/file");

      var params = { path: `${this.currentPath}/${fileName}` };

      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      });

      this.streamSave(fileName, response);
    },
    async createFolder() {
      if (this.newFolderName.length == 0) {
        this.invalidNewFolderName = true;
      } else {
        this.invalidNewFolderName = false;
        const ret = await this.$axios.post(`/folder`, {
          name: `${this.newFolderName}`,
          path: `${this.currentPath}/${this.newFolderName}`,
        });
        const reload = await this.$axios.get(`/list/directory`, {
          params: { path: this.currentPath },
        });
        this.directoryContent = reload.data;
        this.filteredContent = reload.data;
        this.importOpen = false;
        this.clearFolderCreation();
      }
    },
    async copyPath(name) {
      this.$store.commit("setCopiedPathName", name);
      this.$store.commit("setCopiedPath", `${this.currentPath}/${name}`);
      this.clearFolderMenu();
      this.clearFileMenu();
    },
    async pastePath() {
      this.clearImportMenu();
      const ret = await this.$axios.put(`/copy/path`, {
        sourceName: this.$store.getters.getCopiedPathName,
        sourcePath: this.$store.getters.getCopiedPath,
        targetPath: this.currentPath,
      });
      this.refreshDirectoryContent(this.currentPath);
    },
    async renamePath(type) {
      let newName;
      let originalName;

      if (type == "file") {
        newName = this.fileRename;
        originalName = this.fileName;
      } else if (type == "folder") {
        newName = this.folderRename;
        originalName = this.folderName;
      }

      if (newName.length == 0) {
        this.invalidFolderRename = true;
      } else {
        this.invalidFolderRename = false;
        const ret = await this.$axios.put(`/path`, {
          name: `${newName}`,
          originalPath: `${this.currentPath}/${originalName}`,
          newPath: `${this.currentPath}/${newName}`,
        });
        const reload = await this.$axios.get(`/list/directory`, {
          params: { path: this.currentPath },
        });
        this.directoryContent = reload.data;
        this.filteredContent = reload.data;
        this.clearFolderMenu();
        this.clearFileMenu();
      }
    },
    async deletePath(type) {
      let name;

      if (type == "file") {
        name = this.fileName;
      } else if (type == "folder") {
        name = this.folderName;
      }

      if (name.length == 0) {
        this.invalidFolderRename = true;
      } else {
        this.invalidFolderRename = false;
        const payload = { path: `${this.currentPath}/${name}` };
        const ret = await this.$axios.put(`/delete/path`, {
          path: `${this.currentPath}/${name}`,
        });
        const reload = await this.$axios.get(`/list/directory`, {
          params: { path: this.currentPath },
        });
        this.directoryContent = reload.data;
        this.filteredContent = reload.data;
        this.clearFolderMenu();
        this.clearFileMenu();
      }
    },

    async openFolderCreation() {
      this.createFolderOpen = true;
    },
    async clearImportMenu() {
      this.clearFolderCreation();
      this.importOpen = false;
      this.files = [];
    },
    async clearFileMenu() {
      this.fileMenuOpen = false;
      this.fileRenameOpen = false;
      this.fileRename = "";
    },
    async clearFolderMenu() {
      this.folderMenuOpen = false;
      this.folderRenameOpen = false;
      this.folderRename = "";
    },
    async clearFolderCreation() {
      this.newFolderName = "";
      this.createFolderOpen = false;
    },
  },
  watch: {
    filter: function () {
      this.filteredContent = this.directoryContent.filter((el) => {
        return el.name.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
  },
};
</script>

<style>
.file-custom {
  width: 4.5rem;
}

.w-7r {
  width: 7rem;
}

.h-6r {
  height: 6.5rem;
}
</style>
