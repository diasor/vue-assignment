import Vue from "vue";
import Vuex from "vuex";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { last, split } from "lodash";
import { RootState } from "@/types/rootState";
import { WebSocketState, Message } from "@/types/webSocketTypes";

Vue.use(Vuex);

const state: WebSocketState = {
  isConnected: false,
  messageList: [],
  connectionSocket: {},
  currentVehicle: {} as Message
};

// getters
export const getters: GetterTree<WebSocketState, RootState> = {
  messages: state => state.messageList,
  isConnected: state => state.isConnected,
  currentVehicleData: state => state.currentVehicle
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
    console.log("IS_CONNECTED", state.isConnected);
  },

  DISCONNECT(state) {
    state.isConnected = false;
  },

  ADD_MESSAGE(state, message) {
    if (state.messageList.length < 10) {
      const gps: string[] = split(message.gps, "|", 2);
      const gpsCoordinates: number[] = gps.map((element: string) => parseFloat(element));
      const vehicleData: Message = { ...message };
      vehicleData.gps = gpsCoordinates;
      state.messageList.push(vehicleData);
      console.log("data", JSON.stringify(vehicleData));
    }
  },

  SET_CURRENT_VEHICLE(state, vehicleData: Message) {
    console.log("mutation SET_CURRENT_VEHICLE", JSON.stringify(vehicleData));
    state.currentVehicle = { ...vehicleData };
    console.log("mutation SET_CURRENT_VEHICLE", JSON.stringify(state.currentVehicle));
  }
};

export const actions: ActionTree<WebSocketState, RootState> = {
  connect({ commit }) {
    // this method connects to the websocket where the backend sends the messasges
    const socket = new WebSocket("ws://localhost:3000");
    commit("CONNECT", socket);

    socket.onopen = function() {
      commit("IS_CONNECTED", true);
      console.log("onopen: " + state.isConnected);
    };

    socket.onerror = function(errorEvent: any) {
      console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      commit("IS_CONNECTED", false);
    };

    socket.onmessage = function(messageEvent: any) {
      const wsMessage = messageEvent.data;
      if (wsMessage.indexOf("error") > 0) {
        console.error("ws::msg_in:error: " + wsMessage.error);
      } else {
        // console.info("ws::msg_in: " + wsMessage);
        commit("ADD_MESSAGE", JSON.parse(wsMessage));
        // console.log("cnt messages", state.messageList.length);
      }
    };
  },

  selectVehicleData({ commit, state }) {
    const lastIndex: number = state.messageList.length;
    commit("SET_CURRENT_VEHICLE", last(state.messageList));
  }

  // getMessages({ commit, state }) {
  //   console.info("**** GET MESSAGE");
  //   state.connectionSocket.onmessage = function(messageEvent: any) {
  //     const wsMessage = messageEvent.data;
  //     if (wsMessage.indexOf("error") > 0) {
  //       console.error("ws::msg_in:error: " + wsMessage.error);
  //     } else {
  //       console.info("ws::msg_in: " + wsMessage);
  //       commit("ADD_MESSAGE", wsMessage);
  //       console.log("cnt messages", state.messageList.length);
  //     }
  //   };
  // }
};

export const webSocketState = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
