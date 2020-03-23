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
import Vue from 'vue';
import LocalProgressBar from '@/components/progress-bar/LocalProgressBar';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'VehicleData',
  components: {
    LocalProgressBar
  }
})
export default class VehicleData extends Vue {
  @Prop({ required: true, default: 0 }) speed!: number;
  @Prop({ required: true, default: 0 }) soc!: number;
  @Prop({ required: true, default: 0 }) energy!: number;
  @Prop({ required: true, default: 0 }) odo!: number;

  socPercentage: number = this.soc === 0 ? 0 : this.soc / 100;
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/variables';

.vehicle-data {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, minmax(auto, 35px));
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  margin: 0;
  padding: 1rem 2rem;
  border: 2px solid $background-color;
  border-radius: 0.5rem;
  background-color: $background-color;
}

.data-cell {
  display: flex;
  justify-content: flex-start;
  padding: 0.2rem;

  & label {
    font-family: $font-family;
    font-size: $title-medium;
    font-weight: bold;
    padding: 0.9rem 0 0.3rem 0;
  }

  &__speed {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  &__speed-bar {
    grid-column: 1 / 3;
    grid-row: 2;
    margin: 0;
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
