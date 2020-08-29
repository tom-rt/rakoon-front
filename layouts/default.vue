<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500&family=Montserrat:wght@200&display=swap"
      rel="stylesheet"
    />
    <navbar />
    <div class="app-container flex flex-row">
      <sidebar />
      <nuxt />
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import sidebar from "@/components/sidebar";
export default {
  components: {
    navbar,
    sidebar
  }
};
</script>

<style>
.app-container {
  padding-top: 3.5rem;
  width: 100%;
}
</style>