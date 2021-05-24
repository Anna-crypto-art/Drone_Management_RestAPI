<template>
  <div :class="'app-table-container ' + (size ? `app-table-container-${size}` : '')">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class AppTableContainer extends Vue {
  @Prop({ default: '' }) size!: '' | 'sm';
}
</script>

<style lang="scss">
.app-table-container {
  margin-top: 30px;

  &-sm {
    font-size: .8rem;
    
    .b-table {
      td {
        padding: .5rem;
      }  
    }
  }

}

</style>
