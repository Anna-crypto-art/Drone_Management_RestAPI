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
import { AppAuthContainer } from "@/app/auth/shared/components";
import { volateqApi } from "@/app/shared/services";

export default {
  name: 'app-login',
  components: {
    AppAuthContainer,
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      try {
        await volateqApi.login(this.email, this.password);
      } catch (e) {
        this.msg = e.message;
        this.show = true;
      }
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