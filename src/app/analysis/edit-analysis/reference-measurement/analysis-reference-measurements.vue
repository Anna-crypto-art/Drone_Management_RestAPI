<template>
  <div>
    <app-table-container>
      <app-table
        :rows="refMeasureItems"
        :columns="refMeasureColumns"
        selectMode="single"
        :loading="loading"
        @rowSelected="onRefMeasureSelected"
        :hoverActions="true"
      >
        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            icon="arrow-right-circle-fill"
            @click="onMoveClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('move-to-another-analysis')"
          />
          <app-button
            v-show="isSuperAdmin"
            @click="onDeleteClick(row.item)"
            variant="outline-danger"
            size="sm"
            icon="trash"
            :title="$t('delete')"
          />
        </template>
      </app-table>
    </app-table-container>

    <app-reference-measurement-values 
      :analysis="analysis"
      :refMeasureId="selectedRefMeasureId"
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
import dateHelper from "@/app/shared/services/helper/date-helper";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AppTableColumns } from "@/app/shared/components/app-table/types";

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

  @Ref() moveModal!: IAppModalForm;

  loading = false;

  refMeasureItems: Array<any> = [];
  refMeasureColumns: AppTableColumns = [
    { key: "measureDate", label: this.$t("measure-date").toString() },
    { key: "measureNotes", label: this.$t("notes").toString() },
    { key: "user_created", label: this.$t("acquired-by").toString() },
  ];
  selectedRefMeasureId: string | null = null;

  moveRefMeasureId: string | null = null;
  moveTargetAnalysisId: string | null = null;
  moveToAnalyses: { value: string, text: string }[] = [];
  moveModalLoading = false;

  async created() {
    this.updateRefMeasurements();
  }

  @CatchError("loading")
  async onMoveClick(refMeasureItem: any) {
    this.moveRefMeasureId = refMeasureItem.id;

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

    await volateqApi.moveReferenceMeasurement(this.moveRefMeasureId!, this.moveTargetAnalysisId);

    this.showSuccess(this.$t("reference-measurement-moved-success").toString())

    await this.updateRefMeasurements();

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

    this.moveModal.hide();
  }

  @CatchError("loading")
  async onDeleteClick(refMeasureItem: any) {
    if (!confirm(this.$t("reference-measurement-delete-are-you-sure").toString())) {
      return;
    }

    await volateqApi.deleteReferenceMeasurement(refMeasureItem.id);

    this.showSuccess(this.$t("reference-measurement-delete-success").toString())
    
    await this.updateRefMeasurements();

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
  }

  onRefMeasureSelected(refMeasureItems: { id: string }[]) {
    if (refMeasureItems.length > 0) {
      this.selectedRefMeasureId = refMeasureItems[0].id;
    } else {
      this.selectedRefMeasureId = null;
    }
  }

  @CatchError("loading")
  private async updateRefMeasurements() {
    this.refMeasureItems = (await volateqApi.getReferenceMeasurements(this.analysis.id)).map(refMeasure => ({
      id: refMeasure.id,
      measureDate: dateHelper.toDateTime(refMeasure.measure_time_from) + " - " +
        dateHelper.toDateTime(refMeasure.measure_time_to),
      measureNotes: refMeasure.notes,
      user_created: refMeasure.user_created ? 
        (refMeasure.user_created.first_name + " " + refMeasure.user_created.last_name).trim() || refMeasure.user_created.email : ""
    }));
  }
}
</script>

<style lang="scss">
</style>
