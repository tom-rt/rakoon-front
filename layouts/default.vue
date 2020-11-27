<template>
  <div class="h-full">
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500&family=Montserrat:wght@200&display=swap"
      rel="stylesheet"
    />
    <topbar />
    <div class="app-container flex flex-row w-full h-full">
      <div class="flex flex-col">
        <nuxt />
      </div>
      <uploadQueue v-if="this.$store.getters.getCurrentUploadsNumber > 0" />
      <toast v-if="this.$store.getters.getToast == true" />
    </div>
  </div>
</template>

<script>
import topbar from "@/components/topbar";
import toast from "@/components/toast";
import uploadQueue from "@/components/uploadQueue";
export default {
  data() {
    return {
      isConnected: this.$store.state.isConnected,
    };
  },

  head() {
    return {
      titleTemplate: "Rakoon",
    };
  },
  components: {
    topbar,
    uploadQueue,
    toast,
  },
};
</script>

<style>
.app-container {
  padding-top: 3rem;
}
</style>