<template>
  <ul class="app-checklist">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({ name: "app-checklist" })
export default class AppChecklist extends Vue {

}

</script>

<style lang="scss">
.app-checklist {
  list-style-type: none;
}
</style>