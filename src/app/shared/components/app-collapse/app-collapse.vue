<template>
  <div>
    <b-button
      size="sm"
      v-b-toggle="'collapse-' + name"
      :variant="collapsed ? 'primary' : 'secondary'"
    >
      <slot name="button"></slot>
    </b-button>
    <b-collapse v-model="collapsed" :id="'collapse-' + name">
      <b-card class="mar-top">
        <slot></slot>
      </b-card>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  name: "app-collapse",
})
export default class AppCollapse extends Vue {
  @Prop({ required: true }) name!: string;

  collapsed = false;
}
</script>
