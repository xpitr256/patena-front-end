<template>
  <div id="header" class="header-fixed">
    <div class="container">
      <div class="logo">
        <a>
          <router-link to="/"
            ><img src="./../assets/logo.png" alt="Patena"
          /></router-link>
        </a>
      </div>
      <div class="site-nav">
        <ul>
          <li>
            <router-link to="/about" v-bind:class="getClass('/about')">{{
              $t("views.components.navBar.menu.about")
            }}</router-link>
          </li>
          <li>
            <router-link to="/analyze" v-bind:class="getClass('/analyze')">{{
              $t("views.components.navBar.menu.analyze")
            }}</router-link>
          </li>
          <li>
            <router-link to="/design" v-bind:class="getClass('/design')">{{
              $t("views.components.navBar.menu.design")
            }}</router-link>
          </li>
          <li>
            <router-link to="/results" v-bind:class="getClass('/results')">{{
              $t("views.components.navBar.menu.results")
            }}</router-link>
          </li>
          <li>
            <router-link to="/contact" v-bind:class="getClass('/contact')">{{
              $t("views.components.navBar.menu.contact")
            }}</router-link>
          </li>
          <li>
            <a href="#" v-on:click="showInSpanish" title="Español">
              <span class="flag-icon flag-icon-es"></span>
            </a>
          </li>
          <li class="last">
            <a href="#"  v-on:click="showInEnglish" title="English">
              <span class="flag-icon flag-icon-gb"></span>
            </a>
          </li>

        </ul>
      </div>
      <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
          <i class="fa fa-bars" ></i>
        </label>
        <li>
          <a href="#" class="checkbtn" v-on:click="showInSpanish" title="Español">
            <span class="flag-icon flag-icon-es"></span>
          </a>
        </li>
        <li class="last">
          <a href="#" class="checkbtn" v-on:click="showInEnglish" title="English">
            <span class="flag-icon flag-icon-gb"></span>
          </a>
        </li>
        <ul>
          <li ><router-link to="/about" >{{
            $t("views.components.navBar.menu.about")
            }}</router-link></li>
          <li><router-link to="/analyze" >{{
            $t("views.components.navBar.menu.analyze")
            }}</router-link></li>
          <li><router-link to="/design" >{{
            $t("views.components.navBar.menu.design")
            }}</router-link></li>
          <li><router-link to="/results" >{{
            $t("views.components.navBar.menu.results")
            }}</router-link></li>
          <li><router-link to="/results" >{{
            $t("views.components.navBar.menu.contact")
            }}</router-link></li>
        </ul>
      </nav>
      <section></section>
    </div>
  </div>
</template>

<script>
import "flag-icon-css/css/flag-icon.css";

export default {
  name: "NavBar",
  methods: {
    getClass(property) {
      return property === this.$route.path ? "active" : "";
    },
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
  ,async created() {
    this.showSection=true;
  }
};
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }
  nav{
    height: 80px;
    width: 100%;
  }

  nav ul{
    float: right;
    margin-right: 60px;
  }
  nav ul li{
    display: none;
    line-height: 80px;
    margin: 0 2px;
  }
  nav ul li a{
    color: #f2f2f2;
    font-weight: 500;
    font-size: 20px;
    padding: 7px 13px;
    border-radius: 3px;
    /* text-transform: uppercase; */
    font-family: 'Poppins', sans-serif;
  }

  .checkbtn{
    font-size: 30px;
    color: white;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
  }
  #check{
    display: none;
  }
  @media (max-width: 1200px){
    .checkbtn{
      display: block;
      margin-right: 40px;
      color: black;
    }
    ul{
      position: fixed;
      width: 100%;
      height: 100vh;
      background: #D3D3D3;
      top: 67px;
      left: -100%;
      text-align: center;
      transition: all .5s;
    }
    nav ul li{
      display: block;
      margin: 50px 0;
      line-height: 30px;
    }
    nav ul li a{
      font-size: 20px;
     }
    a:hover,a.active{
      background: none;
      color: #000000;
    }
    #check:checked ~ ul{
      left: 0;
    }
  }
  section{
    display:none;
    background-size: cover;
    height: calc(120vh - 80px);
  }



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
#header .site-nav {
  position: relative;
  float: right;
  margin-right: 0px;
}
#header .site-nav > ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 67px;
  overflow: hidden;
}
#header .site-nav > ul > li {
  float: left;
  border-left: 1px solid #eee;
  overflow: hidden;
}
#header .site-nav > ul > li > a {
  font-family: "BebasBook", "Roboto", Helvetica, sans-serif !important;
  letter-spacing: 1px !important;
  text-decoration: none;
  display: block;
  padding: 21px 20px 13px 20px;
  font-size: 21px;
  color: #333333;
  transition: all;
  transition-duration: 0.4s;
  font-weight: 300;
  text-transform: uppercase;
  border-bottom: 3px solid #fff;
  letter-spacing: 0px;
}
#header .site-nav .last {
  border-right: 1px solid #eee;
}
.site-nav .active {
  background-color: #f7f7f7;
  color: #333333 !important;
  border-bottom: 3px solid #f7f7f7 !important;
}
#header .site-nav > ul > li > a:hover {
  background-color: #f2f2f2;
  color: #000000;
  border-bottom: 3px solid rgb(243, 112, 33) !important;
}
</style>
