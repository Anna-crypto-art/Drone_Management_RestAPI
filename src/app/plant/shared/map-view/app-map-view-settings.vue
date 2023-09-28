<template>
  <div class="app-map-view-settings">
    <app-map-pop-button icon="gear-fill">
      <h4 class="mar-bottom">{{ $t("map-settings") }}</h4>
      <app-box class="no-mar-top mar-bottom">
        <b-form-checkbox v-model="satelliteView" switch @change="onSatelliteViewChanged">
          {{ $t("satellite-view") }}
        </b-form-checkbox>
      </app-box>

      <app-osm-layer-checkbox :map="map" :satellite="satelliteView" v-model="osmSelected" />
    </app-map-pop-button>
  </div>
</template>

<script lang="ts">
import AppOsmLayerCheckbox from "@/app/shared/components/app-map/app-osm-layer-checkbox.vue";
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop } from "vue-property-decorator";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";


const STORAGE_KEY_MULTISELECTION = "storage-key-multiselection";
const STORAGE_KEY_SHOWUNDEFINED = "storage-key-showundefined";
const STORAGE_KEY_SATELLITEVIEW = "storage-key-satelliteview";


@Component({
  name: "app-map-view-settings",
  components: {
    AppMapPopButton,
    AppOsmLayerCheckbox,
    AppBox,
  },
})
export default class AppMapViewSettings extends BaseComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;

  osmSelected = true;
  satelliteView = true;

  async created() {
    this.satelliteView = appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW);
  }

  @CatchError()
  onSatelliteViewChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SATELLITEVIEW, this.satelliteView);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-settings {
  overflow: visible;
}
</style>