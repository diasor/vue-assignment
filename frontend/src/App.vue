<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #7ca363;
  font-family: Monteserrat, Arial;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

#nav {
  height: 30px;
  margin: 0;
  padding: 10px 0 0 0;
  background-color: rgb(97, 126, 78);

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
</style>