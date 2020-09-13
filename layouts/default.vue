<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500&family=Montserrat:wght@200&display=swap"
      rel="stylesheet"
    />
    <navbar />
    <div class="app-container flex flex-row w-full h-full">
      <sidebar v-if="this.$store.state.isConnected" />
      <div class="pl-24 flex flex-col">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import sidebar from "@/components/sidebar";
export default {
  data() {
    return {
      isConnected: this.$store.state.isConnected
    };
  },
  components: {
    navbar,
    sidebar
  }
};
</script>

<style>
.app-container {
  padding-top: 3rem;
}
</style>