<template>
  <div
    class="flex flex-col fixed w-64 h-auto right-0 bottom-0 mr-4 mb-4 bg-white"
  >
    <div class="flex w-full h-12 bg-gray-700 border items-center px-2">
      <div class="text-gray-100 text-sm">
        {{ this.$store.getters.geCurrentUploadsNumber }} fichier(s) en cours
        d'import
      </div>
      <pulse-loader
        :color="loaderColor"
        :size="loaderSize"
        class="w-10"
      ></pulse-loader>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      loaderColor: "#F7FAFC",
      loaderWidth: "5px",
      loaderSize: "5px",
    };
  },
  methods: {
    async disconnect() {},
  },
  components: {
    PulseLoader,
  },
};
</script>

<style>
</style>
