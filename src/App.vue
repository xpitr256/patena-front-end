<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> (
      <a v-on:click="showInEnglish">English</a> -
      <a v-on:click="showInSpanish">Espa&ntilde;ol</a> )
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    showInEnglish: function() {
      this["$i18n"].locale = "en";
    },
    showInSpanish: function() {
      import("@/lang/es.json").then(msgs => {
        this.$i18n.setLocaleMessage("es", msgs.defaults || msgs);
        this.$i18n.locale = "es";
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
