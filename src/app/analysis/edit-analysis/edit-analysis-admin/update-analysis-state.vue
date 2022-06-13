<template>
  <app-box>
    <template #title>
      <h4 style="margin-bottom: 1em">
        {{ $t("update-analysis-state") }}
        <br />
        <small
          v-if="!analysis.plant.in_setup_phase"
          class="grayed"
          v-html="$t('attention-state-update-starts-evaulation_expl')"
        >
        </small>
      </h4>
    </template>
    <b-form @submit.prevent="onSubmitUpdateState">
      <b-form-group>
        <b-form-checkbox v-model="sendNotification">
          {{ $t("send-notification") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-new-analysis-state')">
        <b-form-select required v-model="selectedUpdateState" :options="updateStateOptions"></b-form-select>
      </b-form-group>
      <b-form-group :label="$t('message')">
        <b-form-textarea v-model="selectedUpdateStateMessage" :placeholder="$t('message')" row="5" />
      </b-form-group>
      <app-button type="submit" :loading="loading">{{ $t("update") }}</app-button>
    </b-form>
  </app-box>
</template>

<script lang="ts">
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { apiStateNames, ApiStates } from "@/app/shared/services/volateq-api/api-states";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop, Watch } from "vue-property-decorator";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import AppBox from "@/app/shared/components/app-box/app-box.vue";

@Component({
  name: "app-update-analysis-state",
  components: {
    AppButton,
    AppBox,
  },
})
export default class AppUpdateAnalysisState extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;
  selectedUpdateState: ApiStates | null = null;
  updateStateOptions: { value: number; text: string }[] | null = null;
  selectedUpdateStateMessage = "";
  sendNotification = false;

  private analysisStates: Record<ApiStates, ApiStates[]> | null = null;

  async created() {
    await this.updateAnalysisStates();
  }

  @Watch("analysis") async onUpdateAnalysis() {
    await this.updateAnalysisStates();
  }

  async updateAnalysisStates() {
    try {
      if (this.analysisStates === null) {
        this.analysisStates = await volateqApi.getStates();
      }

      this.setUpdateStateOptions();
    } catch (e) {
      this.showError(e);
    }
  }

  async onSubmitUpdateState() {
    try {
      this.loading = true;

      if (!this.selectedUpdateState) {
        throw { error: "NO_STATE_SELECTED", message: "Please, selecte a state" };
      }

      await volateqApi.updateAnalysisState(this.analysis!.id, {
        state_id: this.selectedUpdateState!,
        message: this.selectedUpdateStateMessage,
        do_send_mail: this.sendNotification,
      });

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

      this.showSuccess(this.$t("update-analysis-state-success").toString());
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private setUpdateStateOptions() {
    if (!this.analysis!.current_state) {
      this.updateStateOptions = [];
      return;
    }

    const apiStates: ApiStates[] = this.analysisStates![this.analysis!.current_state.state.id];
    if (apiStates.length === 0) {
      this.updateStateOptions = [];
      return;
    }

    this.updateStateOptions = apiStates.map(state_id => ({
      value: state_id,
      text: this.$t(apiStateNames[state_id]).toString(),
    }));
  }
}
</script>
