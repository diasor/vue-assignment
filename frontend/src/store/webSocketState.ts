import Vue from "vue";
import Vuex from "vuex";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { last, split, drop } from "lodash";
import moment from "moment";
import { RootState } from "@/types/rootState";
import { WebSocketState, Message } from "@/types/webSocketTypes";

Vue.use(Vuex);

const state: WebSocketState = {
  isConnected: false,
  messageList: [],
  connectionSocket: {},
  currentVehicle: {} as Message,
  currentSpeedData: [],
  currentSOCData: []
};

// getters
export const getters: GetterTree<WebSocketState, RootState> = {
  messages: state => state.messageList,
  isConnected: state => state.isConnected,
  currentVehicleData: state => state.currentVehicle,
  currentSpeedData: state => state.messageList,
  currentSOCData: state => state.currentSOCData
};

const mutations: MutationTree<WebSocketState> = {
  CONNECT(state, socket) {
    state.connectionSocket = socket;
  },

  IS_CONNECTED(state, isConnected: boolean) {
    state.isConnected = isConnected;
  },

  DISCONNECT(state) {
    state.isConnected = false;
  },

  ADD_MESSAGE(state, message) {
    const gps: string[] = split(message.gps, "|", 2);
    const gpsCoordinates: number[] = gps.map((element: string) => parseFloat(element));
    const parsedTime = new Date(moment(message.time).format("YYYY-MM-DD HH:mm:ss"));
    const vehicleData: Message = { ...message, parsedTime };
    vehicleData.gps = gpsCoordinates;
    state.messageList.push(vehicleData);
    state.currentVehicle = vehicleData;
    if (state.messageList.length >= 50) {
      state.messageList = drop(state.messageList);
    }
  },

  SET_CURRENT_VEHICLE(state, vehicleData: Message) {
    state.currentVehicle = { ...vehicleData };
  }
};

export const actions: ActionTree<WebSocketState, RootState> = {
  connect({ commit }) {
    // this method connects to the websocket where the backend sends the messasges
    const socket = new WebSocket("ws://localhost:3000");
    commit("CONNECT", socket);

    socket.onopen = function() {
      commit("IS_CONNECTED", true);
      console.info(`On open: ${state.isConnected}`);
    };

    socket.onerror = function(errorEvent: any) {
      const errorMessage: string = JSON.stringify(errorEvent, null, 4);
      console.error(`WebSocket ERROR: ${errorMessage}`);
      commit("IS_CONNECTED", false);
    };

    socket.onmessage = function(messageEvent: any) {
      const wsMessage = messageEvent.data;
      if (wsMessage.indexOf("error") > 0) {
        console.error("ws::msg_in:error: " + wsMessage.error);
      } else {
        commit("ADD_MESSAGE", JSON.parse(wsMessage));
      }
    };
  },

  selectVehicleData({ commit, state }) {
    commit("SET_CURRENT_VEHICLE", last(state.messageList));
  }
};

export const webSocketState = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
