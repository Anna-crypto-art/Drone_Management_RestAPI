<template>
  <div class="app-home">
    <app-header></app-header>
    <b-container>
      Home, sweet home!
      <br>
      <b-button @click="logout">Logout</b-button>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import router from '../app-routes';
import volateqApi from '../shared/services/volateq-api/volateq-api';
import AppHeader from '../shared/components/app-header/app-header.vue';

@Component({
  name: 'app-home',
  components: {
    AppHeader
  }
})
export default class AppHome extends Vue {
  async logout() {
    try {
      await volateqApi.logout();
      
      router.push({ name: 'Login' })
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style>

</style>
