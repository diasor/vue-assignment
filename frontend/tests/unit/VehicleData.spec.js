import { mount } from "@vue/test-utils";
import VehicleData from "@/components/vehicle-data/VehicleData";

let wrapper;

beforeEach(() => {
  wrapper = mount(VehicleData, {
    propsData: {
      speed: 100.3,
      soc: 45.6,
      energy: 56.2,
      odo: 88
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("VehicleData.vue rendering", () => {
  // mounts the main component
  it("renders component", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  // renders one container class and 8 data-cells
  it("has a vehicle-data class and 8 data-cell classes", () => {
    expect(wrapper.findAll(".vehicle-data").length).toBe(1);
    expect(wrapper.findAll(".data-cell").length).toBe(8);
  });

  // tests that the socPercentage is correctly calculated
  it("has initial socPercentage value of 0.456", () => {
    expect(wrapper.vm.socPercentage).toBe(0.456);
  });

  // shows energy and odometer simply on the screen
  it("shows the proper energy and odometer values", () => {
    expect(wrapper.text()).toMatch("56.2");
    expect(wrapper.text()).toMatch("88");
  });
});
