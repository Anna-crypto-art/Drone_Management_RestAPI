<template>
  <div class="app-plant-admin-view-change-history">
    <app-box :title="$t('modification-history')">
      <app-table 
        :columns="analysisResultChangeHistoryColumns"
        :rows="analysisResultChangeHistoryRows"
        :loading="loading"
        :hoverActions="true"
      >
        <template #hoverActions="row">
          <app-button
            @click="onUndoClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('undo')"
            icon="arrow-bar-left"
            :loading="loadingUndo"
          />
        </template>
      </app-table>
    </app-box>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { KeyFigureTypeMap } from '../visualization/types';
import { ApiKeyFigure } from '@/app/shared/services/volateq-api/api-key-figures';
import dateHelper from "@/app/shared/services/helper/date-helper";
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { analysisResultEventService } from './analysis-result-event-service';
import { AnalysisResultEvent } from './types';
import { AppTableColumns } from '@/app/shared/components/app-table/types';


@Component({
  name: "app-plant-admin-view-change-history",
  components: {
    AppBox,
    AppButton,
    AppTable,
  }
})
export default class AppPlantAdminViewChangeHistory extends BaseAuthComponent {
  @Prop({ default: null }) analysisResult!: AnalysisResultDetailedSchema | null;
  @Prop({ required: true }) layers!: KeyFigureTypeMap[];
  
  analysisResultChangeHistoryRows: any[] = [];
  analysisResultChangeHistoryColumns: AppTableColumns = [];

  loading = false;
  loadingUndo = false;

  async created() {
    this.analysisResultChangeHistoryColumns = [
      { key: "keyFigureId", label: this.$t("pi").toString() },
      { key: "pcs", label: this.$t("pcs").toString() },
      { key: "prevVal", label: this.$t("previous-value").toString() },
      { key: "changedAt", label: this.$t("changed-at").toString() },
    ];

    await this.onAnalysisResultChanged();
  }

  @Watch("analysisResult")
  async onAnalysisResultChanged() {
    await this.analysisResultChanged();

    if (this.analysisResult) {
      const eventAddedAlready = !!analysisResultEventService.getListeners(this.analysisResult.id, AnalysisResultEvent.MODIFIED)
        .find(fn => fn === this.analysisResultChanged)

      if (!eventAddedAlready) {
        analysisResultEventService.on(this.analysisResult.id, AnalysisResultEvent.MODIFIED, this.analysisResultChanged)
      }
    }
  }

  async analysisResultChanged() {
    await this.refreshAnalysisResultChangeHistory();
  }

  @CatchError("loadingUndo")
  async onUndoClick(row: any) {
    if (!confirm(this.$t("apply-are-you-sure").toString())) {
      return;
    }

    await volateqApi.undoAnalysisResultValueChange(row.id);

    this.showSuccess(this.$t("Undo successfull").toString());

    analysisResultEventService.emit(this.analysisResult!.id, AnalysisResultEvent.MODIFIED);
  }

  @CatchError("loading")
  private async refreshAnalysisResultChangeHistory() {
    if (!this.analysisResult) {
      return;
    }

    this.analysisResultChangeHistoryRows = (await volateqApi.getAnalysisResultChangeHistory(this.analysisResult.id)).map((hist => ({
      id: hist.id,
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