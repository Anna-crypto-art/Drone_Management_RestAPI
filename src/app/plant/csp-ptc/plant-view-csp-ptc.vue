<template>
  <open-layers v-if="hasLayers" :layers="layers" :zoom="15"></open-layers>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { LayerType, OpenLayers } from 'volateq-geovisualization';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;

  layers: LayerType[] = [];

  async created() {
    this.layers.push({
      name: "dt",
      type: "geojson",
      geoJSONLoader: (): Promise<Record<string, unknown>> => {
        console.log('load dt...');

        return volateqApi.getFieldgeometry(this.plant.customer_id, this.plant.id)

        // return {
        //   type: "FeatureCollection",
        //   crs: {
        //     type: 'name',
        //     properties: {
        //       'name': 'EPSG:3857',
        //     },
        //   },
        //   features: [
        //     {
        //       type: "Feature",
        //       geometry: {
        //         type: "Polygon",
        //         coordinates: [
        //           [
        //             [0, 118],
        //             [2920, 118],
        //             [2920, 0],
        //             [0, 0]
        //           ]
        //         ]
        //       }
        //     }
        //   ]
        // };
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