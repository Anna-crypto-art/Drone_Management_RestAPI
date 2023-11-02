<template>
  <div class="app-enabled-pi-fields">
    <app-box :title="$t('enable-pis')">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-cols-sm="4" label-cols-lg="2" v-for="(compEntry, i) in componentEntries" :key="i"
          :label="compEntry.componentName"
        >
          <app-multiselect v-model="compEntry.selected"
            :options="compEntry.options"
            :allowEmpty="true"
            @change="onChange"
          />
        </b-form-group>
        <div class="mar-top">
          <app-button type="submit" :loading="loading" :disabled="!enabledPiFieldsChanged" cls="mar-left-half pull-right">{{ $t("apply") }}</app-button>
          <app-button type="button" variant="secondary" :loading="cancelLoading" cls="pull-right" :disabled="!enabledPiFieldsChanged" @click="onCancel">{{ $t("cancel") }}</app-button>
          <div class="clear" />
        </div>
      </b-form>
    </app-box>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component'
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { apiComponentNames } from '@/app/shared/services/volateq-api/api-components/api-components-name';
import { apiTechnologyComponents } from '@/app/shared/services/volateq-api/api-components/api-components';
import { allMappings } from '@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { ComponentEnabledPiFields, PiField } from './types';
import { AnalysisResultMappingHelper } from '@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper';
import AppMultiselect from '@/app/shared/components/app-multiselect/app-multiselect.vue';

@Component({
  name: "app-enabled-pi-fields",
  components: {
    AppBox,
    AppButton,
    AppMultiselect,
  }
})
export default class AppEnabledPiFields extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;

  loading = false;
  cancelLoading = false;

  componentEntries: ComponentEnabledPiFields[] = []

  enabledPiFieldsChanged = false;
  
  async created() {
    await this.refreshComponentEntries();

    window.onbeforeunload = () => {
      if (this.enabledPiFieldsChanged) {
        return this.$t("ask-leave-unsaved-changes").toString();
      }

      return undefined;
    }
  }

  async unmounted() {
    window.onbeforeunload = () => undefined;
  }

  onChange() {
    this.enabledPiFieldsChanged = true;
  }

  @CatchError("loading")
  async onSubmit() {
    const deletedPiFieldIds: string[] = [];
    const newPiFields: PiField[] = [];

    for (const componentEntry of this.componentEntries) {
      deletedPiFieldIds.push(...componentEntry.piFields
        .filter(f => f.enabled_pi_field_id && !componentEntry.selected.find(s => s === f.id))
        .map(f => f.enabled_pi_field_id!));

      newPiFields.push(...componentEntry.piFields
        .filter(f => !f.enabled_pi_field_id && componentEntry.selected.find(s => s === f.id)));
    }

    if (deletedPiFieldIds.length > 0) {
      await volateqApi.disablePiFields(this.plant.id, { enable_pi_field_ids: deletedPiFieldIds });
    }
    if (newPiFields.length > 0) {
      await volateqApi.enablePiFields(this.plant.id, { pi_fields: newPiFields.map(f => ({
        key_figure_id: f.keyFigureId,
        pi_field_name: f.piFieldName,
      }))});
    }

    this.refreshComponentEntries();
  }

  @CatchError("cancelLoading")
  async onCancel() {
    await this.refreshComponentEntries();
  }

  private async refreshComponentEntries() {
    const componentEntries: ComponentEnabledPiFields[] = []

    const enabledPiFields = await volateqApi.getEnabledPiFields(this.plant.id);

    const apiComponents = apiTechnologyComponents[this.plant.technology_id];
    for (const apiComponent of apiComponents) {
      const mappings = allMappings.find(a => a.componentId === apiComponent);
      if (mappings) {
        const mappingHelper = new AnalysisResultMappingHelper(mappings.resultMapping);
        
        const entries = mappingHelper.getEntriesForObservations();
        if (entries.length > 0) {
          const selectedEntries = entries.filter(e => enabledPiFields.find(pi => {
            return e.piFieldName === pi.pi_field_name && e.keyFigureId === pi.key_figure.id
          }));
  
          componentEntries.push({
            componentName: this.$t(apiComponentNames[apiComponent]).toString(),
            options: entries.map(e => ({ id: mappingHelper.getEntryId(e), label: this.$t(e.transName).toString() })),
            selected: selectedEntries.map(e => mappingHelper.getEntryId(e)),
            piFields: entries.map(e => {
              const entryId = mappingHelper.getEntryId(e);
              return {
                id: entryId,
                keyFigureId: e.keyFigureId!, 
                piFieldName: mappingHelper.getPropertyName(e),
                enabled_pi_field_id: enabledPiFields
                  .find(pi => pi.key_figure.id === e.keyFigureId && pi.pi_field_name === e.piFieldName)
                  ?.id
              };
            }),
          });
        }
      }
    }

    this.componentEntries = componentEntries;

    this.enabledPiFieldsChanged = false;
  }
}
</script>

<style lang="scss">

</style>