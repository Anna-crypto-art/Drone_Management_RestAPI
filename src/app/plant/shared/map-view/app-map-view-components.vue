<template>
  <div class="app-map-view-components">
    <app-map-pop-button icon="app-indicator">
      <h4 class="mar-bottom">{{ $t("components") }}</h4>
      
      
    </app-map-pop-button>
  </div>
</template>

<script lang="ts">
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop } from "vue-property-decorator";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { ComponentLayer } from "../visualization/layers/component-layer";


@Component({
  name: "app-map-view-components",
  components: {
    AppMapPopButton,
  },
})
export default class AppMapViewComponents extends BaseComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;
  @Prop({ required: true }) componentLayerTypes!: typeof ComponentLayer[];

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-components {
  overflow: visible;
}
</style>