<template>
  <div id="app">
    <div id="content-wrap">
      <nav-bar></nav-bar>
      <notifications group="notifications" position="bottom right" />
      <router-view />
      <vue-progress-bar></vue-progress-bar>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { NavBar, Footer },
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
  position: relative;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
  background: linear-gradient(to bottom, #f0f0f0, white);
}
</style>
