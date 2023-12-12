<template>
  <div>
    <app-button
      v-show="isSuperAdmin"
      icon="arrow-right-circle-fill"
      @click="onMoveClick"
      variant="secondary"
      :loading="loading"
      cls="mar-top pull-right"
    >
      {{ $t('move-to-another-analysis') }}
    </app-button>
    <div class="clear" />

    <app-reference-measurement-values ref="appReferenceMeasurementValues"
      :analysis="analysis"
    />

    <app-modal-form
      id="move-modal"
      ref="moveModal"
      :title="$t('move-to-another-analysis')"
      :ok-title="$t('move')"
      :cancel-title="$t('cancel')"
      :modalLoading="moveModalLoading"
      @submit="onMove"
    >
      <b-form-group :label="$t('select-analysis')">
        <b-form-select v-model="moveTargetAnalysisId" :options="moveToAnalyses" required />
      </b-form-group>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { analysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import AppReferenceMeasurementValues from "./reference-measurement-values.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { IAppReferenceMeasurementValues } from "./types";

@Component({
  name: "app-analysis-reference-measurements",
  components: {
    AppTableContainer,
    AppTable,
    AppModalForm,
    AppReferenceMeasurementValues,
    AppButton,
  }
})
export default class AppAnalysisReferenceMeasurements extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() appReferenceMeasurementValues!: IAppReferenceMeasurementValues;
  @Ref() moveModal!: IAppModalForm;

  loading = false;

  refMeasureItems: Array<any> = [];
  refMeasureColumns: AppTableColumns = [
    { key: "measureDate", label: this.$t("measure-date").toString() },
    { key: "measureNotes", label: this.$t("notes").toString() },
    { key: "user_created", label: this.$t("acquired-by").toString() },
  ];
  selectedRefMeasureId: string | null = null;

  moveTargetAnalysisId: string | null = null;
  moveToAnalyses: { value: string, text: string }[] = [];
  moveModalLoading = false;

  @CatchError("loading")
  async onMoveClick() {
    this.moveToAnalyses = (await volateqApi.getAllAnalysis({ plant_id: this.analysis.plant.id }))
      .filter(analysis => analysis.id !== this.analysis.id)
      .map(analysis => ({
        value: analysis.id,
        text: analysis.name,
      }));
    this.moveTargetAnalysisId = null;

    this.moveModal.show();
  }

  @CatchError("moveModalLoading")
  async onMove() {
    if (!this.moveTargetAnalysisId) {
      throw { error: "MISSING_TARGET_ANALYSIS", message: "Please select an analysis" }
    }

    await volateqApi.moveObservations(this.analysis.id, this.moveTargetAnalysisId);

    this.showSuccess(this.$t("reference-measurement-moved-success").toString());

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

    this.moveModal.hide();

    await this.appReferenceMeasurementValues.refresh();
  }
}
</script>

<style lang="scss">
</style>
