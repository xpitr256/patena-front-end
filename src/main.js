import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from "vue-i18n";
import en from "@/lang/en.json";

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: { en }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
