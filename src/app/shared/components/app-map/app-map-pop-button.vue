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
import { MapPopButtonsEvent, mapPopButtonsEventService } from "./map-pop-buttons-event-service";

@Component({
  name: "app-map-pop-button",
  components: {
    AppButton,
  },
})
export default class AppMapPopButton extends BaseComponent {
  @Prop({ required: true }) icon!: string;

  id = Math.random().toString();
  popupVisible = false;

  async created() {
    mapPopButtonsEventService.on("AppMapPopButton", MapPopButtonsEvent.POPUP, (id: string) => {
      if (id != this.id && this.popupVisible) {
        this.popupVisible = false;
      }
    });
  }

  @CatchError()
  showPopup() {
    this.popupVisible = !this.popupVisible;

    mapPopButtonsEventService.emit("AppMapPopButton", MapPopButtonsEvent.POPUP, this.id);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-map-pop-button {
  position: relative;
  overflow: visible;

  .app-button {
    box-shadow: 3px 3px 5px $dark-40pc;
  }

  &-popup {
    width: 200px;
    position: absolute;
    left: calc(-200px - 0.5em);
    top: 0;
    padding: 1em;
    border: 1px solid $border-color-grey;
    box-shadow: 3px 3px 5px $dark-40pc;

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
