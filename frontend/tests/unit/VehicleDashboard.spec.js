import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import VehicleDashboard from "@/components/vehicle-data/VehicleDashboard";
import { webSocketState } from "@/store/webSocketState";

const localVue = createLocalVue();
localVue.use(Vuex);

let getters;
let store;
let state;
let wrapper;

beforeEach(() => {
  state = {
    messageList: () => [
      {
        time: "1511437145000",
        energy: 56.283,
        gps: [52.08335494995117, 5.124546527862549],
        odo: 88529.27,
        speed: 21,
        soc: 64,
        parsedTime: "2017-11-23T11:39:05.000Z"
      },
      {
        time: "1511437398000",
        energy: 57.134,
        gps: [52.07914733886719, 5.119481563568115],
        odo: 88530.067,
        speed: 17,
        soc: 63.2,
        parsedTime: "2017-11-23T11:43:18.000Z"
      }
    ],
    currentVehicle: () => ({
      time: "1511437398000",
      energy: 57.134,
      gps: [52.07914733886719, 5.119481563568115],
      odo: 88530.067,
      speed: 17,
      soc: 63.2,
      parsedTime: "2017-11-23T11:43:18.000Z"
    })
  };

  getters = {
    messages: () => [
      {
        time: "1511437145000",
        energy: 56.283,
        gps: [52.08335494995117, 5.124546527862549],
        odo: 88529.27,
        speed: 21,
        soc: 64,
        parsedTime: "2017-11-23T11:39:05.000Z"
      },
      {
        time: "1511437398000",
        energy: 57.134,
        gps: [52.07914733886719, 5.119481563568115],
        odo: 88530.067,
        speed: 17,
        soc: 63.2,
        parsedTime: "2017-11-23T11:43:18.000Z"
      }
    ],

    currentVehicleData: () => ({
      time: "1511437398000",
      energy: 57.134,
      gps: [52.07914733886719, 5.119481563568115],
      odo: 88530.067,
      speed: 17,
      soc: 63.2,
      parsedTime: "2017-11-23T11:43:18.000Z"
    })
  };

  store = new Vuex.Store({
    modules: {
      webSocketState: {
        namespaced: true,
        state,
        getters: webSocketState.getters
      }
    }
  });

  // shallow mounting the main component with the store on a localVue instance and stubs for the subcomponents
  wrapper = shallowMount(VehicleDashboard, {
    store,
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("VehicleDashboard.vue rendering", () => {
  // mounts the main dashboard component
  // on the process it tests the Vuex getters and the access to the module namespace
  it("renders component testing the Vuex getters and the access to the module namespace", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  // renders 1 main-container class, 2 vehicle-containers and 4 single-component
  it("has 1 main-container class, 2 vehicle-containers and 4 single-component", () => {
    expect(wrapper.findAll(".main-container").length).toBe(1);
    expect(wrapper.findAll(".vehicle-container").length).toBe(2);
    expect(wrapper.findAll(".single-component").length).toBe(4);
  });

  // tests that the main component renders 1 GoogleMap subcomponent
  it("renders 1 GoogleMap subcomponent", () => {
    expect(wrapper.find("google-map-stub").exists()).toBe(true);
  });

  // tests that the main component renders 1 VehicleData subcomponent
  it("renders 1 VehicleData subcomponent", () => {
    expect(wrapper.find("vehicle-data-stub").exists()).toBe(true);
  });

  // tests that the main component renders 2 LineCharts subcomponent
  it("renders 2 LineChart subcomponents", () => {
    expect(wrapper.findAll("line-chart-stub").length).toBe(2);
  });
});

describe("VehicleDashboard.vue Getters values", () => {
  // tests that the currentVehicleData got on the component is the proper one
  it("has a getter currentVehicleData equal to the one on the state", () => {
    expect(getters.currentVehicleData(state)).toEqual({
      time: "1511437398000",
      energy: 57.134,
      gps: [52.07914733886719, 5.119481563568115],
      odo: 88530.067,
      speed: 17,
      soc: 63.2,
      parsedTime: "2017-11-23T11:43:18.000Z"
    });
  });

  // tests that the vehicleData computed property has the value of the getter
  it("has a computed property vehicleData with the value of the state getter currentVehicleData", () => {
    expect(wrapper.vm.vehicleData()).toEqual(getters.currentVehicleData(state));
  });

  // tests that the messages got on the component has the proper length
  it("has a getter messages with a length of 2", () => {
    expect(getters.messages(state).length).toBe(2);
  });

  // tests that the allMessages computed property has the value of the getter "messages"
  it("has a computed property allMessages with the value of the state getter messages", () => {
    expect(wrapper.vm.allMessages()).toEqual(getters.messages(state));
  });
});
