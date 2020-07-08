<template>
  <div class="container">
    <label class="logo">
      <router-link to="/">
        <img src="./../assets/logo.png" alt="Patena"/>
      </router-link>
    </label>
    <div id="navigation-mobile">
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
      <div class="social-media">
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
#navigation-mobile {
  padding: 20px 0 0 0;

  ul {
    width: 100%;
    height: 100vh;
    background: #f7f7f7;
    top: 67px;
    left: -100%;
    text-align: center;
    transition: all .5s;

    li {
      display: block;
      margin: 20px 0;
      line-height: 30px;

      a{
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
    }
  }
  .social-media {
    position: absolute;
    left: 40px;
    bottom: 20px;

    i {
      margin: 0 20px 0 0;
      color: #fff;
      font-size: 2rem;
    }
  }
}
</style>
