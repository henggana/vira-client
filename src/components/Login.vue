<script>
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapState({
      isLoggingIn: state => state.auth.isLoggingIn,
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoginFailure: state => state.auth.isLoginFailure,
    }),
    username: {
      get() {
        return this.$store.state.auth.username;
      },
      set(value) {
        this.$store.commit('updateUsername', value);
      },
    },
    password: {
      get() {
        return this.$store.state.auth.password;
      },
      set(value) {
        this.$store.commit('updatePassword', value);
      },
    },
    submitText() {
      return this.isLoggingIn ? 'Logging in ...' : 'Login';
    },
    disableSubmit() {
      return this.$v.$dirty && this.$v.$invalid;
    },
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.replace('/dashboard');
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.replace('/dashboard');
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$store.dispatch('login');
    },
  },
};
</script>


<template>
  <div>
    <div class="measure-narrow center">
      <h1 class="mt5">Login</h1>
      <div
        class="mt1 light-red"
        v-show="isLoginFailure"
      >
        Username or password is invalid
      </div>
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
            name="username"
            type="text"
            class="pa2 input-reset ba bg-transparent w-100"
            placeholder="username"
            v-model.trim="username"
            @input="$v.username.$touch()"
          />
          <div
            class="mt1 light-red"
            v-show="$v.username.$error"
          >
            Username is can not be blank
          </div>
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
            name="password"
            class="pa2 input-reset ba bg-transparent w-100"
            placeholder="********"
            v-model.trim="password"
            @input="$v.password.$touch()"
          />
          <div
            class="mt1 light-red"
            v-show="$v.password.$error"  
          >
            Password can not be blank
          </div>
        </div>
        <div class="mt3">
          <input
            class="b ph3 pv2 input-reset ba pointer f6 dib white br1"
            :class="{ 'bg-gray b--gray': disableSubmit, 'bg-blue hover-bg-navy b--blue': !disableSubmit }"
            type="submit"
            :value="submitText"
            :disabled="isLoggingIn || disableSubmit"
          />
        </div>
      </form>
    </div>
  </div>
</template>



