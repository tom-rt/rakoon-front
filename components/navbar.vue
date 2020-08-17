<template>
  <div class="navbar">
    <div class="title font-extrabold">Rakoon</div>
    <button v-if="this.$store.state.isConnected" v-on:click="disconnect">Disconnect</button>
  </div>
</template>

<script>
export default {
  asyncData() {
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
  background-color: var(--onyx);
  color: var(--white);
  height: 3rem;
  display: flex;
  padding-left: 1rem;
}

.title {
  font-size: 2rem;
}
</style>