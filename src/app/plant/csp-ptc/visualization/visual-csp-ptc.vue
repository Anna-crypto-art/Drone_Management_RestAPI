<template>
  <div class="visual-csp-ptc">
    <app-visualization
      ref="visualization"
      :plant="plant"
      :analyses="analyses"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers"
      @startReferenceMeasurement="onStartReferenceMeasurement"
      @finishReferenceMeasurement="onFinishReferenceMeasurement"
    >
      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>
      <template #irIntensity>
        {{ $t("ir-intensity-class") }}
        <app-explanation><span v-html="$t('ir-intensity-class_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperature>
        {{ $t("glass-tube-temperature-class") }}
        <app-explanation><span v-html="$t('glass-tube-temperature-class_expl')"></span></app-explanation>
      </template>
      <template #missingGhr>
        {{ $t("missing-gct") }}
        <app-explanation><span v-html="$t('missing-gct_expl')"></span></app-explanation>
      </template>
      <template #O2Penetration>
        {{ $t("oxygen-penetration") }}
        <app-explanation><span v-html="$t('oxygen-penetration_expl')"></span></app-explanation>
      </template>
      <template #H2Concentration>
        {{ $t("hydrogen-penetration") }}
        <app-explanation><span v-html="$t('hydrogen-penetration_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperatureClass3>
        {{
          (firstAnalysisResult &&
            (firstAnalysisResult.csp_ptc.glass_tube_temperature_class_count === 3
              ? $t("glass-tube-temperature-class-4")
              : $t("glass-tube-temperature-class-3"))) ||
          ""
        }}
      </template>
      <template #glassTubeTemperatureNotMeasured>
        {{ $t("not-measured") }}
        <app-explanation><span v-html="$t('not-measured-glass-tube-temp')"></span></app-explanation>
      </template>
      <template #recommendedAction>
        {{ $t("recommended-action") }}
        <app-explanation><span v-html="$t('recommended-action_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass1>
        {{ $t("recommended-action-class-1") }}
        <app-explanation><span v-html="$t('recommended-action-class-1_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass2>
        {{ $t("recommended-action-class-2") }}
        <app-explanation><span v-html="$t('recommended-action-class-2_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass3>
        {{ $t("recommended-action-class-3") }}
        <app-explanation><span v-html="$t('recommended-action-class-3_expl')"></span></app-explanation>
      </template>
      <template #sceOrientation>
        {{ $t("alignment-offset") }}
        <app-explanation><span v-html="$t('sce-alignment-offset_expl')"></span></app-explanation>
      </template>
      <template #sceOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sce", 3) }}
      </template>
      <template #sceOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sce", 2) }}
      </template>
      <template #sceOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sce", 1) }}
      </template>
      <template #scaOrientation>
        {{ $t("tracking-offset") }} <app-explanation><span v-html="$t('tracking-offset_expl')"></span></app-explanation>
      </template>
      <template #scaOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sca", 3) }}
      </template>
      <template #scaOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sca", 2) }}
      </template>
      <template #scaOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sca", 1) }}
      </template>
      <template #scaAvgOrientation>
        {{ $t("average-tracking-offset") }} <app-explanation><span v-html="$t('average-tracking-offset_expl')"></span></app-explanation>
      </template>
      <template #scaAvgOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sca", 3) }}
      </template>
      <template #scaAvgOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sca", 2) }}
      </template>
      <template #scaAvgOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sca", 1) }}
      </template>
      <template #scaFriction>
        {{ $t("torsion-caused-friction-mean") }}
        <app-explanation><span v-html="$t('torsion-caused-friction-mean_expl')"></span></app-explanation>
      </template>
      <template #scaSdx>
        {{ $t("slope-deviation") }}
        <app-explanation><span v-html="$t('slope-deviation_expl')"></span></app-explanation>
      </template>
      <template #hcePositionSupport>
        {{ $t("hce-position-support-offset") }}
        <app-explanation><span v-html="$t('hce-position-support-offset_expl')"></span></app-explanation>
      </template>
      <template #hcePositionSupportOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("hce", 3) }}
      </template>
      <template #hcePositionSupportOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("hce", 2) }}
      </template>
      <template #hcePositionSupportOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("hce", 1) }}
      </template>
      <template #hcePositionCenter>
        {{ $t("hce-position-center-offset") }}
        <app-explanation><span v-html="$t('hce-position-center-offset_expl')"></span></app-explanation>
      </template>
      <template #hcePositionCenterOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("hce", 3) }}
      </template>
      <template #hcePositionCenterOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("hce", 2) }}
      </template>
      <template #hcePositionCenterOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("hce", 1) }}
      </template>
    </app-visualization>

    <app-modal-form
      id="reference-measurement-value-modal"
      ref="refMeasureValueModal"
      :title="$t('add-reference-measurement-value')"
      :subtitle="(refMeasureValue ? refMeasureValue.pcs : '')"
      :ok-title="$t('apply')"
      :modalLoading="refMeasureValueModalLoading"
      @submit="onAddRefMeasureValue"
    >
      <div v-if="refMeasureValue">
        <b-form-group :label="$t('glass-tube-temperature')">
          <b-form-input type="number" v-model="refMeasureValue.hceTemperature" />
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="refMeasureValue.hceBrokenGlass">{{ $t("missing-gct") }}</b-form-checkbox>
        </b-form-group>
        <b-form-group :label="$t('notes')">
          <b-textarea v-model="refMeasureValue.notes" />
        </b-form-group>
        <app-button v-if="refMeasureValue.id"
          variant="danger"
          icon="trash"
          @click="onDeleteRefMeasureValue"
          :loading="refMeasureDeleteLoading"
        >
          {{ $t("delete") }}
        </app-button>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { IPlantVisualization, Legend, ReferenceMeasurementEventObject } from "@/app/plant/shared/visualization/types";
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { AnalysisSelectionBaseComponent } from "../../shared/analysis-selection-sidebar/analysis-selection-base-component";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue"
import AppButton from "@/app/shared/components/app-button/app-button.vue"
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ReferenceMeasurementValueSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { AbsorberComponentLayer } from "./component-layers/absorber-component-layer";
import { ScaComponentLayer } from "./component-layers/sca-component-layer";
import { SceComponentLayer } from "./component-layers/sce-component-layer";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-visual-csp-ptc",
  components: {
    AppVisualization,
    AppExplanation,
    AppModalForm,
    AppButton,
  },
})
export default class AppVisualCspPtc
  extends AnalysisSelectionBaseComponent
  implements IPlantVisualization
{
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @Ref() visualization: IPlantVisualization | undefined;
  @Ref() refMeasureValueModal!: IAppModalForm;

  refMeasureEventObject: ReferenceMeasurementEventObject | null = null;
  refMeasureValueModalLoading = false;
  refMeasureValue: { 
      pcs: string,
      hceTemperature: number | null,
      hceBrokenGlass: boolean | null,
      notes: string | null,
      id: string | null,
    } | null = null;
  refMeasureDeleteLoading = false;

  async created() {
    await super.created();
  }

  get openLayers(): IOpenLayersComponent | undefined {
    return this.visualization?.openLayers;
  }

  onLayerSelected(selected: boolean, legend: Legend | undefined): void {
    return this.visualization?.onLayerSelected(selected, legend);
  }

  getTransAlignmentOffsetClassLimit(componentType: "sce" | "sca" | "hce", classLimit: 1 | 2 | 3): string {
    if (!this.firstAnalysisResult) {
      return "";
    }

    let offsetClassLimits: number[] | null = null;
    let unit = "";
    if (componentType === "sce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.sce_alignment_deviation_to_drive_class_limits;
      unit = "°";
    } else if (componentType === "sca") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.sca_tracking_encoder_offset_class_limits;
      unit = "°";
    } else if (componentType === "hce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.hce_position_total_class_limits;
      unit = "[mm]";
    }

    if (offsetClassLimits === null) {
      return "";
    }

    if (classLimit === 1) {
      return this.$t("alignment-offset-class-1", { limit0: offsetClassLimits[0], unit }).toString();
    }
    if (classLimit === 2) {
      return this.$t("alignment-offset-class-2", {
        limit1: offsetClassLimits[1],
        limit0: offsetClassLimits[0],
        unit,
      }).toString();
    }
    if (classLimit === 3) {
      return this.$t("alignment-offset-class-3", {
        limit1: offsetClassLimits[1],
        unit,
      }).toString();
    }

    throw new Error("class_limit not allowed");
  }

  public hideToast(): void {
    this.visualization?.hideToast();
  }

  @CatchError()
  async onStartReferenceMeasurement(event: ReferenceMeasurementEventObject) {
    for (const componentLayer of event.componentLayers) {
      if (componentLayer instanceof SceComponentLayer) {
        if (!componentLayer.getSelected()) {
          await componentLayer.setSelected(true);
        }
      } else if (componentLayer instanceof ScaComponentLayer) {
        if (!componentLayer.getSelected()) {
          await componentLayer.setSelected(true);
        }

        componentLayer.addGeolocationFeature();
      } else if (componentLayer instanceof AbsorberComponentLayer) {
        const existingPcsCodes = event.refMeasureValues.map(val => val.fieldgeometry_component!.kks) || [];
        await componentLayer.startReferenceMeasurement(existingPcsCodes, async (pcs) => {
          try {
            const refMeasureValue: ReferenceMeasurementValueSchema | undefined = 
              await volateqApi.getReferencMeasurementValue(event.refMeasureId, pcs);
            
            if (refMeasureValue) {
              this.refMeasureValue = {
                pcs: pcs,
                hceTemperature: refMeasureValue.hce_temperature || null,
                hceBrokenGlass: refMeasureValue.hce_broken_glass || null,
                notes: refMeasureValue.notes || null,
                id: refMeasureValue.id,
              };
            } else {
              this.refMeasureValue = {
                pcs: pcs,
                hceTemperature: null,
                hceBrokenGlass: null,
                notes: null,
                id: null,
              };
            }

            this.refMeasureValueModal.show();
          } catch (e) {
            this.showError(e);
          }
        });
      }
    }

    this.refMeasureEventObject = event;
  }

  @CatchError()
  async onFinishReferenceMeasurement(event: ReferenceMeasurementEventObject) {
    for (const componentLayer of event.componentLayers) {
      if (componentLayer instanceof ScaComponentLayer) {
        componentLayer.removeGeolocationFeature();
      } else if (componentLayer instanceof AbsorberComponentLayer) {
        await componentLayer.finishReferenceMeasurement();
        this.refMeasureValue = null;
      }
    }

    this.refMeasureEventObject = null;
  }

  @CatchError('refMeasureValueModalLoading')
  async onAddRefMeasureValue() {
    await volateqApi.addReferencMeasurementValue(this.refMeasureEventObject!.refMeasureId, {
      pcs: this.refMeasureValue!.pcs,
      notes: this.refMeasureValue!.notes || undefined,
      hce_temperature: this.refMeasureValue!.hceTemperature || undefined,
      hce_broken_glass: this.refMeasureValue!.hceBrokenGlass || undefined,
    });

    const absorberComponentLayer = this.refMeasureEventObject!.componentLayers
      .find(compLayer => compLayer instanceof AbsorberComponentLayer) as AbsorberComponentLayer | undefined;
    if (absorberComponentLayer) {
      await absorberComponentLayer.changeColor(this.refMeasureValue!.pcs);
    }

    this.refMeasureValueModal.hide();
  }

  async onDeleteRefMeasureValue() {
    this.refMeasureDeleteLoading = true;
    try {
      await volateqApi.deleteReferenceMeasurementValue(this.refMeasureValue!.id!);

      const absorberComponentLayer = this.refMeasureEventObject!.componentLayers
        .find(compLayer => compLayer instanceof AbsorberComponentLayer) as AbsorberComponentLayer | undefined;
      if (absorberComponentLayer) {
        absorberComponentLayer.undoChangeColor(this.refMeasureValue!.pcs);
      }

      this.refMeasureValueModal.hide();
    } catch (e) {
      this.showError(e);
    } finally {
      this.refMeasureDeleteLoading = false;
    }
  }
}
</script>
