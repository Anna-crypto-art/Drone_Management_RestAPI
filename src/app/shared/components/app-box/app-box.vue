<template>
  <div :class="'box ' + (loading ? 'loading': '')">
    <app-loading v-show="loading"></app-loading>
    <slot name="title">
      <h4 v-if="title" class="box-title">
        {{ title }}
      </h4>
    </slot>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";

@Component({
  name: "app-box",
  components: {
    AppLoading,
  }
})
export default class AppBox extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: false }) loading!: boolean;

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.box {
  position: relative;
  padding: 1em;
  background-color: $background-grey;
  margin-top: 30px;

  &-title {
    margin-bottom: 1em;
  }

  &:last-child {
    margin-bottom: 30px;
  }
}
</style>