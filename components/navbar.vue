<template>
  <div class="navbar border-b bg-gray-700 text-gray-100">
    <div class="text-3xl font-extrabold pl-3">Rakoon</div>
    <button
      v-if="this.$store.state.isConnected"
      v-on:click="disconnect"
      class="mr-1 mt-1 mb-1 pl-1 pr-1 rounded border border-gray-100 hover:bg-gray-100 hover:text-gray-700"
    >Disconnect</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: this.$store.state.isConnected
    };
  },
  methods: {
    async disconnect() {
      await this.$axios.put(`/user/${this.$store.state.userId}/logout`);
      this.$store.commit("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.navbar {
  position: fixed;
  height: 3rem;
  display: flex;
}
</style>