<template>
  <div>
    <open-layers v-if="hasLayers" :layers="layers"></open-layers>
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
import { AnalysisResultKeyFigure } from '@/app/shared/services/volateq-api/api-analysis-result-key-figures';
import { AnalysisResultDetailedSchema, AnalysisResultSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;

  layers: LayerType[] = [];
  showPCS = false;

  async created() {
    // Temporary code....
    const analysisResultId = (await volateqApi.getAllAnalysis(this.plant.customer_id))
      .filter(analysis => analysis.analysis_result)[0].analysis_result.id;
    const analysisResult = await volateqApi.getAnalysisResult(analysisResultId);
    

    const geoJSONOptions = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };
    const showText = (feature: FeatureLike): Text | undefined => {
      return new Text({
        text: this.showPCS && feature.get('name') || '',
        overflow: true,
        rotation: -(Math.PI / 2),
      }) || undefined
    }

    this.layers.push(
      {
        name: this.$t('world-map').toString(),
        type: "osm",
        selected: true,
        childLayers: undefined
      },
      {
        name: this.$t('pcs').toString(),
        type: "custom",
        customLoader: () => undefined,
        onSelected: (selected: boolean) => { this.showPCS = selected; },
        selected: false
      },
      {
        name: this.$t('components').toString(),
        type: "group",
        childLayers: [
          {
            name: this.$t('solar-collector-assembly').toString(),
            type: "geojson",
            style: (feature: FeatureLike, resolution: number) => {
              return new Style({
                stroke: new Stroke({
                  color: '#888888',
                  width: 1,
                }),
                text: showText(feature)
              });
            },
            geoJSONOptions,
            geoJSONLoader: () => volateqApi.getComponentsGeoVisual(this.plant.id, [AnalysisResultComponent.CSP_PTC_SCA]),
            selected: true,
            autoZoom: true,
          },
          {
            name: this.$t("absorber-tubes").toString(),
            type: "geojson",
            style: (feature: FeatureLike) => {
              return new Style({
                stroke: new Stroke({
                  color: '#000000',
                  width: 1,
                }),
                text: showText(feature),
              });
            },
            geoJSONOptions,
            geoJSONLoader: () => volateqApi.getComponentsGeoVisual(this.plant.id, [AnalysisResultComponent.CSP_PTC_ABSORBER]),
            selected: false
          },
          {
            name: this.$t("single-collector-elements").toString(),
            type: "geojson",
            style: (feature: FeatureLike) => {
              return new Style({
                fill: new Fill({
                  color: '#aaaaaa',
                }),
                text: showText(feature),
              });
            },
            geoJSONOptions,
            geoJSONLoader: () => volateqApi.getComponentsGeoVisual(this.plant.id, [AnalysisResultComponent.CSP_PTC_SCE]),
            selected: false,
          },
        ]
      }
    );

    const kpiLayers: LayerType[] = [];
    if (this.hasKeyFigure(analysisResult, AnalysisResultKeyFigure.IR_INTENSITY_ID)) {
      const classColors = {"1": "blue", "2": "green" ,"3": "yellow", "4": "red"};

      kpiLayers.push({
        name: this.$t("ir-intensity").toString(),
        type: "geojson",
        style: (feature: FeatureLike) => {
          const classification = feature.get('class')
          const color = classification && classColors[classification]

          return new Style({
            stroke: color && new Stroke({
              color: color,
              width: 3,
            }),
            text: showText(feature),
          });
        },
        geoJSONOptions,
        geoJSONLoader: () => volateqApi.getKeyFiguresGeoVisual(this.plant.id, analysisResult.id, [AnalysisResultKeyFigure.IR_INTENSITY_ID]),
        selected: false,
      })
    }

    if (kpiLayers.length > 0) {
      this.layers.push({
        name: this.$t("kpi").toString(),
        type: "group",
        childLayers: kpiLayers
      })
    }

    console.log(this.layers);
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  private hasKeyFigure(analysisResult: AnalysisResultDetailedSchema, key_figue_id: number): boolean {
    return !!analysisResult.component_key_figures
      .find(comp_key_figure => comp_key_figure.key_figure.id === key_figue_id);
  }
}
</script>

<style lang="scss">
.openlayers-map {
  height: 500px;
  width: 100%;
}
</style>