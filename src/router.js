import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Contact from "./views/Contact";
import ViewResult from "./views/ViewResult";
import Design from "./views/Design";
import About from "./views/About";
import Download from "./views/Download";
import DesignSuccess from "./views/DesignSuccess";
import DesignLengthSuccess from "./views/DesignLengthSuccess";
import NotFound from "./views/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/results",
      name: "results",
      component: ViewResult
    },
    {
      path: "/results/:orderNumber",
      name: "download",
      component: Download
    },
    {
      path: "/design",
      name: "Design",
      component: Design
    },
    {
      path: "/design/length/success",
      name: "DesignLengthSuccess",
      component: DesignLengthSuccess
    },
    {
      path: "/design/success",
      name: "DesignSuccess",
      component: DesignSuccess
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
