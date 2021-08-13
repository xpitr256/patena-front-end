<template>
  <div id="app">
    <nav-bar></nav-bar>
    <notifications group="notifications" position="bottom right" />
    <router-view />
    <custom-footer></custom-footer>
    <vue-progress-bar></vue-progress-bar>

  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CustomFooter from "./components/CustomFooter";
export default {
  components: {CustomFooter, NavBar },
  mounted() {
    if (localStorage.lang) {
      this["$i18n"].locale = localStorage.lang;
    }
  },
  data() {
    return {
      data: "",
      error: undefined
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
  background: linear-gradient(to bottom, #f0f0f0, white);
}
</style>
