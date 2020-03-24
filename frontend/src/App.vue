<template>
  <div id="app">
    <div class="green-bar">
      <label>English</label>
    </div>
    <div class="navigation-container">
      <div class="logo-container">
        <img alt="Vue logo" src="./assets/logo.png" />
      </div>
      <div class="nav">
        <router-link to="/">VEHICLE DASHBOARD</router-link>
        <router-link to="/documentation">DOCUMENTATION</router-link>
      </div>
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
html,
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
  min-width: 100vw;
  margin: 0;
}

.green-bar {
  height: 25px;
  margin: 0;
  padding: 10px 2rem 0 0;
  background-color: $dark-green;
  text-align: right;

  & label {
    color: white;
  }
}

.navigation-container {
  display: flex;
  justify-content: space-between;
  height: 60px;
  min-width: 100%;
  background-color: white;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  padding: auto;
  width: 10%;
  > img {
    height: 25px;
    margin: auto 0 auto 0.5rem;
  }

  @media screen and (min-width: $medium-screen) {
    width: 30%;
    > img {
      height: 50px;
      margin: auto 0 auto 2rem;
    }
  }
}

.nav {
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin: 0;
  padding: 10px 0 0 0;

  a {
    max-height: 30px;
    padding: 1rem 1rem 0 0;
    font-size: 10px;
    color: #363636;
    text-decoration: none;

    &:hover {
      color: $light-green;
    }

    @media screen and (min-width: $tablet-screen) {
      padding: 15px 2rem 0 0;
      font-size: 12px;
    }

    @media screen and (min-width: $medium-screen) {
      padding: 10px 2rem 0 0;
      font-size: 14px;
    }
  }
}
</style>

<!--Load in global css stylesheet-->
<style lang="scss" src="./assets/sass/main.scss"></style>
