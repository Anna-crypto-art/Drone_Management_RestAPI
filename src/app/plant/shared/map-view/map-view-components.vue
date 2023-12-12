<template>
  <div class="app-map-view-components">
    <app-map-pop-button icon="app-indicator">
      <p class="mar-bottom-half grayed"><b-icon icon="app-indicator" /><span class="pad-left-half">{{ $t("components") }}</span></p>
      <app-geo-json-layer-checkbox v-for="componentLayer in componentLayers" :key="componentLayer.id"
        :geoLayer="componentLayer"
        :map="map"
      />
    </app-map-pop-button>
  </div>
</template>

<script lang="ts">
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map } from "ol";
import { Component, Prop } from "vue-property-decorator";
import { ComponentLayer } from "./layers/component-layer";
import AppGeoJsonLayerCheckbox from "@/app/shared/components/app-map/app-geo-json-layer-checkbox.vue";
import { LayersService } from "./layers/layers-service";


@Component({
  name: "app-map-view-components",
  components: {
    AppMapPopButton,
    AppGeoJsonLayerCheckbox,
  },
})
export default class AppMapViewComponents extends BaseComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;
  @Prop({ required: true }) componentLayerTypes!: typeof ComponentLayer[];

  componentLayers: ComponentLayer[] = [];

  created() {
    this.setupComponentLayers();
  }

  private setupComponentLayers() {
    this.componentLayers = this.componentLayerTypes
      .map(componentType => new (componentType as any)(this.plant));

    LayersService.get(this.plant.id).addLayers(this.componentLayers);
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-components {
  overflow: visible;
}
</style>