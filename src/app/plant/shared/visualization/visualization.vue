<template>
  <div class="visualization">
    <app-geovisualization
      ref="openLayers"
      v-if="hasLayers"
      :layers="layers"
      @click="onOpenLayersClick"
      @sidebarToggle="onSidebarToggled"
    >
      <template #topContent>
        <b-form-checkbox
          v-model="enableMultiSelection"
          switch
          @change="onMultiSelectionChanged"
        >
          {{ $t("multi-selection") }}
          <app-explanation>{{
            $t("multi-selection-overlapping_expl")
          }}</app-explanation>
        </b-form-checkbox>
      </template>

      <!-- Pass slots through -->
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot"></slot>
        </template>
      </template>
    </app-geovisualization>

    <div v-if="hasLegend" class="visualization-legend">
      <div
        v-for="entry in legendEntries"
        :key="entry.color"
        class="visualization-legend-entry"
      >
        <div
          class="visualization-legend-entry-color"
          :style="`background: ${entry.color}`"
        ></div>
        <div class="visualization-legend-entry-name" v-html="entry.name"></div>
      </div>
    </div>
    <b-toast
      id="piInfoToast"
      no-auto-hide
      solid
      toaster="b-toaster-bottom-center"
    >
      <template #toast-title>
        <h3>{{ piToastInfo.title }}</h3>
      </template>
      <div>
        <div class="toaster-images" v-if="piToastInfo.images">
          <img
            v-for="image in piToastInfo.images"
            :key="image.title"
            :title="image.title"
            :src="image.url"
          />
        </div>
        <b-row
          v-for="featureInfo in piToastInfo.records"
          :key="featureInfo.name"
          :class="featureInfo.bold && 'font-weight-bold'"
        >
          <b-col>
            {{ featureInfo.name }}
            <app-explanation v-if="featureInfo.descr">
              <span v-html="$t(featureInfo.descr)"></span>
            </app-explanation>
          </b-col>
          <b-col>{{ featureInfo.value }}</b-col>
        </b-row>
      </div>
    </b-toast>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ComponentLayer } from "./layers/component-layer";
import { IAnalysisResultSelection } from "../types";
import { FeatureLike } from "ol/Feature";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import {
  IPlantVisualization,
  Legend,
  FeatureInfos,
  KeyFigureTypeMap
} from "@/app/plant/shared/visualization/types";
import { PILayersHierarchy } from "@/app/plant/shared/visualization/pi-layers-hierarchy";
import AppGeovisualization from "@/app/shared/components/app-geovisualization/app-geovisualization.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import {
  GroupLayer,
  LayerType
} from "@/app/shared/components/app-geovisualization/types/layers";

