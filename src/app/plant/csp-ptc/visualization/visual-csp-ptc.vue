<template>
  <open-layers v-if="hasLayers" :layers="layers"></open-layers>
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


const GEO_JSON_OPTIONS = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppVisualCspPtc extends Vue {
  @Prop() plant!: PlantSchema;

  analysisResult?: AnalysisResultDetailedSchema;

  layers: LayerType[] = [];
  showPCS = false;


  async updateAnalysisResult(analysisResult: AnalysisResultDetailedSchema) {
    this.analysisResult = analysisResult;

    // Tell openlayers to reset the visibity of the layers!
  }

  async created() {
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
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { this.showPCS = selected; },
        selected: false
      },
      {
        name: this.$t("kpi").toString(),
        type: "group",
        singleSelection: true,
        childLayers: [
          {
            name: this.$t("ir-intensity").toString(),
            type: "geojson",
            style: (feature: FeatureLike) => {
              const color = IR_INTENSITY_CLASS_COLORS[feature.get('class')];

              return new Style({
                stroke: color && new Stroke({
                  color: color,
                  width: 3,
                }),
                text: this.showText(feature),
              });
            },
            geoJSONOptions: GEO_JSON_OPTIONS,
            geoJSONLoader: () => this.getKeyFiguresGeoVisual(AnalysisResultKeyFigure.IR_INTENSITY_ID),
            selected: false,
          },
          {
            name: this.$t("sce-alignment-offset").toString(),
            type: "geojson",
            style: (feature: FeatureLike) => {
              const offset = feature.get('value');
              const offsetColor = getOffsetColor(feature.get('value'));

              return new Style({
                fill: offsetColor && new Fill({
                  color: offsetColor,
                }) || undefined,
                text: showText(feature),
              });
            },
            geoJSONOptions: GEO_JSON_OPTIONS,
            geoJSONLoader: () => this.getKeyFiguresGeoVisual(AnalysisResultKeyFigure.SCE_ANGLE_ID),
            selected: false,
          }
        ],
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

      kpiLayers.push();
    }
    if (this.hasKeyFigure(analysisResult, AnalysisResultKeyFigure.SCE_ANGLE_ID)) {
      const offsetColorRanges = [0.01, 0.15, 0.3];
      const offsetColors = [undefined, 'green', 'yellow', 'red'];
      

      kpiLayers.push();
    }

    if (kpiLayers.length > 0) {
      this.layers.push({
        name: this.$t("kpi").toString(),
        type: "group",
        singleSelection: true,
        childLayers: kpiLayers,
      })
    }

    console.log(this.layers);
  }

  private showText(feature: FeatureLike, props: Record<string, unknown> = {}): Text | undefined {
    return new Text({
      text: this.showPCS && feature.get('name') || '',
      overflow: true,
      rotation: -(Math.PI / 2),
      ...props
    }) || undefined
  }

  private getOffsetColor = (offset: number): string | undefined => {
        if (!offset) {
          return undefined;
        }
        offset = offset < 0 ? offset * -1 : offset;

        let i = 0;
        while (i < OFFSET_COLORS.length) {
          if (offset < OFFSET_COLORS_R[i]) {
            return offsetColors[i];
          }
          i++;
        }
        return offsetColors[i - 1];
      }

  private getKeyFiguresGeoVisual(keyFigureId: AnalysisResultKeyFigure) {
    return volateqApi.getKeyFiguresGeoVisual(this.plant.id, this.analysisResult!.id, [keyFigureId])
  }

  private getComponentGeoVisual(componentId: AnalysisResultComponent) {
    return volateqApi.getComponentsGeoVisual(this.plant.id, [componentId]);
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  private hasKeyFigure(key_figue_id: number): boolean {
    return !!this.analysisResult!.component_key_figures
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