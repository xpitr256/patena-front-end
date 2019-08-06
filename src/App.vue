<template>
  <div id="app">
    <nav-bar></nav-bar>
    <notifications group="notifications" position="bottom right"/>
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  components: { NavBar }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
  background: linear-gradient(to bottom, #F0F0F0, white);
}
</style>
