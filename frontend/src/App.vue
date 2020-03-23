<template>
  <div id="app">
    <div class="green-bar">
      <label> English </label>
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
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {
  el = "#viricity";
}
</script>

<style lang="scss">
@import "@/assets/sass/variables";
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
  background-color: white;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  padding: auto;
  width: 30%;
  > img {
    height: 50px;
    margin: auto 0 auto 2rem;
  }
}

.nav {
  display: flex;
  justify-content: flex-end;
  width: 70%;
  margin: 0;
  padding: 10px 0 0 0;

  a {
    max-height: 30px;
    padding: 10px 2rem 0 0;
    font-size: 14px;
    color: #363636;
    text-decoration: none;

    &:hover {
      color: $light-green;
    }
  }
}
</style>

<!--Load in global css stylesheet-->
<style lang="scss" src="./assets/sass/main.scss"></style>
