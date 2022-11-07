import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/index";
import VCalendar from "v-calendar";

Vue.config.productionTip = false;
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
