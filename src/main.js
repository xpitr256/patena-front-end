import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from "vue-i18n";
import en from "@/lang/en.json";
import es from "@/lang/es.json";
import "./assets/app.scss";
import "bootstrap";
import "jquery";
import "popper.js";
import Notifications from "vue-notification";
import VueProgressBar from "vue-progressbar";
import VeeValidate from "vee-validate";
import spanishValidationMessages from "vee-validate/dist/locale/es";
import englishValidationMessages from "vee-validate/dist/locale/en";
import VueNumberInput from "@chenfengyuan/vue-number-input";
Vue.use(VueNumberInput);
import ToggleButton from "vue-js-toggle-button";
Vue.use(ToggleButton);

import vueResource from "vue-resource";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
library.add(faSpinner);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueI18n);
Vue.use(vueResource);

Vue.use(VueProgressBar, {
  color: "rgb(243, 112, 33)",
  failedColor: "red",
  height: "2px"
});

const i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "es",
    formatFallbackMessages: true,
    messages: { "en": en, "es" : es  }
});


Vue.use(VeeValidate, {
  i18nRootKey: "validations",
  i18n,
  dictionary: {
    en: englishValidationMessages,
    es: spanishValidationMessages
  }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
