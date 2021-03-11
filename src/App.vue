<template>
  <a-layout>
    <Header style="position: fixed; width: 100%; z-index: 200"/>
    <a-layout-content style="margin: 1em; margin-top: calc(64px + 1em);">
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    Header
 }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
}
</style>
