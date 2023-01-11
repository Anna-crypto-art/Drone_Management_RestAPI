<template>
  <div>
    <app-table-container>
      <b-table
        :items="refMeasureItems"
        :fields="refMeasureColumns"
        select-mode="single"
        selectable
        hover
        head-variant="light"
        :busy="loading"
        @row-selected="onRefMeasureSelected"
      >
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <b-button
              v-show="isSuperAdmin"
              @click="onMoveClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('move-to-another-analysis')"
            >
              <b-icon icon="arrow-right-circle-fill"></b-icon>
            </b-button>
            <b-button
              v-show="isSuperAdmin"
              @click="onDeleteClick(row.item)"
              variant="outline-danger"
              size="sm"
              :title="$t('delete')"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>

    <app-reference-measurement-values :refMeasureId="selectedRefMeasureId" />

    <app-modal-form
      id="move-modal"
      ref="moveModal"
      :title="$t('move-to-another-analysis')"
      :ok-title="$t('move')"
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
import { BvTableFieldArray } from "bootstrap-vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import AppReferenceMeasurementValues from "./reference-measurement-values.vue";
import dateHelper from "@/app/shared/services/helper/date-helper";

@Component({
  name: "app-analysis-reference-measurements",
  components: {
    AppTableContainer,
    AppModalForm,
    AppReferenceMeasurementValues,
  }
})
export default class AppAnalysisReferenceMeasurements extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() moveModal!: IAppModalForm;

  loading = false;

  refMeasureItems: Array<any> = [];
  refMeasureColumns: BvTableFieldArray = [
    { key: "measureDate", label: this.$t("measure-date").toString() },
    { key: "measureNotes", label: this.$t("notes").toString() },
    { key: "user_created", label: this.$t("acquired-by").toString() },
    { key: "user_updated", label: this.$t("updated-by").toString() },
    { key: "actions", label: "" },
  ];
  selectedRefMeasureId: string | null = null;

  moveRefMeasureId: string | null = null;
  moveTargetAnalysisId: string | null = null;
  moveToAnalyses: { value: string, text: string }[] = [];
  moveModalLoading = false;


  async created() {
    this.updateRefMeasurements();
  }

  async onMoveClick(refMeasureItem: any) {
    try {
      this.loading = true;

      this.moveRefMeasureId = refMeasureItem.id;

      this.moveToAnalyses = (await volateqApi.getAllAnalysis({ plant_id: this.analysis.plant.id }))
        .filter(analysis => analysis.id !== this.analysis.id)
        .map(analysis => ({
          value: analysis.id,
          text: analysis.name,
        }));
      this.moveTargetAnalysisId = null;

      this.moveModal.show();
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  async onMove() {
    try {
      this.moveModalLoading = true;

      if (!this.moveTargetAnalysisId) {
        throw { error: "MISSING_TARGET_ANALYSIS", message: "Please select an analysis" }
      }

      await volateqApi.moveReferenceMeasurement(this.moveRefMeasureId!, this.moveTargetAnalysisId);

      this.showSuccess(this.$t("reference-measurement-moved-success").toString())

      await this.updateRefMeasurements();

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

      this.moveModal.hide();
    } catch (e) {
      this.showError(e);
    } finally {
      this.moveModalLoading = false;
    }
  }

  async onDeleteClick(refMeasureItem: any) {
    try {
      if (!confirm(this.$t("reference-measurement-delete-are-you-sure").toString())) {
        return;
      }

      this.loading = true;

      await volateqApi.deleteReferenceMeasurement(refMeasureItem.id);

      this.showSuccess(this.$t("reference-measurement-delete-success").toString())
      
      await this.updateRefMeasurements();

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  onRefMeasureSelected(refMeasureItems: { id: string }[]) {
    if (refMeasureItems.length > 0) {
      this.selectedRefMeasureId = refMeasureItems[0].id;
    } else {
      this.selectedRefMeasureId = null;
    }
  }

  private async updateRefMeasurements() {
    try {
      this.loading = true;
      
      this.refMeasureItems = (await volateqApi.getReferenceMeasurements(this.analysis.id)).map(refMeasure => ({
        id: refMeasure.id,
        measureDate: dateHelper.toDate(refMeasure.measure_date),
        measureNotes: refMeasure.notes,
        user_created: refMeasure.user_created ? 
          (refMeasure.user_created.first_name + " " + refMeasure.user_created.last_name).trim() || refMeasure.user_created.email : "",
        user_updated: refMeasure.user_updated ? 
          ((refMeasure.user_updated.first_name + " " + refMeasure.user_updated.last_name).trim() 
            || refMeasure.user_updated.email) + " " + this.$t(...dateHelper.getTimeDiff(refMeasure.updated_at)).toString() :
          ""
      }));
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
</style>
