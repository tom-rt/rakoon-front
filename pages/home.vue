<template>
  <div>
    <div>Bienvenue {{ userData.name}} ! Ton id est le {{userData.id}}</div>
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