import Vue from "vue";
import Vuex from "vuex";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/types/rootState";
import { WebSocketState, Message } from "@/types/webSocketTypes";

Vue.use(Vuex);

const state: WebSocketState = {
  isConnected: false,
  messageList: [],
  connectionSocket: {}
};

// getters
export const getters: GetterTree<WebSocketState, RootState> = {
  messages: state => state.messageList,
  isConnected: state => state.isConnected
};

// mutations types
const mutationTypes = {
  CONNECT: "SOCKET_CONNECT",
  DISCONNECT: "SOCKET_DISCONNECT",
  ADD_ITEM_TO_CART_SUCCESS: "ADD_ITEM_TO_CART_SUCCESS",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  REMOVE_ITEM_FROM_CART_SUCCESS: "REMOVE_ITEM_FROM_CART_SUCCESS"
};

const mutations: MutationTree<WebSocketState> = {
  CONNECT(state, socket) {
    console.log("mutation connect");
    state.connectionSocket = socket;
  },

  IS_CONNECTED(state, isConnected: boolean) {
    state.isConnected = isConnected;
  },

  DISCONNECT(state) {
    state.isConnected = false;
  },

  ADD_MESSAGE(state, message) {
    console.log("mutation socket_Data");
    // state.socketMessage = message;
    state.messageList.push(message);
  }
};

export const actions: ActionTree<WebSocketState, RootState> = {
  connect({ commit }) {
    // this method connects to the websocket where the backend sends the messasges
    const socket = new WebSocket("ws://localhost:3000");
    commit("CONNECT", socket);

    socket.onopen = function() {
      console.log("ws::open : connection established ");
      // this.status = 'Connected';
      commit("IS_CONNECTED", true);
    };

    socket.onerror = function(errorEvent: any) {
      console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      commit("IS_CONNECTED", false);
    };
  },

  getMessages({ commit, state }) {
    state.connectionSocket.onmessage = function(messageEvent: any) {
      const wsMessage = messageEvent.data;
      if (wsMessage.indexOf("error") > 0) {
        console.error("ws::msg_in:error: " + wsMessage.error);
      } else {
        console.info("ws::msg_in: " + wsMessage);
        commit("ADD_MESSAGE", wsMessage);
        console.log("cnt messages", state.messageList.length);
      }
    };
  }
};

export const webSocketState = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
