<template>
  <open-layers v-if="hasLayers" :layers="layers" :zoom="5" :center="center"></open-layers>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { LayerType, OpenLayers } from 'volateq-geovisualization';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { Style, Stroke } from 'ol/style';


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;

  layers: LayerType[] = [];
  center = [0, 0];

  async created() {
    this.layers.push({
      name: "dt",
      type: "geojson",
      style: () => {
        return new Style({
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 1
          })
        });
      },
      geoJSONOptions: {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      },
      geoJSONLoader: (): Promise<Record<string, unknown>> => {
        console.log('load dt...');

        return volateqApi.getFieldgeometry(this.plant.customer_id, this.plant.id)
      }
    });
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }
}
</script>

<style lang="scss">
.openlayers-map {
  height: 500px;
  width: 100%;
}
</style>