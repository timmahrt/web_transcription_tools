<template>
  <div id="app">
    <TextgridProcessor/>
  </div>
</template>

<script>
import TextgridProcessor from './components/TextgridProcessor.vue'

export default {
  name: 'App',
  components: {
    TextgridProcessor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
