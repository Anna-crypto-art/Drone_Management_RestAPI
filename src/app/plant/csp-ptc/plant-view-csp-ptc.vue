<template>
  <div>
    <b-form-checkbox :checked="showPcs" :change="toggleShowPCS">{{ $t('show-pcs') }}</b-form-checkbox>
    <open-layers v-if="hasLayers" :layers="layers" :zoom="5" :center="[0, 0]"></open-layers>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { LayerType, OpenLayers } from 'volateq-geovisualization';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;

  layers: LayerType[] = [];
  showPCS = true;

  async created() {
    this.layers.push({
      name: "SCAs",
      type: "geojson",
      style: (feature: FeatureLike, resolution: number) => {
        console.log(this.showPCS)

        return new Style({
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 1,
          }),
          text: new Text({
            text: this.showPCS && feature.get('name') || '',
            overflow: true,
            rotation: -(Math.PI / 2),
          }) || undefined
        });
      },
      geoJSONOptions: {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      },
      geoJSONLoader: (): Promise<Record<string, unknown>> => {
        console.log('load dt...');

        return volateqApi.getComponentsGeoVisual(this.plant.id, [AnalysisResultComponent.CSP_PTC_SCA]);
      },
      selected: true,
      autoZoom: true
    });
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  toggleShowPCS(showPcs: boolean) {
    this.showPCS = showPcs;
  }
}
</script>

<style lang="scss">
.openlayers-map {
  height: 500px;
  width: 100%;
}
</style>