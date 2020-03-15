<template>
  <div class="home">
    <div class="logo-container">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <!-- <p v-if="isConnected">We're connected to the server!</p> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { namespace } from "vuex-class";
import { Component } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

const SocketNameSpace = namespace("webSocketState/");
@Component({
  name: "Home",
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  @SocketNameSpace.Getter("isConnected") isConnected!: boolean;
  @SocketNameSpace.Action("connect") connect: any;
  @SocketNameSpace.Action("getMessages") getMessages: any;

  created() {
    this.connect();
  }

  mounted() {
    if (this.isConnected) {
      this.getMessages();
    }
  }
}
</script>
<style lang="scss">
.home {
  margin: 0;
  padding: 0;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  height: 90px;
  background-color: white;
  padding: auto;

  > img {
    height: 50px;
    margin: auto 0 auto 2rem;
  }
}
</style>
