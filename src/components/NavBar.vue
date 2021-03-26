<template>
  <div id="header" class="header-fixed">
    <div class="container">
      <div class="logo">
        <router-link to="/"><img src="./../assets/logo.png" alt="Patena"/></router-link>
      </div>

      <nav role="navigation">
        <input type="checkbox" id="check" />
        <label for="check" class="checkbtn" v-on:click="actionMenu">
          <i
            class="fa fa-bars "
            style="color:black;
                          right: 20px;
                          font-size: 2.1rem;
                          top: 10px;"
          ></i>
        </label>
        <ul>
          <li v-on:click="refreshMenu">
            <router-link to="/about" v-bind:class="getClass('/about')">
              {{ $t("views.components.navBar.menu.about") }}
            </router-link>
          </li>
          <li v-on:click="refreshMenu">
            <router-link to="/design" v-bind:class="getClass('/design')">
              {{ $t("views.components.navBar.menu.design") }}
            </router-link>
          </li>
          <li v-on:click="refreshMenu">
            <router-link to="/results" v-bind:class="getClass('/results')">
              {{ $t("views.components.navBar.menu.results") }}
            </router-link>
          </li>
          <li v-on:click="refreshMenu">
            <router-link to="/contact" v-bind:class="getClass('/contact')">
              {{ $t("views.components.navBar.menu.contact") }}
            </router-link>
          </li>
        </ul>

        <div class="navBarClass">
          <i
            v-if="isEnglish()"
            v-on:click="showInSpanish"
            title="Mostrar en Español"
            class="flag-icon flag-icon-es "
            style="  position: relative;
                          right: 20px;
                          top: 10px;
                          font-size: 1.6rem;
                          color: #aaa;
                          margin:10px;
                          cursor: pointer;"
          ></i>
          <i
            v-if="!isEnglish()"
            v-on:click="showInEnglish"
            title="Show in English"
            class="flag-icon flag-icon-gb "
            style="  position: relative;
                          right: 20px;
                          top: 10px;
                          font-size: 1.6rem;
                          color: #aaa;
                          margin:10px;
                          cursor: pointer;"
          ></i>
        </div>
      </nav>
    </div>
    <section></section>
  </div>
</template>

<script>
import "flag-icon-css/css/flag-icon.css";

export default {
  name: "NavBar",
  data: function() {
    return {
      isShowMenu: false
    };
  },
  methods: {
    getClass(property) {
      return property === this.$route.path ? "active" : "";
    },
    showInEnglish: function() {
      this["$i18n"].locale = "en";
      localStorage.lang = "en";
    },
    showInSpanish: function() {
      import("@/lang/es.json").then(msgs => {
        this.$i18n.setLocaleMessage("es", msgs.defaults || msgs);
        this.$i18n.locale = "es";
      });
      localStorage.lang = "es";
    },
    refreshMenu: function() {
      if (this.isShowMenu) {
        location.reload();
      }
    },
    actionMenu: function() {
      this.isShowMenu = true;
    },
    isEnglish: function() {
      return this["$i18n"].locale == "en";
    }
  }
};
</script>
<style scoped>
#header {
  position: relative;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
  margin-bottom: 25px;
  height: 67px !important;
}
#header.header-fixed {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
}
#header .logo {
  padding: 20px 0;
  float: left;
  margin-right: 50px;
  top: -20px;
  position: absolute;
  z-index: 999;
}
#header .logo img {
  height: 67px;
  transition: all;
  transition-duration: 0.4s;
  transition: all 0.4s !important;
}
#header .logo.scroll img {
  transform: scale(0.85);
}
#header nav .last {
  border-right: 1px solid #eee;
}

@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
nav {
  display: flex;
  position: relative;
  float: right;
}
label.logo {
  height: 67px;
  transition: all;
  transition-duration: 0.4s;
  transition: all 0.4s !important;
}
nav ul {
  float: right;
  margin-right: 60px;
}
nav ul li {
  display: inline-block;
  line-height: 30px;
  border-left: 1px solid #eee;
}
nav ul li a {
  font-family: "BebasBook", "Roboto", Helvetica, sans-serif !important;
  letter-spacing: 1px !important;
  text-decoration: none;
  display: grid;
  padding: 21px 20px 13px 20px;
  font-size: 21px;
  color: #333333;
  transition: all;
  transition-duration: 0.4s;
  font-weight: 400;
  text-transform: uppercase;
  border-bottom: 3px solid #fff;
  letter-spacing: 0px;
}

.active {
  background-color: #f7f7f7;
  color: #333333;
  border-bottom: 3px solid #f7f7f7 !important;
}
a:hover,
a.active {
  background-color: #f7f7f7;
  color: #333333;
  border-bottom: 3px solid rgb(243, 112, 33);
}
.checkbtn {
  font-size: 30px;
  color: white;
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}

#check {
  display: none;
}
.navBarClass {
  position: relative;
  max-width: 200px;
  right: -20px;
}
.navBarClass i {
  position: relative;
  right: 20px;
  top: 15px;
  font-size: 1.6rem;
  color: #aaa;
  margin: 10px;
  cursor: pointer;
}

@media (max-width: 1200px) {
  #header .logo img {
    height: 67px;
    transition: all;
    transition-duration: 0.4s;
    transition: all 0.4s !important;
  }
  .checkbtn {
    display: block;
    margin-right: 15px;
  }
  ul {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #f7f7f7;
    top: 67px;
    left: -100%;
    text-align: center;
    transition: all 0.5s;
  }
  nav ul li {
    display: block;
    margin: 20px 0;
    line-height: 30px;
  }
  nav ul li a {
    font-family: "BebasBook", "Roboto", Helvetica, sans-serif !important;
    text-decoration: none;
    display: block;
    font-size: 21px;
    color: #333333;
    transition: all;
    transition-duration: 0.4s;
    font-weight: 300;
    text-transform: uppercase;
    border-bottom: none !important;
    letter-spacing: 0px;
  }

  nav ul li:hover {
    background-color: #f2f2f2;
    color: #000000;
  }
  a:hover,
  a.active {
    background-color: #f2f2f2;
    color: #000000;
    border-bottom: none !important;
  }

  #check:checked ~ ul {
    left: 0;
  }
  #header nav .last {
    border-right: none;
  }
}
@media (max-width: 400px) {
  #header .logo img {
    height: 60px;
    transition: all;
    transition-duration: 0.4s;
    transition: all 0.4s !important;
  }
  nav ul li:hover {
    background-color: #f2f2f2;
    color: #000000;
  }
  nav ul li {
    display: block;
    margin: 10px 0;
    line-height: 30px;
  }
  nav ul li a {
    font-family: "BebasBook", "Roboto", Helvetica, sans-serif !important;
    letter-spacing: 1px !important;
    text-decoration: none;
    display: block;
    padding: 10px 20px 10px 20px;
    font-size: 21px;
    color: #333333;
    transition: all;
    transition-duration: 0.4s;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0px;
  }

  .checkbtn {
    font-size: 24px;
    display: block;
    margin-right: 10px;
  }
  #check:checked ~ ul {
    left: 0;
  }
}
section {
  display: none;
  background-size: cover;
  height: calc(120vh - 80px);
}
</style>
