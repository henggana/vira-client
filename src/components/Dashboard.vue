<template>
  <div class="pa3">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  data() {
    return {
      title: 'Dashboard',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.replace('/login');
      }
    },
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.isAuthenticated) {
      this.$router.replace('/login');
    }
  },
};
</script>
