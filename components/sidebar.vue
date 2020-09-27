<template>
  <div class="bg-gray-700 h-full text-gray-100 w-24 border-r fixed">
    <nuxt-link to="/home">
      <div
        v-on:click="highlight('home')"
        v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isHome }"
        class="flex items-center justify-center text-center h-8 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
      >
        Accueil
      </div>
    </nuxt-link>
    <nuxt-link to="/desktop">
      <div
        v-on:click="highlight('desktop')"
        v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isDesktop }"
        class="flex items-center justify-center text-center h-8 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
      >
        Bureau
      </div>
    </nuxt-link>
    <nuxt-link to="/users">
      <div
        v-if="this.$store.getters.getIsAdmin"
        v-on:click="highlight('users')"
        v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isUsers }"
        class="flex items-center justify-center text-center h-8 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
      >
        Admin
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHome: false,
      isDesktop: false,
      isUsers: false
    };
  },
  beforeMount() {
    this.highlight(this.$router.currentRoute.path.replace("/", ""));
  },
  methods: {
    highlight(tab) {
      if (tab == "home") {
        this.isHome = true;
        this.isDesktop = false;
        this.isUsers = false;
      } else if (tab == "desktop") {
        this.isHome = false;
        this.isDesktop = true;
        this.isUsers = false;
      } else if (tab == "users") {
        this.isHome = false;
        this.isDesktop = false;
        this.isUsers = true;
      }
    }
  }
};
</script>

<style>
</style>