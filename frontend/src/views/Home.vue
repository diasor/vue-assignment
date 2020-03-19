<template>
  <div class="home">
    <!-- <p v-if="isConnected">We're connected to the server!</p> -->
    <HelloWorld msg="Welcome to Your Vue.js App ACA" />
    <button @click="selectVehicle">Select Vehicle</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

const SocketNameSpace = namespace('webSocketState/');
@Component({
  name: 'Home',
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  @SocketNameSpace.Getter('isConnected') isConnected!: boolean;
  @SocketNameSpace.Action('connect') connect: any;
  @SocketNameSpace.Action('selectVehicleData') selectVehicleData: any;

  selectVehicle() {
    this.selectVehicleData().then(() => {
      this.$router.push({ path: '/vehicle' });
    });
  }

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
