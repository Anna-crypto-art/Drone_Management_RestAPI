<template>
  <div v-show="refMeasureId">
    <app-table-container>
      <b-table
        :items="refMeasureValueItems"
        :fields="refMeasureValueColumns"
        hover
        head-variant="light"
        :busy="loading"
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
              @click="onIgnoreClick(row.item)"
              variant="secondary"
              size="sm"
              :title="row.item.ignored ? $t('ignore-value-undo') : $t('ignore-value')"
            >
              <b-icon v-if="row.item.ignored" icon="plus-circle"></b-icon>
              <b-icon v-if="!row.item.ignored" icon="dash-circle"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ReferenceMeasurementSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";

@Component({
  name: "app-reference-measurement-values",
  components: {
    AppTableContainer
  }
})
export default class AppReferenceMeasurementValues extends BaseAuthComponent {
  @Prop({ default: null }) refMeasureId!: string | null;

  loading = false;

  refMeasureValueItems: Array<any> = [];
  refMeasureValueColumns: BvTableFieldArray = [
    { key: "pcs", label: this.$t("pcs").toString() },
    { key: "absorberTemperature", label: this.$t("glass-tube-temperature").toString() },
    { key: "brokenGlass", label: this.$t("missing-gct").toString() },
    { key: "notes", label: this.$t("notes").toString() },
    { key: "ignored", label: this.$t("ignored").toString() },
    { key: "actions", label: "" },
  ];

  async created() {
    await this.updateRefMeasurementValues();
  }

  @Watch('refMeasureId')
  async onRefMeasureChanged() {
    await this.updateRefMeasurementValues();
  }

  async onIgnoreClick(refMeasureItem: any) {
    try {
      await volateqApi.ignoreReferenceMeasurementValue(refMeasureItem.id, !refMeasureItem.ignored);

      this.showSuccess(this.$t("reference-measurement-value-change-success").toString())

      await this.updateRefMeasurementValues();
    } catch (e) {
      this.showError(e);
    }
  }

  private async updateRefMeasurementValues() {
    try {
      this.loading = true;

      if (!this.refMeasureId) {
        this.refMeasureValueItems = [];
        return;
      }
      
      this.refMeasureValueItems = (await volateqApi.getReferencMeasurementValues(this.refMeasureId)).map(refMeasureValue => ({
        id: refMeasureValue.id,
        pcs: refMeasureValue.fieldgeometry_component!.kks,
        absorberTemperature: refMeasureValue.hce_temperature,
        brokenGlass: refMeasureValue.hce_broken_glass,
        notes: refMeasureValue.notes,
        ignored: refMeasureValue.ignore,
      })).sort((a, b) => {
        const nameA = a.pcs.toLowerCase();
        const nameB = b.pcs.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
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
