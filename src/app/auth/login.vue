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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AppAuthContainer from './shared/components/auth-container.vue';
import volateqApi from '../shared/services/volateq-api/volateq-api';
import AppLoginInterface from './login.vue';

@Component({
  name: 'app-login',
  components: {
    AppAuthContainer,
  }
})
export default class AppLogin extends Vue implements AppLoginInterface {
  email = '';
  password = '';
  msg = '';
  show = false;

  public async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    try {
      await volateqApi.login(this.email, this.password);
    } catch (e) {
      this.msg = e.message;
      this.show = true;
    }
  }
}
</script>

<style>
.invalid-login-alert {
  margin-top: 1rem;
}
</style>