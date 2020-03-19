<template>
  <div class="vehicle-container">
    <div class="map-container">
      <Map :vechiclePosition="vehicleData" />
    </div>
    <div class="data-container">
      <vehicleData
        :speed="currentVehicleData.speed"
        :soc="currentVehicleData.soc"
        :energy="currentVehicleData.energy"
        :odo="currentVehicleData.odo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { namespace } from "vuex-class";
import { Component } from "vue-property-decorator";
// import { Message } from "@/types/webSocketTypes";
import Map from "@/components/maps/Map";
import VehicleData from "@/components/vehicle-data/VehicleData";

const SocketNameSpace = namespace("webSocketState/");
@Component({
  name: "Vehicle",
  components: {
    Map,
    vehicleData: VehicleData
  }
})
export default class Vehicle extends Vue {
  @SocketNameSpace.Getter("isConnected") isConnected!: boolean;
  @SocketNameSpace.Getter("currentVehicleData") currentVehicleData!: any;
  @SocketNameSpace.Getter("getMessage") getMessage!: any;

  get vehicleData() {
    return this.currentVehicleData;
  }
}
</script>

<style lang="scss">
@import "@/assets/sass/variables";

.vehicle-container {
  display: flex;
  justify-content: flex-start;
  height: 60%;
  width: 100%;
  background-color: transparent;
  padding: 1.5rem 2rem;
}
.map-container {
  height: 40%;
  width: 60%;
  max-width: 40vw;
  margin: 0 2rem;
  padding: 1px;
  border-radius: 0.5rem;
  border: 2px solid $dark-green;
}

.data-container {
  width: 30%;
}
</style>
