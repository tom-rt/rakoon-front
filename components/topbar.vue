<template>
  <div class="topbar border-b bg-gray-700 text-gray-100">
    <div class="flex flex-row content-between w-full">
      <div class="flex justify-start content-center">
        <div class="text-3xl font-extrabold pl-3 w-auto mr-4">Rakoon</div>
        <nuxt-link to="/home">
          <div
            v-if="this.$store.state.isConnected"
            v-on:click="highlight('home')"
            v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isHome }"
            class="flex items-center justify-center h-full pl-2 pr-2 text-center cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
          >
            Accueil
          </div>
        </nuxt-link>
        <nuxt-link to="/desktop">
          <div
            v-if="this.$store.state.isConnected"
            v-on:click="highlight('desktop')"
            v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isDesktop }"
            class="flex items-center justify-center h-full pl-2 pr-2 text-center cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
          >
            Bureau
          </div>
        </nuxt-link>
        <!-- <nuxt-link to="/torrent">
          <div
            v-if="this.$store.state.isConnected"
            v-on:click="highlight('torrent')"
            v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isTorrent }"
            class="flex items-center justify-center h-full pl-2 pr-2 text-center cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
          >
            Torrent
          </div>
        </nuxt-link> -->
        <nuxt-link to="/admin">
          <div
            v-if="
              this.$store.state.isConnected && this.$store.getters.getIsAdmin
            "
            v-on:click="highlight('admin')"
            v-bind:class="{ 'bg-gray-100 text-gray-700 border-r': isAdmin }"
            class="flex items-center justify-center h-full pl-2 pr-2 text-center cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:border-r"
          >
            Admin
          </div>
        </nuxt-link>
      </div>
      <button
        v-if="this.$store.state.isConnected"
        v-on:click="disconnect"
        class="mr-1 mt-1 mb-1 pl-1 pr-1 rounded border border-gray-100 hover:bg-gray-100 hover:text-gray-700"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHome: false,
      isDesktop: false,
      isAdmin: false,
      isTorrent: false,
      isConnected: this.$store.state.isConnected
    };
  },
  beforeMount() {
    console.log(this.$router.currentRoute.path.replace("/", ""));
    this.highlight(this.$router.currentRoute.path.replace("/", ""));
  },
  methods: {
    async disconnect() {
      await this.$axios.put(`/user/${this.$store.state.userId}/logout`);
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    highlight(tab) {
      console.log("tab", tab);
      if (tab == "home") {
        this.isHome = true;
        this.isDesktop = this.isAdmin = this.isTorrent = false;
      } else if (tab == "desktop") {
        this.isDesktop = true;
        this.isHome = this.isAdmin = this.isTorrent = false;
      } else if (tab == "admin") {
        this.isAdmin = true;
        this.isHome = this.isDesktop = this.isTorrent = false;
      } else if (tab == "torrent") {
        this.isTorrent = true;
        this.isHome = this.isDesktop = this.isAdmin = false;
      }
    }
  }
};
</script>

<style>
.topbar {
  position: fixed;
  height: 3rem;
  display: flex;
}
</style>
