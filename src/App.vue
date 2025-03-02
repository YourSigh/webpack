<template>
  <div id="app">
    <h1>Hello Vue 2!</h1>
    <Test />
  </div>
</template>

<script>
import Test from './views/Test.vue'

export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>