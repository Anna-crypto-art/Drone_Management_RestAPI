<template>
  <b-toast :id="toastId" toast-class="app-feature-infos-toast" no-auto-hide solid toaster="b-toaster-bottom-center">
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
    <div v-if="featureInfos.actionsSummaries">
      <div v-for="actionsSummery in featureInfos.actionsSummaries" :key="actionsSummery.name" class="mar-top">
        <app-dropdown-button
          :variant="actionsSummery.buttonVariant"
          :title="actionsSummery.name"
          :loading="toastDropdownButtonLoadings[actionsSummery.name]"
          size="sm"
        >
          <template #title>
            {{ actionsSummery.name }} <app-super-admin-marker v-if="actionsSummery.superAdminOnly" />
          </template>
          <b-dropdown-item-button v-for="action in actionsSummery.actions" :key="action.name"
            @click="onClickFeatureAction(action)"
          >
            {{ action.name }}
          </b-dropdown-item-button>
        </app-dropdown-button>
      </div>
    </div>
  </b-toast>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { Component, Prop } from "vue-property-decorator";
import { FeatureAction, FeatureInfos } from './types';
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseComponent } from '@/app/shared/components/base-component/base-component';

@Component({
  name: "app-feature-infos-toast",
  components: {
    AppExplanation,
    AppDropdownButton,
    AppButton,
    AppSuperAdminMarker,
  }
})
export default class AppFeatureInfosToast extends BaseComponent {
  @Prop({ required: true }) toastId!: string;
  @Prop({ required: true }) featureInfos!: FeatureInfos;

  toastDropdownButtonLoadings: Record<string, boolean> = {};

  created() {
    if (this.featureInfos.actionsSummaries) {
      for (const actionsSummery of this.featureInfos.actionsSummaries) {
        this.toastDropdownButtonLoadings[actionsSummery.name] = false;
      }
    }
  }

  @CatchError("toastDropdownButtonLoading")
  async onClickFeatureAction(action: FeatureAction) {
    await action.action();
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
}
</style>