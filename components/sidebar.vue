<template>
  <div class="sidebar bg-gray-700 text-gray-100 w-24 border-r">
    <nuxt-link to="/home">
      <div
        v-on:click="highlight('home')"
        v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isHome}"
        class="flex items-center justify-center text-center h-8 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
      >Accueil</div>
    </nuxt-link>
    <nuxt-link to="/desktop">
      <div
        v-on:click="highlight('desktop')"
        v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isDesktop}"
        class="flex items-center justify-center text-center h-8 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
      >Bureau</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHome: false,
      isDesktop: false
    };
  },
  beforeMount() {
    this.highlight(this.$router.currentRoute.path.replace("/", ""));
  },
  methods: {
    highlight(tab) {
      if (tab == "desktop") {
        this.isDesktop = true;
        this.isHome = false;
      } else {
        this.isHome = true;
        this.isDesktop = false;
      }
    }
  }
};
</script>

<style>
</style>