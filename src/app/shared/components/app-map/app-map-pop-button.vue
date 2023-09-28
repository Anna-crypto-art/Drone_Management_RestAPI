<template>
  <div class="app-map-pop-button">
    <app-button :variant="popupVisible ? 'primary' : 'secondary'" :icon="icon" @click="showPopup" />
    <div class="app-map-pop-button-popup" v-show="popupVisible">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { CatchError } from "../../services/helper/catch-helper";
import AppButton from "../app-button/app-button.vue";
import { BaseComponent } from "../base-component/base-component";

@Component({
  name: "app-map-pop-button",
  components: {
    AppButton,
  },
})
export default class AppMapPopButton extends BaseComponent {
  @Prop({ required: true }) icon!: string;

  popupVisible = false;

  @CatchError()
  showPopup() {
    this.popupVisible = !this.popupVisible;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-map-pop-button {
  position: relative;
  overflow: visible;

  &-popup {
    width: 200px;
    position: absolute;
    left: calc(-200px - 0.5em);
    top: 0;
    padding: 1em;
    border: 1px solid $border-color-grey;

    @supports (backdrop-filter: blur(5px)) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.7);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.8);
    }
  }
}

</style>
