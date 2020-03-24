<template>
  <div class="home">
    <vehicle-dashboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import VehicleDashboard from '@/components/vehicle-data/VehicleDashboard.vue';

const SocketNameSpace = namespace('webSocketState/');
@Component({
  name: 'Home',
  components: {
    vehicleDashboard: VehicleDashboard
  }
})
export default class Home extends Vue {
  @SocketNameSpace.Getter('isConnected') isConnected!: boolean;
  @SocketNameSpace.Action('connect') connect: any;
  created() {
    this.connect();
  }
}
</script>

<style lang="scss">
.home {
  margin: 0;
  padding: 0;
}
</style>
