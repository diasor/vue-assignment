import Vue from "vue";
import App from "./App.vue";
import {
  Map,
  TileLayer,
  OsmSource,
  Geoloc,
  Feature,
  PointGeom,
  StyleBox,
  IconStyle,
  FillStyle,
  StrokeStyle,
  CircleStyle
} from "vuelayers";
import "vuelayers/lib/style.css"; // needs css-loader
import VueMeta from "vue-meta";
import router from "./router";
import store from "./store";

Vue.use(Map);
Vue.use(TileLayer);
Vue.use(OsmSource);
Vue.use(Geoloc);
Vue.use(Feature);
Vue.use(PointGeom);
Vue.use(StyleBox);
Vue.use(IconStyle);
Vue.use(FillStyle);
Vue.use(StrokeStyle);
Vue.use(CircleStyle);
Vue.use(VueMeta);
// Vue.use(ProgressBar);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
