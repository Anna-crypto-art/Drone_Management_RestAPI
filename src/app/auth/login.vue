<template>
  <div class="app-login">
    <app-auth-container title="Login">
      <b-form @submit="onSubmit">
        <b-form-group label="E-Mail" label-for="email">
          <b-form-input id="email" v-model="email" type="email" placeholder="E-Mail" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input id="password" v-model="password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit">Login</b-button>
      </b-form>
      <b-alert class="invalid-login-alert" v-model="show" variant="danger" dismissible>
        {{msg}}
      </b-alert>
    </app-auth-container>
  </div>
</template>

<script>
import { AppAuthContainer } from "./shared/compontents";
import { httpClient } from "../shared/services";

export default {
  name: 'app-login',
  components: {
    AppAuthContainer,
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      httpClient.post('/auth/login');

      this.msg = 'hello fellow!';
      this.show = true;
    }
  },
  data() {
    return {
      email: '',
      password: '',
      msg: '',
      show: false
    }
  }

}
</script>

<style>
.invalid-login-alert {
  margin-top: 1rem;
}
</style>