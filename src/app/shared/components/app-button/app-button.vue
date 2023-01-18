<template>
  <b-button 
  :v-if="!superAdminProtected || (superAdminProtected && isSuperAdmin)"
  :variant="variant" 
  :type="type" 
  :class="'app-button ' + (round ? 'app-button-round' : '') + cls"
  :disabled="isDisabled"
  :size="size"
  :title="realTitle"
  @click="onClick">
    <span class="app-button-loading" v-show="loading"><b-spinner small></b-spinner></span>
    <b-icon v-if="icon" :icon="icon" class="app-button-icon" />
    <div class="app-button-super-admin-shaded" v-show="showSuperAdminShaded"><div></div></div>
    <span :class="'app-button-content' + (hideText ? ' text-hidden' : '') + (icon ? ' has-icon' : '')">
      <slot />
    </span>
    <app-super-admin-marker v-if="showSuperAdminIcon" />
  </b-button>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";

@Component({
  name: "app-button",
  components: {
    AppSuperAdminMarker,
  }
})
export default class AppButton extends BaseAuthComponent {
  @Prop({ default: "button" }) type!: string;
  @Prop({ default: "" }) cls!: string;
  @Prop({ default: "primary" }) variant!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "" }) size!: string;
  @Prop({ default: "" }) title!: string;
  @Prop({ default: null }) icon!: string | null;
  @Prop({ default: false }) hideText!: boolean;
  @Prop({ default: false }) superAdminProtected!: boolean;
  @Prop({ default: false }) round!: boolean;

  realTitle = "";

  async created() {
    this.realTitle = this.title;
    if (this.superAdminProtected) {
      this.realTitle += " (" + this.$t("protected-super-admin-only").toString() + ")";
    }
  }

  get isDisabled() {
    return this.loading || this.disabled;
  }

  onClick(e: Event) {
    this.$emit("click", e);
  }

  get showSuperAdminShaded(): boolean {
    return this.superAdminProtected && !!this.icon && (this.hideText || !this.$slots.default);
  }

  get showSuperAdminIcon(): boolean {
    return this.superAdminProtected && !!this.$slots.default;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-button {
  position: relative;

  &-round {
    border-radius: 100px !important;
    padding: 0.5em !important;
    text-align: center;

    .app-button-super-admin-shaded {
      border-radius: 100px;
    }
  }

  &-loading {
    margin-right: 5px;
  }

  &-content.has-icon {
    padding-left: 5px;
    vertical-align: text-bottom;
    display: inline-block;

    &:empty {
      padding-left: 0;
    }
  }

  &-content.text-hidden {
    transition: all 0.3s ease-in-out;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 0;
  }

  &:hover &-content.text-hidden {
    max-width: 350px;
    padding-left: 5px;
  }

  .app-button-super-admin-shaded {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;

    div {
      height: 100%;
      width: 50%;
      background-color: $black;
      opacity: 0.3;
    }
  }

  .app-button-super-admin-icon {
    padding-left: 10px;
  }
}

</style>
