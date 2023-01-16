<template>
  <div class="app-plant-admin-view-change-history">
    <app-box :title="$t('modification-history')">
      <b-table 
        :fields="analysisResultChangeHistoryColumns"
        :items="analysisResultChangeHistoryRows"
        head-variant="light"
        hover
        :busy="loading"
      >
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <app-button
              @click="onUndoClick(row.item)"
              variant="danger"
              size="sm"
              :title="$t('undo')"
              icon="arrow-bar-left"
              :loading="loadingUndo"
            />
          </div>
          <div class="clearfix"></div>
        </template>
      </b-table>
    </app-box>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { BvTableFieldArray } from 'bootstrap-vue';
import { KeyFigureTypeMap } from '../visualization/types';
import { ApiKeyFigure } from '@/app/shared/services/volateq-api/api-key-figures';
import dateHelper from "@/app/shared/services/helper/date-helper";
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { analysisSelectEventService } from '../analysis-selection-sidebar/analysis-selection-service';


@Component({
  name: "app-plant-admin-view-change-history",
  components: {
    AppBox,
    AppButton,
  }
})
export default class AppPlantAdminViewChangeHistory extends BaseAuthComponent {
  @Prop({ default: null }) analysisResult!: AnalysisResultDetailedSchema | null;
  @Prop({ required: true }) layers!: KeyFigureTypeMap[];
  
  analysisResultChangeHistoryRows: any[] = [];
  analysisResultChangeHistoryColumns: BvTableFieldArray = [];

  loading = false;

  async created() {
    this.analysisResultChangeHistoryColumns = [
      { key: "keyFigureId", label: this.$t("pi").toString() },
      { key: "pcs", label: this.$t("pcs").toString() },
      { key: "prevVal", label: this.$t("previous-value").toString() },
      { key: "changedAt", label: this.$t("changed-at").toString() },
      { key: "actions" },
    ];

    this.refreshAnalysisResultChangeHistory();

    // analysisSelectEventService.on()
  }

  @Watch("analysisResult")
  async analysisResultChanged() {
    await this.refreshAnalysisResultChangeHistory();
  }

  @CatchError("loadingUndo")
  async onUndoClick() {
    if (!confirm("apply-are-you-sure")) {
      return;
    }


  }

  @CatchError("loading")
  private async refreshAnalysisResultChangeHistory() {
    if (!this.analysisResult) {
      return;
    }

    this.analysisResultChangeHistoryRows = (await volateqApi.getAnalysisResultChangeHistory(this.analysisResult.id)).map((hist => ({
      keyFigureId: this.getKeyFigureName(hist.key_figure_id),
      pcs: hist.kks,
      prevVal: hist.previous_value,
      changedAt: dateHelper.toDateTime(hist.created_at)
    })));
  }

  private getKeyFigureName(keyFigureId: ApiKeyFigure): string {
    const layer = this.layers.find(l => l.keyFigureId === keyFigureId);
    if (layer && layer.keyFigureInfo) {
      return this.$t((layer.keyFigureInfo?.displayName || layer.keyFigureInfo.keyName)!).toString();
    }

    return ApiKeyFigure[keyFigureId].toString();
  }
}
</script>