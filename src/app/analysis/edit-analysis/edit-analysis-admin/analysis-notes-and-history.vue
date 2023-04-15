<template>
  <app-box :title="$t('notes-and-history')" class="app-analysis-notes-and-history">
    <div class="notes-container font-xs mar-bottom" v-html="notesAndHistory">
    </div>
    <b-form-group :label="$t('note')">
      <b-textarea v-model="note" />
    </b-form-group>
    <app-button type="button" :loading="loading" @click="onAppendNoteClick" :disabled="isAppendNoteButtonDisabled">
      {{ $t("append-note") }}
    </app-button>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { analysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";

@Component({
  name: "app-analysis-notes-and-history",
  components: {
    AppButton,
    AppBox,
  },
})
export default class AppAnalysisNotesAndHistory extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  notesAndHistory = "";
  note: string | null = null;
  loading = false;

  @CatchError()
  async created() {
    analysisEventService.on(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS, async () => {
      await this.updateNotesAndHistory();
    })

    await this.updateNotesAndHistory();
  }

  get isAppendNoteButtonDisabled(): boolean {
    return this.note === null || this.note.trim() === "";
  }

  @CatchError("loading")
  async onAppendNoteClick() {
    if (!this.note) {
      throw { error: "EMPTY_NOTE", message: "Please type a note" };
    }

    if (!confirm(this.$t("add-analysis-note-are-you-sure").toString())) {
      return;
    }

    await volateqApi.appendAnalysisNote(this.analysis.id, this.note);

    await this.updateNotesAndHistory();

    this.note = null;
  }

  private async updateNotesAndHistory() {
    let notesAndHistory = (await volateqApi.getAnalysisNotesAndHistory(this.analysis.id)).notes_and_history;
    
    notesAndHistory = notesAndHistory.replace(/\n/g, "<br>");

    for (const match of (notesAndHistory.match(/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2} \| NOTE \|[^<]*)/g) || [])) {
      notesAndHistory = notesAndHistory.replace(match, `<b>${match}</b>`);
    }

    this.notesAndHistory = notesAndHistory;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-analysis-notes-and-history {
  .notes-container {
    max-height: 300px;
    padding: 0.5em;
    border: 1px solid $border-color-grey;
    background-color: $white;
    overflow: auto;
  }
}
</style>
