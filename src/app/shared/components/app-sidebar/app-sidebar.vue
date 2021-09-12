<template>
  <div :class="'app-sidebar ' + (isOpen && 'open' || '')">
    <div class="app-sidebar-container">
      <div class="app-sidebar-inner">
        <slot></slot>
      </div>
    </div>
    <b-button variant="secondary" size="sm" class="toggle-button"  @click="onToggle()">
      <b-icon :icon="isOpen && 'arrow-bar-left' || 'arrow-bar-right'"></b-icon>
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  name: "app-sidebar"
})
export default class AppSidebar extends Vue {
  @Prop({ default: true }) open!: boolean;

  isOpen = this.open;

  onToggle(): void {
    this.isOpen = !this.isOpen;

    this.$emit("toggled", this.isOpen);
  }
}

</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$sidebar-width: 400px;

.app-sidebar {
  position: relative;
  box-sizing: border-box;
  width: 0;
  height: 100%;
  transition: width 0.3s ease-in-out;
  background-color: $white;
  z-index: 10;

  .app-sidebar-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .app-sidebar-inner {
      position: absolute;
      top: 0;
      left: -$sidebar-width;
      width: $sidebar-width;
      height: 100%;
      transition: all 0.3s ease-in-out;
    }
  }

  &.open {
    width: $sidebar-width;

    .app-sidebar-container .app-sidebar-inner {
      left: 0;
    }
  }

  .toggle-button {
    position: absolute;
    top: 0.5em;
    border: none;
    left: calc(100% - 1px);
    color: $blue;
    border: 1px solid $border-color-grey;
    border-left-color: $white;

    &:hover {
      background-color: $background-grey;
    }
  }
}
</style>