<template>
  <div class="app-reference-measurements">
    <app-button 
      v-show="!refMeasureId"
      variant="secondary"
      icon="clipboard-check"
      :hideText="true"
      @click="onRefMeasureClick"
      :loading="refMeasureButtonLoading"
    >
      {{ $t("acquire-reference-measurement") }}
    </app-button>
    <app-button 
      v-show="refMeasureId"
      variant="primary"
      icon="clipboard-check"
      @click="onRefMeasureFinishClick"
    >
      {{ $t("finish-reference-measurement") }}
    </app-button>

    <app-modal-form
      id="reference-measurement-modal"
      ref="refMeasureModal"
      :title="$t('acquire-reference-measurement')"
      :ok-title="refMeasure && refMeasure.oldMeasureId ? $t('continue') : $t('start')"
      :modalLoading="refMeasureModalLoading"
      @submit="onStartRefMeasure"
    >
      <div v-if="refMeasure">
        <b-alert variant="info" v-model="refMeasure.analysisLoaded">
          <span v-if="refMeasure.analysisId !== null" 
            v-html="$t('acquire-reference-measurement-for-analysis', { analysis: refMeasure.analysisName })">
          </span>
          <span v-if="refMeasure.analysisId === null">
            {{ $t("acquire-reference-measurement-and-create-analysis") }}
          </span>
        </b-alert>

        <b-form-group v-show="oldRefMeasures" :label="$t('continue-reference-measurement')">
          <b-form-select v-model="refMeasure.oldMeasureId" :options="oldRefMeasures" />
        </b-form-group>

        <div v-show="refMeasure.oldMeasureId === null">
          <b-form-group :label="$t('measure-date')">
            <b-datepicker v-model="refMeasure.measureDate" required />
          </b-form-group>
          <b-form-group :label="$t('notes')">
            <b-textarea v-model="refMeasure.notes" />
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="refMeasure.gps" switch>{{ $t("use-gps") }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import dateHelper from '@/app/shared/services/helper/date-helper';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { ReferenceMeasurementEventObject, ReferenceMeasurementOptions } from './types';
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import AppModalForm from '@/app/shared/components/app-modal/app-modal-form.vue';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { analysisSelectEventService } from '../analysis-selection-sidebar/analysis-selection-service';
import { State } from "vuex-class";
import { AnalysisSelectionEvent } from '../analysis-selection-sidebar/types';
import { PILayersHierarchy } from '../visualization/pi-layers-hierarchy';
import { ComponentLayer } from '../visualization/layers/component-layer';

@Component({
  name: "app-reference-measurements",
  components: {
    AppButton,
    AppModalForm,
  },
})
export default class AppReferenceMeasurements extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) componentLayers!: ComponentLayer[];
  @Prop({ required: true }) piLayersHierarchy!: PILayersHierarchy | null;

  @Ref() refMeasureModal!: IAppModalForm;

  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;
  @State(state => state.sidebar["layer-switcher"]) layersSidebarOpen!: boolean;

  refMeasureId: string | null = null;
  refMeasureButtonLoading = false;
  refMeasureModalLoading = false;
  refMeasure: ReferenceMeasurementOptions | null = null;
  oldRefMeasures: { value: string | null, text: string }[] | null = null;
  
  @CatchError("refMeasureButtonLoading")
  async onRefMeasureClick() {
    this.refMeasure = {
      analysisLoaded: false,
      analysisId: null,
      analysisName: null,
      oldMeasureId: null,
      measureDate: null,
      notes: null,
      gps: true,
    }

    await this.loadAnalysisForReferenceMeasurement();

    if (this.refMeasure.analysisId) {
      const me = await volateqApi.getMe();

      const oldReferenceMeasurements = await volateqApi.getReferenceMeasurements(this.refMeasure.analysisId)

      if (oldReferenceMeasurements.length > 0) {
        this.oldRefMeasures = [
          { value: null, text: "" },
          ...oldReferenceMeasurements.map(referenceMeasurement => ({
            value: referenceMeasurement.id,
            text: dateHelper.toDate(referenceMeasurement.measure_date) + " - " 
              + (referenceMeasurement.notes || ""),
          }))
        ];
      } else {
        this.oldRefMeasures = null;
      }
    }

    this.refMeasureModal.show();
  }

  private async loadAnalysisForReferenceMeasurement() {
    const incompleteAnalysis = await volateqApi.findAnalysisForNewReferenceMeasurement(this.plant.id);
    if (incompleteAnalysis) {
      this.refMeasure!.analysisId = incompleteAnalysis.id;
      this.refMeasure!.analysisName = incompleteAnalysis.name;
    } 

    this.refMeasure!.analysisLoaded = true;
  }

  @CatchError("refMeasureModalLoading")
  async onStartRefMeasure() {
    if ((this.refMeasure!.analysisId === null || this.refMeasure!.oldMeasureId === null) && this.refMeasure!.measureDate === null) {
      throw { error: "MISSING_MEASURE_DATE", message: "Please select a measurement date" }
    }

    if (this.refMeasure!.analysisId === null) {
      this.refMeasure!.analysisId = (await volateqApi.createEmptyAnalysis({
        plant_id: this.plant.id,
        flown_at: this.refMeasure!.measureDate!,
      })).id;
    }

    this.refMeasureId = this.refMeasure!.oldMeasureId
    if (this.refMeasureId === null) {
      this.refMeasureId = (await volateqApi.createReferenceMeasurement(this.refMeasure!.analysisId, { 
        measure_date: this.refMeasure!.measureDate!,
        notes: this.refMeasure!.notes || undefined,
      })).id;
    }

    const refMeasureValues = await volateqApi.getReferencMeasurementValues(this.refMeasureId);

    await analysisSelectEventService.emit(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL);
    if (this.sidebarOpen) {
      this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
    }
    if (this.layersSidebarOpen) {
      this.$store.direct.commit.sidebar.toggle({ name: "layer-switcher" });
    }

    this.$emit("startReferenceMeasurement", {
        options: this.refMeasure,
        componentLayers: this.componentLayers,
        piLayersHierarchy: this.piLayersHierarchy!,
        refMeasureId: this.refMeasureId,
        refMeasureValues: refMeasureValues,
      } as ReferenceMeasurementEventObject);

    this.refMeasureModal.hide();
  }

  @CatchError()
  async onRefMeasureFinishClick() {
    if (confirm(this.$t('finish-reference-measurement-are-you-sure').toString())) {
      this.$emit("finishReferenceMeasurement", {
          options: this.refMeasure,
          componentLayers: this.componentLayers,
          piLayersHierarchy: this.piLayersHierarchy,
          refMeasureId: this.refMeasureId,
        } as ReferenceMeasurementEventObject);

      this.refMeasureId = null;
      this.refMeasure = null;

      await analysisSelectEventService.emit(this.plant.id, AnalysisSelectionEvent.SELECT_FIRST);
      if (!this.sidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
      }
      if (!this.layersSidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "layer-switcher" });
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-reference-measurements {
  .app-button:hover {
    background-color: $hover-light-blue;
  }
} 
</style>