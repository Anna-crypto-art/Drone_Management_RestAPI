<template>
  <div class="app-sidebar" :class="{open:open}">
    <div class="app-sidebar-container">
      <div class="app-sidebar-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";

@Component({
  name: "app-sidebar",
  components: {
    AppIconAnalysis,
    AppIconObservations,
  }
})
export default class AppSidebar extends Vue {
  @Prop({ default: true }) open!: boolean;
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-sidebar {
  position: relative;
  box-sizing: border-box;
  margin-left: 40px;
  width: 0;
  height: calc(100% - 41.4px);
  top: 41.4px;
  transition: width 0.3s ease-in-out;
  background-color: $white;
  z-index: 10;

  &-sidebar-container {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .app-sidebar-inner {
      position: absolute;
      top: 0;
      left: calc($sidebar-width * -1);
      width: $sidebar-width;
      height: 100%;
      transition: all 0.3s ease-in-out;

      --sidebar-width: $sidebar-width;
    }
  }

  &.open {
    width: $sidebar-width;

    .app-sidebar-container .app-sidebar-inner {
      left: 0;
    }
  }
}

</style>