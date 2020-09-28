<template>
  <div>
    {{ users }}
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/users`, {});
    return {
      users: req.data
    };
  },
  middleware: "adminAuthenticated",
  methods: {}
};
</script>

<style></style>