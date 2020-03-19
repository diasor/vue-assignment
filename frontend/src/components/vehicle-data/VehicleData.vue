<template>
  <div class="vehicle-data">
    <div class="data-cell data-cell__speed">
      <label>Current Speed</label>
    </div>
    <div class="data-cell data-cell__speed-bar">
      <LocalProgressBar paramType="line" :paramValue="speed" />
    </div>
    <div class="data-cell data-cell__soc">
      <label>State Of Change</label>
    </div>
    <div class="data-cell data-cell__soc-bar">
      <LocalProgressBar paramType="line" :paramValue="soc" />
    </div>
    <div class="data-cell data-cell__energy">
      <label>Energy</label>
    </div>
    <div class="data-cell data-cell__odo">
      <label>Odometer</label>
    </div>
    <div class="data-cell data-cell__energy-data">
      <label>{{ energy }}</label>
    </div>
    <div class="data-cell data-cell__odo-data">
      <label>{{ odo }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LocalProgressBar from "@/components/progress-bar/LocalProgressBar";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "VehicleData",
  components: {
    LocalProgressBar
  }
})
export default class VehicleData extends Vue {
  @Prop({ required: true }) speed!: number;
  @Prop({ required: true }) soc!: number;
  @Prop({ required: true }) energy!: number;
  @Prop({ required: true }) odo!: number;

  // value: number = 70;
  socPercentage: number = this.soc / 100;
  mounted() {
    // this.$Progress.start();
    // this.$Progress.finish();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/sass/variables";

.vehicle-data {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, minmax(auto, 35px));
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  margin: 0.2rem 1rem;
  padding: 0.2rem;
  border: 2px solid $dark-green;
  border-radius: 0.5rem;
}

.data-cell {
  display: flex;
  justify-content: flex-start;
  padding: 0.2rem;

  & label {
    font-size: 1.1rem;
    font-family: $font-family;
    padding: 0.5rem 0 0 0;
  }

  &__speed {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  &__speed-bar {
    grid-column: 1 / 3;
    grid-row: 2;
  }

  &__soc {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  &__soc-bar {
    grid-column: 1 /3;
    grid-row: 4;
  }

  &__energy {
    grid-column: 1;
    grid-row: 5;
  }

  &__odo {
    grid-column: 2;
    grid-row: 5;
  }

  &__energy-data {
    grid-column: 1;
    grid-row: 6;
  }

  &__odo-data {
    grid-column: 2;
    grid-row: 6;
  }
}
</style>