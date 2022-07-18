<template>
  <div>
    <app-table-container>
      <b-table
        ref="refMeasuresTable"
        :items="refMeasureItems"
        :fields="refMeasureColumns"
        hover
        head-variant="light"
        :busy="loading"
      >
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(selected)="{ rowSelected }">
          <b-checkbox :checked="rowSelected" disabled class="b-table-selectable-checkbox"> </b-checkbox>
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
              variant="danger"
              size="sm"
              :title="$t('delete')"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>

    <app-modal-form
      id="move-modal"
      ref="moveModal"
      :title="$t('move-to-another-analysis')"
      :ok-title="$t('move')"
      :modalLoading="moveModalLoading"
      @submit="onMove"
    >
      <b-form-group :label="$t('select-analysis')">
        <b-form-select v-model="moveTargetAnalysisId" :options="moveToAnalyses" />
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
import { AnalysisEventService } from "../shared/analysis-event-service";
import { AnalysisEvent } from "../shared/types";

@Component({
  name: "app-analysis-reference-measurements",
  components: {
    AppTableContainer,
    AppModalForm,
  }
})
export default class AppAnalysisReferenceMeasurements extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() refMeasuresTable: any; // b-table
  @Ref() moveModal!: IAppModalForm;

  loading = false;

  refMeasureItems: Array<any> = [];
  refMeasureColumns: BvTableFieldArray = [
    { key: "measureDate", label: this.$t("measure-date").toString() },
    { key: "measureNotes", label: this.$t("notes").toString() },
    { key: "user", label: this.$t("user").toString() },
  ];

  moveTargetAnalysisId: string | null = null;
  moveToAnalyses: { value: string, text: string }[] = [];
  moveModalLoading = false;


  async created() {
    this.updateRefMeasurements();
  }

  async onMoveClick() {
    try {
      this.loading = true;

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

      // do the move

      this.showSuccess(this.$t("reference-measurement-moved-success").toString())

      await this.updateRefMeasurements();

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      this.showError(e);
    } finally {
      this.moveModalLoading = false;
    }
  }

  async onDeleteClick() {
    try {
      if (!confirm(this.$t("reference-measurement-delete-are-you-sure").toString())) {
        return;
      }

      this.loading = true;

      // do the delete

      this.showSuccess(this.$t("reference-measurement-delete-success").toString())
      
      await this.updateRefMeasurements();

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private async updateRefMeasurements() {
    try {
      this.loading = true;
      
      this.refMeasureItems = (await volateqApi.getReferenceMeasurements(this.analysis.id)).map(refMeasure => ({
        id: refMeasure.id,
        measureDate: (new Date(Date.parse(refMeasure.measure_date))).toLocaleDateString(),
        measureNotes: refMeasure.notes,
        user: (refMeasure.user.first_name + " " + refMeasure.user.last_name).trim() || refMeasure.user.email,
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
