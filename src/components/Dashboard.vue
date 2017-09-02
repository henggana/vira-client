<template>
  <div class="pa3">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      title: 'Dashboard',
    };
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.isAuthenticated) {
      this.$router.replace('/');
    }
  },
};
</script>
