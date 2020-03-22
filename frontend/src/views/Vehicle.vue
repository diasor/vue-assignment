<template>
  <div class="main-container">
    <div class="vehicle-container">
      <!-- <div class="data-cell data-cell__map"> -->
      <div class="map-container">
        <Map :vechiclePosition="vehicleData" />
      </div>
      <!-- <div class="data-cell data-cell__data"> -->
      <div class="data-container">
        <vehicleData
          :speed="currentVehicleData.speed"
          :soc="currentVehicleData.soc"
          :energy="currentVehicleData.energy"
          :odo="currentVehicleData.odo"
        />
      </div>
    </div>
    <div class="charts-container" id="speedData">
      <LineChart
        title="Speed Profile"
        yTitle="Speed (km/h)"
        xTitle="Time"
        data-key="speed"
        :data="allMessages"
      />
    </div>
    <div class="charts-container" id="socData">
      <LineChart
        title="State Of Charge Profile"
        yTitle="SoC (%)"
        xTitle="Time"
        data-key="soc"
        :data="allMessages"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
// import { Message } from "@/types/webSocketTypes";
import Map from '@/components/maps/Map';
import VehicleData from '@/components/vehicle-data/VehicleData';
import LineChart from '@/components/charts/LineChart';

const SocketNameSpace = namespace('webSocketState/');
@Component({
  name: 'Vehicle',
  components: {
    Map,
    vehicleData: VehicleData,
    LineChart
  }
})
export default class Vehicle extends Vue {
  @SocketNameSpace.Getter('isConnected') isConnected!: boolean;
  @SocketNameSpace.Getter('currentVehicleData') currentVehicleData!: any;
  @SocketNameSpace.Getter('getMessage') getMessage!: any;
  @SocketNameSpace.Getter('messages') messages!: any;

  get vehicleData() {
    return this.currentVehicleData;
  }

  get allMessages() {
    return this.messages;
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/variables';

.main-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  width: 97%;
  margin: 0 2rem;
  padding: 0;
}

.vehicle-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  background-color: transparent;
  padding: 1.5rem 0;
}

.map-container {
  height: 30%;
  width: 60%;
  max-width: 45vw;
  margin: 0;
  border: 2px solid $background-color;
  border-radius: 0.5rem;
}

.data-container {
  width: 30%;
}

.charts-container {
  display: flex;
  width: 98%;
  margin: 0 0 1rem 0;
  border-radius: 0.5rem;
  border: 2px solid $background-color;
  border-radius: 0.5rem;
}
</style>
