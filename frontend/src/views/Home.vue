<template>
  <div class="home">
    <Vehicle />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import Vehicle from '@/views/Vehicle.vue';

const SocketNameSpace = namespace('webSocketState/');
@Component({
  name: 'Home',
  components: {
    Vehicle
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
