<template>
  <vl-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    data-projection="EPSG:4326"
    style="height: 350px"
  >
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
    <vl-layer-tile id="osm">
      <vl-source-osm></vl-source-osm>
    </vl-layer-tile>
    <vl-feature>
      <vl-geom-point :coordinates="geolocPosition"></vl-geom-point>
      <vl-style-box>
        <vl-style-icon src="../../assets/marker3.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
      </vl-style-box>
    </vl-feature>
  </vl-map>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Map',
  components: {}
})
export default class Map extends Vue {
  @Prop({ required: true }) vechiclePosition!: any;

  zoom: number = 1;
  rotation: number = 0;
  get geolocPosition() {
    return this.vechiclePosition.gps === undefined
      ? [0, 0]
      : this.vechiclePosition.gps;
  }

  get center() {
    return this.geolocPosition;
  }
}
</script>
<style scoped>
.vl-map {
  border-radius: 0.5rem;
}
</style>