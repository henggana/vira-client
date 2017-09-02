<template>
  <div>
    <div class="measure-narrow center">
      <h1 class="mt5">Login</h1>
      <form
        @submit.prevent="submit">
        <div class="mt3">
          <label
            for="login-username"
            class="db fw6 lh-copy f6"
          >
            Username
          </label>
          <input
            type="text"
            class="pa2 input-reset ba bg-transparent w-100"
            placeholder="username"
          />
        </div>
        <div class="mt3">
          <label
            for="login-password"
            class="db fw6 lh-copy f6"
          >
            Password
          </label>
          <input
            type="password"
            class="pa2 input-reset ba bg-transparent w-100"
            placeholder="********"
          />
        </div>
        <div class="mt3">
          <input
            class="b ph3 pv2 input-reset ba b--blue bg-transparent hover-bg-navy
                   pointer f6 dib white bg-blue br1"
            type="submit"
            :value="submitText"
            :disabled="isLoggingIn"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState({
      isLoggingIn: state => state.auth.isLoggingIn,
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
    submitText() {
      return this.isLoggingIn ? 'Logging in ...' : 'Login';
    },
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.replace('/dashboard');
      }
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('login');
    },
  },
};
</script>

