<template>
  <ProgressBar :options="options" :value="paramValue" />
</template>

<script lang="ts">
import Vue from 'vue';
import ProgressBar from 'vuejs-progress-bar';
import { Component, Prop } from 'vue-property-decorator';

Vue.use(ProgressBar);
@Component({
  name: 'LocalProgressBar'
})
export default class LocalProgressBar extends Vue {
  @Prop({ required: true }) paramValue!: number;
  @Prop({ required: true }) paramType!: string;

  options = {
    text: {
      color: '#FFFFFF',
      shadowEnable: true,
      shadowColor: '#000000',
      fontSize: 12,
      fontFamily: 'Montserrat',
      dynamicPosition: false,
      hideText: false
    },
    progress: {
      color: '#696969',
      backgroundColor: '#C0C0C0'
    },
    layout: {
      height: 30,
      width: 250,
      verticalTextAlign: 61,
      horizontalTextAlign: 43,
      zeroOffset: 0,
      strokeWidth: 30,
      progressPadding: 0,
      type: this.paramType
    }
  };
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/variables';
// .vehicle-data {
//   width: 40%;
//   margin: 1rem 1rem;
//   font-family: $font-family;
// }
</style>
