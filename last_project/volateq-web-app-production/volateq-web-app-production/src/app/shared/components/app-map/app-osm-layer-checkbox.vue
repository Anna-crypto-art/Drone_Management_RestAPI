<template>
  <div class="app-osm-layer-checkbox">
    <b-form-checkbox v-model="selected" @change="onChange">
      {{ $t("world-map") }}
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Map from "ol/Map";
import { Component, Prop, Watch } from "vue-property-decorator";
import { CatchError } from "../../services/helper/catch-helper";
import { BaseComponent } from "../base-component/base-component";
import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";
import TileSource from "ol/source/Tile";


@Component({
  name: "app-osm-layer-checkbox",
  components: {
  },
})
export default class AppOsmLayerCheckbox extends BaseComponent {
  @Prop({ required: true }) map!: Map;
  @Prop({ default: true }) value!: boolean;
  @Prop({ default: true }) satellite!: boolean;

  private osmLayer: TileLayer<TileSource> | undefined = undefined;
  private selected = false;

  async created() {
    this.selected = this.value;
  }

  @Watch("value")
  onValueChanged() {
    this.selected = this.value;
  }

  @CatchError()
  async mounted() {
    await this.loadOsmLayer();
  }

  unmounted() {
    this.unloadLayer();
  }

  @CatchError()
  async onChange() {
    this.$emit("input", this.selected);

    await this.loadOsmLayer();
  }

  @Watch("satellite")
  async onSatelliteChanged() {
    this.unloadLayer();
    await this.loadOsmLayer();
  }

  private async loadOsmLayer(): Promise<void> {
    if (this.selected) {
      if (!this.osmLayer) {
        this.osmLayer = await this.loadOsmTileLayer();
      }

      this.osmLayer!.setVisible(true);
    } else {
      if (this.osmLayer) {
        this.osmLayer.setVisible(false);
      }
    }
  }

  private unloadLayer() {
    if (this.osmLayer) {
      this.osmLayer.setVisible(false);
      this.map.removeLayer(this.osmLayer);
      this.osmLayer = undefined;
    }
  }

  private async loadOsmTileLayer(): Promise<TileLayer<TileSource>> {
    try {
      this.$emit("loading", true);

      let mapLayer!: TileLayer<TileSource>;

      if (this.satellite) {
        mapLayer = new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          })
        });
      } else {
        mapLayer = new TileLayer({ source: new OSM() });
      }

      this.map.addLayer(mapLayer);

      return mapLayer;
    } finally {
      this.$emit("loading", false);
    } 
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

</style>
