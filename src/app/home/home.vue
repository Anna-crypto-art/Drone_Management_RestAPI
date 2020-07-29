<template>
  <div class="app-home">
    Home, sweet home!
    <br>
    <b-button @click="logout">Logout</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import router from '../app-routes';
import volateqApi from '../shared/services/volateq-api/volateq-api';

@Component({
  name: 'app-home',
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
