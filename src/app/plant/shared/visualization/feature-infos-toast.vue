<template>
  <b-toast :id="toastId" class="app-feature-infos-toast" no-auto-hide solid toaster="b-toaster-bottom-center">
    <template #toast-title>
      <h5>{{ featureInfos.title }}</h5>
    </template>
    <div>
      <div class="toaster-images" v-if="featureInfos.images">
        <img v-for="image in featureInfos.images" :key="image.title" :title="image.title" :src="image.url" />
      </div>
      <b-row
        v-for="featureInfo in featureInfos.records"
        :key="featureInfo.name"
        :class="featureInfo.bold && 'font-weight-bold'"
      >
        <b-col>
          {{ featureInfo.name }}
          <app-super-admin-marker v-if="featureInfo.superAdminOnly" />
          <app-explanation v-if="featureInfo.descr">
            <span v-html="$t(featureInfo.descr)"></span>
          </app-explanation>
        </b-col>
        <b-col>
          {{ featureInfo.value }}
          <span v-if="featureInfo.unit">
            {{ featureInfo.unit }}
          </span>
        </b-col>
      </b-row>
    </div>
    <div v-if="featureInfos.actions" class="toaster-actions">
      <app-dropdown-button 
        :variant="featureInfos.actions.buttonVariant"
        :title="featureInfos.actions.name"
        :loading="toastDropdownButtonLoading"
        size="sm"
      >
        <b-dropdown-item-button v-for="action in featureInfos.actions.actions" :key="action.name"
          @click="onClickFeatureAction(action.name)"
        >
          {{ action.name }}
        </b-dropdown-item-button>
      </app-dropdown-button>
    </div>
  </b-toast>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { FeatureInfos } from './types';
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";

@Component({
  name: "app-feature-infos-toast",
  components: {
    AppExplanation,
    AppDropdownButton,
    AppButton,
    AppSuperAdminMarker,
  }
})
export default class AppFeatureInfosToast extends Vue {
  @Prop({ required: true }) toastId!: string;
  @Prop({ required: true }) featureInfos!: FeatureInfos;

  toastDropdownButtonLoading = false;

  @CatchError("toastDropdownButtonLoading")
  async onClickFeatureAction(actionName: string) {
    await this.featureInfos.actions!.actions.find(action => action.name === actionName)!.action();
  }
}
</script>

<style lang="scss">
.app-feature-infos-toast {
  &.toast {
    /* Fix ortho images dropdown visibility */
    overflow: visible;
  }

  .toaster-images {
    img {
      max-width: calc(500px - 1.5rem);
    }
    margin-bottom: 0.75rem;
  }
  .toaster-actions {
    margin-top: 15px;
  }
}
</style>