<template>
  <span class="app-expl-wrap">
    <span class="app-expl-wrap-content" :class="{ 'has-expl': hasExpl }" ref="appExplTarget">
      <slot />
    </span>
    <b-popover v-if="hasExpl" :target="() => $refs.appExplTarget" triggers="hover" :placement="placement" boundary="viewport">
      <slot name="expl">
        <span v-html="expl" />
      </slot>
    </b-popover>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-expl-wrap",
})
export default class AppExplWrap extends Vue {
  @Prop({ default: "" }) expl!: string;
  @Prop({ default: "top" }) placement!: string;

  get hasExpl(): boolean {
    return !!(this.expl || this.$slots.expl);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-expl-wrap {
  &-content.has-expl {
    text-decoration: underline;
    text-decoration-color: $blue;
    text-decoration-style: dotted;
    text-decoration-thickness: 1px;
  }
}
</style>
