<template>
  <div class="main-container">
    <div class="vehicle-container">
      <div class="map-container">
        <google-map
          :key="mapChartKey"
          :currentPosition="currentVehicleData"
          :previousPositions="allMessages"
        />
      </div>
      <div class="data-container">
        <vehicle-data
          :speed="currentVehicleData.speed"
          :soc="currentVehicleData.soc"
          :energy="currentVehicleData.energy"
          :odo="currentVehicleData.odo"
        />
      </div>
    </div>
    <div class="charts-container" id="speedData">
      <div class="one-chart">
        <line-chart
          :key="speedChartKey"
          title="Speed Profile"
          yTitle="Speed (km/h)"
          xTitle="Time"
          data-key="speed"
          :data="allMessages"
        />
      </div>
      <div class="one-chart" id="socData">
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
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
// import { Message } from "@/types/webSocketTypes";
import GoogleMap from '@/components/maps/GoogleMap';
import VehicleData from '@/components/vehicle-data/VehicleData';
import LineChart from '@/components/charts/LineChart';

const SocketNameSpace = namespace('webSocketState/');
@Component({
  name: 'Vehicle',
  components: {
    googleMap: GoogleMap,
    vehicleData: VehicleData,
    lineChart: LineChart
  }
})
export default class Vehicle extends Vue {
  @SocketNameSpace.Getter('isConnected') isConnected!: boolean;
  @SocketNameSpace.Getter('currentVehicleData') currentVehicleData!: any;
  @SocketNameSpace.Getter('getMessage') getMessage!: any;
  @SocketNameSpace.Getter('messages') messages!: any;

  timeout = 0;
  lastKey: number = 0;
  speedChartKey: string = 'speedChartKey';
  socChartKey: string = 'socChartKey';
  mapChartKey: string = 'mapChartKey';

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
@import '@/assets/sass/variables';
$margin-left: 2rem;

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
  height: 15rem;
  width: 46%;
  max-width: 45vw;
  margin: 0 $margin-left;
  border-radius: 0.5rem;
  border: 2px solid $background-color;
}

.data-container {
  height: 15rem;
  width: 30%;
}

.charts-container {
  display: flex;
  width: 97%;
  margin: 0 $margin-left 1rem $margin-left;
}

.one-chart {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0 2rem 0 0;
  border-radius: 0.5rem;
  border: 2px solid $background-color;
  border-radius: 0.5rem;
}
</style>
