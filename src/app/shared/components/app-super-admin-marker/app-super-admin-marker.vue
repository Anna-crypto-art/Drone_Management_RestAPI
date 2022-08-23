<template>
  <small class="pad-left-half" :title="$t('protected-super-admin-only')"><b-icon icon="shield-shaded" /></small>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-super-admin-marker"
})
export default class AppSuperAdminMarker extends Vue {}
</script>

<style lang="scss">
</style>
