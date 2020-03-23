import Vue from "vue";
import App from "./App.vue";
import VueMeta from "vue-meta";
import * as VueGoogleMaps from "vue2-google-maps";
import router from "./router";
import store from "./store";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB7I17dpKCQV-ZSo5ABIFyIh1Cu27TMcoo",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueMeta);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
