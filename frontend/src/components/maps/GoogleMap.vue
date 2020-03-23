<template>
  <div>
    <gmap-map :center="center" :zoom="15" style="width:100%;  height: 15rem;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { forEach } from 'lodash';

interface GeoPosition {
  lat: number;
  lng: number;
}
@Component({
  name: 'GoogleMap'
})
export default class GoogleMap extends Vue {
  @Prop({ required: true }) currentPosition!: any;
  @Prop({ required: true }) previousPositions!: any;

  zoom: number = 1;
  rotation: number = 0;
  center: GeoPosition = { lat: 52.080482482910156, lng: 5.117841720581055 };
  markers: any[] = [];

  geoLocate() {
    if (this.currentPosition.gps) {
      const marker = {
        lat: this.currentPosition.gps[0],
        lng: this.currentPosition.gps[1]
      };
      this.markers.push({
        position: marker,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }
      });
      this.center = marker;
    }

    if (this.previousPositions.length > 0) {
      forEach(this.previousPositions, (position: any) => {
        const pastMarker = {
          lat: position.gps[0],
          lng: position.gps[1]
        };
        this.markers.push({
          position: pastMarker,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            size: { width: 46, height: 46, f: 'px', b: 'px' },
            scaledSize: { width: 23, height: 23, f: 'px', b: 'px' }
          }
        });
      });
    }
  }

  mounted() {
    this.geoLocate();
  }
}
</script>
