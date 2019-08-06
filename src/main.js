import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from "vue-i18n";
import en from "@/lang/en.json";
import "./assets/app.scss";
import "bootstrap";
import "jquery";
import "popper.js";
import Notifications from 'vue-notification'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueI18n);
Vue.use(VueProgressBar, {
  color: 'rgb(243, 112, 33)',
  failedColor: 'red',
  height: '2px'
});

const i18n = new VueI18n({
  locale: "en",
  messages: { en }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
