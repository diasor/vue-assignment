import Vue from "vue";
import Vuex from "vuex";
import { webSocketState } from "@/store/webSocketState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    webSocketState
  }
});
