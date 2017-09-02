<template>
  <nav class="dt w-100 border-box pa3 ph3-ns bg-blue">
    <router-link
      to="/"
      title="Home"
      class="dtc v-mid white link dim w-25 pointer"
    >
      Vira
    </router-link>
    <div class="dtc v-mid w-75 tr">
      <router-link 
        to="/login"
        title="About"
        class="link dim white f6 f5-ns dib mr3 mr4-ns pointer"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      title: 'The Navbar yey!',
    };
  },
};
</script>
