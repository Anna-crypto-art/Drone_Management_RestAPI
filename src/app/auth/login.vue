<template>
  <div class="app-login">
    <app-auth-container title="Login">
      <b-form>
        <b-form-group label="E-Mail" label-for="email">
          <b-form-input id="email" type="email" placeholder="E-Mail" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input id="password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit">Login</b-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script>
import { AppAuthContainer } from "./shared/compontents";

export default {
  name: 'app-login',
  components: {
    AppAuthContainer,
  },
}
</script>

<style>

</style>