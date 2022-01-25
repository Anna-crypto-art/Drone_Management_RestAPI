<template>
  <div class="admin-box">
    <h4>{{ $t("update-analysis-state") }}</h4>
    <b-form @submit.prevent="onSubmitUpdateState">
      <b-form-group>
        <b-form-checkbox v-model="sendMail">
          {{ $t("send-mail") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-new-analysis-state')">
        <b-form-select required v-model="selectedUpdateState" :options="updateStateOptions"></b-form-select>
      </b-form-group>
      <b-form-group :label="$t('message')">
        <b-form-textarea v-model="selectedUpdateStateMessage" :placeholder="$t('message')" row="5" />
      </b-form-group>
      <app-button ref="submitUpdateStateButton" type="submit">{{ $t("update") }}</app-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IUpdateEditAnalysis } from "@/app/analysis/edit-analysis/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { apiStateNames, ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { IAppButton } from "@/app/shared/components/app-button/types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-update-analysis-state",
  components: {
    AppButton
  }
})
export default class AppUpdateAnalysisState extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() submitUpdateStateButton!: IAppButton;

  selectedUpdateState: ApiStates | null = null;
  updateStateOptions: { value: number, text: string }[] | null = null;
  selectedUpdateStateMessage = "";
  sendMail = false;

  private analysisStates: Record<ApiStates, ApiStates[]> | null = null;

  async created() {
    await this.updateAnalysis(this.analysis);
  }

  async updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;

    try {
      if (this.analysisStates === null) {
        this.analysisStates = await volateqApi.getStates();
      }

      this.setUpdateStateOptions();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onSubmitUpdateState() {
    try {
      this.submitUpdateStateButton.startLoading();

      if (!this.selectedUpdateState) {
        throw { error: "NO_STATE_SELECTED", message: "Please, selecte a state" };
      }

      await volateqApi.updateAnalysisState(this.analysis!.id, {
        state_id: this.selectedUpdateState!,
        message: this.selectedUpdateStateMessage,
        do_send_mail: this.sendMail,
      });

      this.$emit("updateAnalysis");

      appContentEventBus.showSuccessAlert(this.$t("update-analysis-state-success").toString());
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.submitUpdateStateButton.stopLoading();
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