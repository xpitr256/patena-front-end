<template>
  <div id="header" class="header-fixed">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <label class="logo">
            <router-link to="/">
              <img src="./../assets/logo.png" alt="Patena"/>
            </router-link>
          </label>
        </div>
        <div class="col-10">
          <div id="navigation">
            <ul>
              <li v-on:click="refreshMenu">
                <router-link to="/about" v-bind:class="getClass('/about')">{{$t("views.components.navBar.menu.about")}}
                </router-link>
              </li>
              <li v-on:click="refreshMenu">
                <router-link to="/analyze" v-bind:class="getClass('/analyze')">
                  {{$t("views.components.navBar.menu.analyze")}}
                </router-link>
              </li>
              <li v-on:click="refreshMenu">
                <router-link to="/design" v-bind:class="getClass('/design')">{{$t("views.components.navBar.menu.design")}}
                </router-link>
              </li>
              <li v-on:click="refreshMenu">
                <router-link to="/results" v-bind:class="getClass('/results')">
                  {{$t("views.components.navBar.menu.results")}}
                </router-link>
              </li>
              <li v-on:click="refreshMenu">
                <router-link to="/contact" v-bind:class="getClass('/contact')">
                  {{$t("views.components.navBar.menu.contact")}}
                </router-link>
              </li>
            </ul>
            <div class="search">
              <i v-on:click="showInSpanish" title="Español" class="flag-icon flag-icon-es"
                 style="  position: relative;
                          right: 20px;
                          top: 15px;
                          font-size: 1.6rem;
                          color: #aaa;
                          margin:10px;
                          cursor: pointer;"></i>
              <i v-on:click="showInEnglish" title="English" class="flag-icon flag-icon-gb"
                 style="  position: relative;
                          right: 20px;
                          top: 15px;
                          font-size: 1.6rem;
                          color: #aaa;
                          margin:10px;
                          cursor: pointer;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import "flag-icon-css/css/flag-icon.css";

    export default {
    name: "Navigation",
    data: function() {
    return {
    isShowMenu: false,
  }
  },
    methods: {
    getClass(property) {
    return property === this.$route.path ? "active" : "";
  },
    showInEnglish: function () {
    this["$i18n"].locale = "en";
    localStorage.lang ="en";
  },
    showInSpanish: function () {
    import("@/lang/es.json").then(msgs => {
    this.$i18n.setLocaleMessage("es", msgs.defaults || msgs);
    this.$i18n.locale = "es";
  });
    localStorage.lang ="es";
  },
    refreshMenu : function (){
    if (this.isShowMenu){
    location.reload()
  }
  },
    actionMenu : function (){
    this.isShowMenu = true;
  }
  }
  };
</script>


<style lang="scss" scoped>
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
   .logo {
    padding: 20px 0;
    float: left;
    margin-right: 50px;
    top: -20px;
    position: absolute;
    z-index: 999;
  }
  .logo img {
    height: 67px;
    transition: all;
    transition-duration: 0.4s;
    transition: all 0.4s !important;
  }
   .logo.scroll img {
    transform: scale(0.85);
  }

#navigation {
  display: flex;
  width: 100%;
  margin-bottom: 50px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 67px;
    overflow: hidden;


    li {
      display: inline-block;
      line-height: 30px;
      border-left: 1px solid #eee;

      a{
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
    }
  }

  .active {
    background-color: #f7f7f7;
    color: #333333 ;
    border-bottom: 3px solid #f7f7f7 !important;
  }
  a:hover,a.active{
    background-color: #f7f7f7;
    color: #333333;
    border-bottom: 3px solid rgb(243, 112, 33) ;
  }
  .search {
    position: relative;
    width: 100%;
    max-width: 200px;
    padding: 0px 0px 0px 25px;
    a{
      i {
        position: relative;
        right: 20px;
        top: 15px;
        font-size: 1.6rem;
        color: #aaa;
        margin:10px;
        cursor: pointer;
      }
    }
  }
}
</style>
