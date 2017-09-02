<template>
  <div class="hello pa3">
    <h1>{{ msg }}</h1>
    <h2>
      <router-link
        to="/login"
        class="link dim blue pointer">
        Login here
      </router-link
    ></h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome Vira',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
