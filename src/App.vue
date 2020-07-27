<template>
  <div id="app">
    <nav-bar-master></nav-bar-master>
    <notifications group="notifications" position="bottom right" />
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import NavBarMaster from "./components/NavBar2.vue";
import BackendService from "./services/BackendService";
export default {
  components: { NavBarMaster, BackendService },
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
  },
  async created() {
    await BackendService.wakeUpBackend();
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
