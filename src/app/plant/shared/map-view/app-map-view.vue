<template>
  <div id="appMapView" class="app-map-view" v-if="map">
    <app-map :map="map" />
    <app-map-controls :map="map" />
    <app-map-pop-buttons>
      <app-map-view-settings :plant="plant" :map="map" />
    </app-map-pop-buttons>
  </div>
</template>

<script lang="ts">
import AppMapControls from "@/app/shared/components/app-map/app-map-controls.vue";
import AppMap from "@/app/shared/components/app-map/app-map.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop } from "vue-property-decorator";
import AppMapPopButtons from "@/app/shared/components/app-map/app-map-pop-buttons.vue";
import AppMapViewSettings from "./app-map-view-settings.vue";
import { ComponentLayer } from "../visualization/layers/component-layer";
import { plantViewEventService } from "../../plant-view-event-service";
import { PlantViewEvent } from "../../types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";


@Component({
  name: "app-map-view",
  components: {
    AppMap,
    AppMapControls,
    AppMapPopButtons,
    AppMapViewSettings,
  },
})
export default class AppMapView extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) componentLayerTypes!: typeof ComponentLayer[];

  map: Map | null = null;

  async created() {
    this.map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  public async setLoading(loading: boolean) {
    await plantViewEventService.emit(this.plant.id, PlantViewEvent.TOGGLE_LOADING, loading);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix that toaster overlays popover
.b-popover {
  z-index: 1101;
}

.app-map-view {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;
}
</style>