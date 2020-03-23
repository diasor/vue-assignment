<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div class="logo-container">
      <img alt="Vue logo" src="./assets/logo.png" />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'App'
})
export default class App extends Vue {
  el = '#viricity';
}
</script>

<style lang="scss">
@import '@/assets/sass/variables';
body {
  margin: 0;
  padding: 0;
  background-color: $light-green;
  font-family: $font-family;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  height: 25px;
  margin: 0;
  padding: 10px 0 0 0;
  background-color: $dark-green;

  a {
    max-height: 30px;
    padding: 10px 5px 0 0;
    color: white;

    // &.router-link-exact-active {
    //   background-color: white;
    //   color: rgb(97, 126, 78);
    // }
  }
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  background-color: white;
  padding: auto;

  > img {
    height: 50px;
    margin: auto 0 auto 2rem;
  }
}
</style>


<!--Load in global css stylesheet-->
<style lang="scss" src="./assets/sass/main.scss"></style>