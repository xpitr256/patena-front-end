<template>
  <div id="app">
    <nav-bar-master></nav-bar-master>
    <!--    <navigation-mobile />
        <div class="content" :class="{'open':showNav}">
          <div class="top-bar">
            <div id="navigation-icon" v-if="mobileView"
                 @click="showNav = !showNav">
              <i class="fas fa-bars"></i>
            </div>
            <nav-bar-master v-if="!mobileView" />
          </div>
        </div>-->
        <notifications group="notifications" position="bottom right" />
        <router-view />
        <vue-progress-bar></vue-progress-bar>
      </div>
    </template>

    <script>

    import NavigationMobile from "./components/NavigationMobile.vue";
    import NavBarMaster from "./components/NavBar2.vue";
    export default {
      components: { NavBarMaster, NavigationMobile },
      data: () => {
        return {
          mobileView: true,
          showNav: false
        };
      }, methods: {
        handleView() {
          this.mobileView = window.innerWidth <= 990;
        }
      },
      created() {
        this.handleView();
        window.addEventListener('resize', this.handleView);
      },
      mounted() {
        if (localStorage.lang) {
          this["$i18n"].locale  = localStorage.lang;
        }
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
