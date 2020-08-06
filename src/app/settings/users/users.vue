<template>
  <app-content :title="$t('usermanagement')" :navback="true" :subtitle="$t('usermanagement_descr')">
    <div class="app-settings-users">

    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppContent from "../../shared/components/app-content/app-content.vue";

@Component({
  name: "app-users",
  components: {
    AppContent
  }
})
export default class AppUsers extends Vue {}
</script>

<style>

</style>
