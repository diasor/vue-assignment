<template>
  <div class="main-container">
    <div class="vehicle-container">
      <div class="single-component">
        <google-map
          :key="mapChartKey"
          :currentPosition="currentVehicleData"
          :previousPositions="allMessages"
        />
      </div>
      <div class="single-component">
        <vehicle-data
          :speed="currentVehicleData.speed"
          :soc="currentVehicleData.soc"
          :energy="currentVehicleData.energy"
          :odo="currentVehicleData.odo"
        />
      </div>
    </div>
    <div class="vehicle-container">
      <div class="single-component">
        <line-chart
          :key="speedChartKey"
          title="Speed Profile"
          yTitle="Speed (km/h)"
          xTitle="Time"
          data-key="speed"
          :data="allMessages"
        />
      </div>
      <div class="single-component">
        <line-chart
          :key="socChartKey"
          title="State Of Charge Profile"
          yTitle="SoC (%)"
          xTitle="Time"
          data-key="soc"
          :data="allMessages"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { namespace } from "vuex-class";
import { Component } from "vue-property-decorator";
import GoogleMap from "@/components/maps/GoogleMap";
import VehicleData from "@/components/vehicle-data/VehicleData";
import LineChart from "@/components/charts/LineChart";

const SocketNameSpace = namespace("webSocketState/");
@Component({
  name: "VehicleDashboard",
  components: {
    googleMap: GoogleMap,
    vehicleData: VehicleData,
    lineChart: LineChart
  }
})
export default class VehicleDashboard extends Vue {
  @SocketNameSpace.Getter("currentVehicleData") currentVehicleData!: any;
  @SocketNameSpace.Getter("messages") messages!: any;

  timeout = 0;
  lastKey: number = 0;
  speedChartKey: string = "speedChartKey";
  socChartKey: string = "socChartKey";
  mapChartKey: string = "mapChartKey";
  windowSize: number = 0;

  get vehicleData() {
    return this.currentVehicleData;
  }

  get allMessages() {
    return this.messages;
  }

  reloadComponents() {
    this.lastKey = this.lastKey + 1;
    this.mapChartKey = `mapChartKey_${this.lastKey}`;
    this.speedChartKey = `speedChartKey_${this.lastKey}`;
    this.socChartKey = `socChartKey_${this.lastKey}`;
    this.timeout = setTimeout(() => this.reloadComponents(), 5000);
    console.log("****current", JSON.stringify(this.currentVehicleData));
  }

  mounted() {
    this.timeout = setTimeout(() => this.reloadComponents(), 5000);
  }

  beforeDestroy() {
    clearTimeout(this.timeout);
  }
}
</script>

<style lang="scss">
@import "@/assets/sass/variables";
$margin-left: 2rem;
$component-width: 70%;
$component-height: 14rem;

.main-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 97%;
  margin: 0 2rem;
  padding: 0;
  overflow: hidden;
}

.vehicle-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 47%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;

  @media screen and (min-width: $tablet-screen) {
    margin: 0 2rem;
  }

  @media screen and (min-width: $medium-screen) {
    flex-direction: row;
    width: 97%;
    margin: 0 1rem;
    padding: 1rem 0;
  }
}

.single-component {
  display: flex;
  height: $component-height;
  width: $component-width;
  margin: 1rem $margin-left 0 $margin-left;
  padding: 0;
  border-radius: 0.5rem;
  border: 2px solid $background-color;
  border-radius: 0.5rem;

  @media screen and (min-width: $medium-screen) {
    flex-direction: row;
    width: 50%;
    margin: 0 2rem 0 0;
  }
}
</style>
