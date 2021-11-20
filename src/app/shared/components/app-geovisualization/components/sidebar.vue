<template>
  <div :class="'volateq-sidebar' + (open ? ' volateq-sidebar-open' : '')">
    <div class="volateq-sidebar-header">
      <span class="volateq-sidebar-header-close" @click="toggle">&times;</span>
      <span v-if="title" class="volateq-sidebar-header-title">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop() name!: string;
  @Prop() title!: string;
  @Prop({ default: true }) openState!: boolean;

  private static names: Record<string, Sidebar> = {};

  public open!: boolean;
  public static toggle(name: string): void {
    if (this.names[name]) {
      this.names[name].toggle();
    } else {
      throw new Error(`No such sidebar ${name}`);
    }
  }

  public created(): void {
    Sidebar.names[this.name] = this;
    this.open = this.openState;
  }

  public beforeUnmount(): void {
    delete Sidebar.names[this.name];
  }

  public toggle(): void {
    this.open = !this.open;
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
$open-width: 300px;
$header-height: 50px;

.volateq-sidebar {
  position: absolute;
  height: 100%;
  width: $open-width;
  right: -$open-width;

  pointer-events: all;

  background-color: white;

  transition: right 0.2s ease-in-out;

  &-header {
    height: $header-height;
    padding: 15px;
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &-close {
      cursor: pointer;
      font-size: 2rem;
    }

    &-title {
      font-size: x-large;
    }
  }

  &-body {
    width: 100%;
    height: 100%;
  }

  &-open {
    right: 0;
    box-shadow: 0 0 10px lightgray;
  }
}
</style>