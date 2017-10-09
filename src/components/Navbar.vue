<template>
  <nav class="dt w-100 border-box pa3 ph3-ns bg-blue">
    <div class="dtc v-mid w-25">
      <router-link
        to="/"
        title="Home"
        class="white link dim pointer"
      >
        Vira
      </router-link>
      <router-link
        to="/project"
        title="Project"
        class="ml3 white link dim pointer"
      >
        Project
      </router-link>
    </div>
    <div class="dtc v-mid w-75 tr">
      <router-link
        to="/login"
        title="About"
        class="link dim white f6 f5-ns dib mr3 mr4-ns pointer"
        v-if="!isAuthenticated"
      >
        Login
      </router-link>
      <span
        class="mr3 white"
        v-if="isAuthenticated"
      >
        Hi, {{ currentUser.username }}!
      </span>
      <a
        href="javascript:void(0)"
        class="link dim white f6 f5-ns dib mr3 mr4-ns pointer"
        @click.prevent="logout"
        v-if="isAuthenticated"
      >
        Logout
      </a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Cookies from 'js-cookie';

export default {
  name: 'Navbar',
  data() {
    return {
      title: 'The Navbar yey!',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
    currentUser() {
      return JSON.parse(Cookies.get('auth')).user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
