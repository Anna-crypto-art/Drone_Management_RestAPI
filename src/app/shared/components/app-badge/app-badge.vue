<template>
  <div class="app-badge" :style="'background-color: ' + color + '; color: ' + textColor + ';'">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import { calcBlackOrWhiteTextContrast } from "../../services/helper/color-helper";

@Component({
  name: "app-badge",
  components: {
    AppLoading,
  }
})
export default class AppBadge extends Vue {
  @Prop({ required: true }) color!: string;

  textColor = "";

  @Watch("color", { immediate: true })
  onColorChanged() {
    this.textColor = calcBlackOrWhiteTextContrast(this.color);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-badge {
  display: inline-block;
  font-size: 12px;
  padding: 0.1em 0.75em;
  border-radius: 10em;
  margin-right: 0.5em;
  font-weight: bold;
}
</style>