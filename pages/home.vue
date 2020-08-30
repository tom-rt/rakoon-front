<template>
  <div>
    <form @submit.prevent="getUserData">
      <div>Bienvenue {{ userData.name}} ! Ton id est le {{userData.id}}</div>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(
      `/user/${context.store.state.userId}`
    );
    return {
      userData: req.data
    };
  },
  middleware: "authenticated"
};
</script>

<style>
</style>