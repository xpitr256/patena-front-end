<template>
  <div id="app">
    <nav-bar></nav-bar>
    <notifications group="notifications" position="bottom right" />
    <router-view />
    <footer-geo></footer-geo>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterGeo from "./components/FooterGeo.vue";

export default {
  components: { NavBar, FooterGeo },
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

footer {
  text-align: center;
  padding: 3px;
  background-color: rgba(234, 112, 15, 0.50);
  color: white;
}
</style>
