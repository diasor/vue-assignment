<template>
  <ProgressBar :options="options" :value="value" />
</template>

<script lang="ts">
import Vue from 'vue';
import ProgressBar from 'vuejs-progress-bar';
import { Component, Prop, Watch } from 'vue-property-decorator';

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

  windowSize: number = 0;
  get layoutWidth(): number {
    return this.windowSize < 500 ? 150 : 350;
  }

  get options() {
    return {
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
        width: this.layoutWidth,
        verticalTextAlign: 61,
        horizontalTextAlign: 43,
        zeroOffset: 0,
        strokeWidth: 30,
        progressPadding: 0,
        type: this.paramType
      }
    };
  }

  mounted() {
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth;
    });
  }

  @Watch('windowSize')
  onWindowSizeChange() {
    this.windowSize = window.innerWidth;
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.windowSize = window.innerWidth;
    });
  }
}
</script>

<style lang="scss">
.line-progress {
  min-width: 250px !important;
}
</style>

