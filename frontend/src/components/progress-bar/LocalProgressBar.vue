<template>
  <ProgressBar :options="options" :value="value" />
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
  @Prop({ required: true, default: 0 }) paramValue!: number;
  @Prop({ required: true }) paramType!: string;

  get value() {
    return typeof this.paramValue === 'string' || this.paramValue < 0
      ? 0
      : this.paramValue;
  }
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

