<template>
  <h1>default {{name}}</h1>
</template>

<script>
export default {
  name: 'test',
  middleware({ redirect }) {
    return redirect('/login')
  }
}
</script>

<style>
</style>