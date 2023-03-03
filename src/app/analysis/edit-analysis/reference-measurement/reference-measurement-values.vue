<template>
  <div v-show="refMeasureId">
    <app-table-container>
      <app-table
        :rows="refMeasureValueItems"
        :columns="refMeasureValueColumns"
        :loading="loading"
        :hoverActions="true"
      >
        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            @click="onIgnoreClick(row.item)"
            variant="secondary"
            size="sm"
            :title="row.item.ignored ? $t('ignore-value-undo') : $t('ignore-value')"
            :icon="row.item.ignored ? 'plus-circle' : 'dash-circle'"
          />
        </template>
      </app-table>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppTableColumns } from "@/app/shared/components/app-table/types";

@Component({
  name: "app-reference-measurement-values",
  components: {
    AppTableContainer,
    AppTable,
    AppButton,
  }
})
export default class AppReferenceMeasurementValues extends BaseAuthComponent {
  @Prop({ default: null }) refMeasureId!: string | null;

  loading = false;

  refMeasureValueItems: Array<any> = [];
  refMeasureValueColumns: AppTableColumns = [
    { key: "pcs", label: this.$t("pcs").toString() },
    { key: "notes", label: this.$t("notes").toString() },
    { key: "ignored", label: this.$t("ignored").toString() },
  ];

  async created() {
    // TODO: add dynamic columns

    await this.updateRefMeasurementValues();
  }

  @Watch('refMeasureId')
  async onRefMeasureChanged() {
    await this.updateRefMeasurementValues();
  }

  async onIgnoreClick(refMeasureItem: any) {
    try {
      await volateqApi.ignoreReferenceMeasurementEntry(refMeasureItem.id, !refMeasureItem.ignored);

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

      // TODO do it
      
      // this.refMeasureValueItems = (await volateqApi.getReferenceMeasurementEntries(this.refMeasureId)).map(refMeasureValue => ({
      //   id: refMeasureValue.id,
      //   pcs: refMeasureValue.fieldgeometry_component!.kks,
      //   absorberTemperature: refMeasureValue.hce_temperature,
      //   brokenGlass: refMeasureValue.hce_broken_glass,
      //   notes: refMeasureValue.notes,
      //   ignored: refMeasureValue.ignore,
      // })).sort((a, b) => {
      //   const nameA = a.pcs.toLowerCase();
      //   const nameB = b.pcs.toLowerCase();

      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });
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
