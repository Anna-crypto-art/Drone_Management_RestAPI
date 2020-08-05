<template>
  <div class="app-home">
    <app-header></app-header>
    <b-container>
      Home, sweet home!
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AppHeader from '../shared/components/app-header/app-header.vue';

@Component({
  name: 'app-home',
  components: {
    AppHeader
  }
})
export default class AppHome extends Vue {}
</script>

<style>

</style>