@Component({
  name: "app-visualization",
  components: {
    AppGeovisualization,
    AppExplanation
  }
})
export default class AppVisualization extends BaseAuthComponent
  implements IAnalysisResultSelection, IPlantVisualization {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() componentLayerTypes!: typeof ComponentLayer[];
  @Prop() keyFigureLayers!: KeyFigureTypeMap[];

  @Ref() openLayers!: IOpenLayersComponent;

  selectedAnalysisResult:
    | AnalysisResultDetailedSchema
    | null
    | undefined = null;

  piLayersHierarchy!: PILayersHierarchy;
  componentLayers: ComponentLayer[] = [];
  layers: LayerType[] = [];
  showPCS = false;
  legends: Legend[] = [];
  piToastInfo: FeatureInfos = {
    title: "",
    records: [{ name: "", descr: "", value: "" }]
  };
  enableMultiSelection = false;

  private waitForDom = false;

  async created() {
    this.createLayers();

    // wait for DOM before render OpenLayers
    setTimeout(() => {
      this.waitForDom = true;
    }, 300);
  }

  selectAnalysisResult(analysisResultId: string | undefined): void {
    this.selectedAnalysisResult = this.analysisResults.find(
      analysisResult => analysisResult.id === analysisResultId
    );

    this.piLayersHierarchy.setVisibility(this.selectedAnalysisResult?.id);

    this.hideToast();
  }

  get hasLayers(): boolean {
    return this.layers.length > 0 && this.waitForDom;
  }

  get hasLegend(): boolean {
    return this.legends.length > 0;
  }

  get legendEntries(): { color: string; name: string }[] {
    const legendEntries: { color: string; name: string }[] = [];
    for (const legend of this.legends) {
      for (const entry of legend.entries) {
        if (
          !legendEntries.find(legendEntry => legendEntry.color === entry.color)
        ) {
          legendEntries.push(entry);
        }
      }
    }

    return legendEntries;
  }

  async onOpenLayersClick(features: FeatureLike[]) {
    let mergedFeatureInfos: FeatureInfos | undefined;
    for (const kpiLayer of this.piLayersHierarchy.getAllChildLayers()) {
      const featureInfos = await kpiLayer.onClick(features);

      if (featureInfos) {
        if (!mergedFeatureInfos) {
          mergedFeatureInfos = featureInfos;
        } else if (mergedFeatureInfos.title === featureInfos.title) {
          mergedFeatureInfos.records.forEach((featureInfo, index) => {
            if (!featureInfo.bold && featureInfos.records[index].bold) {
              featureInfo.bold = true;
            }
          });
        }
      }
    }

    if (mergedFeatureInfos) {
      this.piToastInfo = mergedFeatureInfos;
    }

    if (mergedFeatureInfos) {
      this.$bvToast.show("piInfoToast");
    } else {
      this.hideToast();
    }
  }

  onSidebarToggled(toggleState: boolean) {
    this.$emit("sidebarToggle", toggleState);
  }

  onLayerSelected(selected: boolean, legend?: Legend) {
    if (legend) {
      const legendIndex = this.legends.findIndex(l => l.id === legend.id);
      if (selected) {
        if (legendIndex === -1) {
          this.legends.push(legend);
        } else {
          throw Error("Legend id " + legend.id + " already added");
        }
      } else {
        if (legendIndex != -1) {
          this.legends.splice(legendIndex, 1);
        }
      }
    }

    this.hideToast();
  }

  onMultiSelectionChanged() {
    this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);
    // Group Layer "performance-indicators"
    (this.layers[0] as GroupLayer).singleSelection = !this.enableMultiSelection;
  }

  private createLayers(): void {
    this.componentLayers = this.componentLayerTypes.map(
      componentType => new (componentType as any)(this)
    );
    this.piLayersHierarchy = new PILayersHierarchy(
      this,
      this.analysisResults,
      this.keyFigureLayers
    );

    this.layers.push(
      {
        name: this.$t("performance-indicators").toString(),
        type: "group",
        childLayers: this.piLayersHierarchy.getGeoJSONLayers(),
        singleSelection: true
      },
      {
        name: this.$t("components").toString(),
        type: "group",
        childLayers: this.componentLayers.map(compLayer =>
          compLayer.toGeoLayer()
        )
      },
      {
        name: "pcs",
        type: "custom",
        customLoader: () => {
          return;
        },
        onSelected: (selected: boolean) => {
          this.showPCS = selected;

          this.piLayersHierarchy
            .getAllChildLayers()
            .forEach(kpiLayer => kpiLayer.showPCS(selected));
          this.componentLayers.forEach(compLayer =>
            compLayer.showPCS(selected)
          );
        },
        selected: false,
        styleClass: "margin-top"
      },
      {
        name: this.$t("world-map").toString(),
        type: "osm",
        selected: true
      }
    );
  }

  private hideToast() {
    this.$bvToast.hide("piInfoToast");
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix that toaster overlays popover
.b-popover {
  z-index: 1;
}
.b-toaster {
  z-index: 0;
}

.visualization {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;

  &-legend {
    @supports (backdrop-filter: blur(5px)) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.7);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.8);
    }

    position: absolute;
    bottom: 0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
    padding: 10px 15px 0px 15px;

    &-entry {
      display: flex;
      height: 25px;
      margin-bottom: 10px;

      &-color {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        margin-top: 5px;
      }
      &-name {
        width: auto;
      }
    }
  }
}
.openlayers-map {
  height: 100%;
  width: 100%;
}
.toggle-button {
  border: none;

  &:hover {
    background-color: $background-grey !important;
  }
}

.toaster-images {
  img {
    max-width: calc(500px - 1.5rem);
  }
  margin-bottom: 0.75rem;
}
</style>
