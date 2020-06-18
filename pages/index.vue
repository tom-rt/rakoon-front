<template>
  <h1> default {{name}}</h1>
</template>

<script>

export default {
    name: "test",
    middleware ({ redirect }) {
        return redirect('/login')
        // If the user is not authenticated
        // if (!store.state.authenticated) {
        //   return redirect('/login')
        // }
  }
}

</script>

<style>
</style>