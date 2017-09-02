
<template>
  <div id="app">
    <v-navbar></v-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    'v-navbar': Navbar,
  },
};
</script>

<style lang="scss">
@import "~tachyons/css/tachyons.css";
@import "~colors.css/css/colors.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
