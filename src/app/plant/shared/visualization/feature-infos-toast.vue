<template>
  <b-toast :id="toastId" toast-class="app-feature-infos-toast" no-auto-hide solid toaster="b-toaster-bottom-center">
    <template #toast-title>
      <h5>{{ featureInfos.title }}</h5>
    </template>
    <div>
      <div class="toaster-images" v-if="featureInfos.images">
        <img v-for="image in featureInfos.images" :key="image.title" :title="image.title" :src="image.url" />
      </div>
      <div class="app-feature-infos-toast-group" v-for="group in featureInfos.groups" :key="group.title">
        <div class="app-feature-infos-toast-group-title">{{ group.title }}</div>
        <b-row
          v-for="featureInfo in group.records"
          :key="featureInfo.name"
          :class="{ 'font-weight-bold': featureInfo.bold, 'hidden-feature': featureInfo.hidden && !featureInfo._visible }"
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
        <div v-if="hasHiddenFeatures(group)" class="app-feature-infos-toast-group-show-more">
          <a href="#" @click.prevent="onShowMoreClick(group)">
            {{ hiddenFeaturesVisible ? $t("hide") : $t("show-more") }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="featureInfos.actionsSummaries" class="pad-top">
      <div v-for="actionsSummery in featureInfos.actionsSummaries" :key="actionsSummery.name" class="mar-top">
        <app-button v-if="isSingleAction(actionsSummery)"
          :variant="actionsSummery.buttonVariant"
          :loading="toastDropdownButtonLoadings[actionsSummery.name]"
          @click="onClickFeatureAction(actionsSummery.actions[0])"
          size="sm"
        >
          {{ actionsSummery.name }}
        </app-button>
        <app-dropdown-button v-if="!isSingleAction(actionsSummery)"
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { FeatureAction, FeatureActionsSummary, FeatureInfoGroup, FeatureInfos } from './types';
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

  hiddenFeaturesVisible = false;

  created() {
    if (this.featureInfos.actionsSummaries) {
      for (const actionsSummery of this.featureInfos.actionsSummaries) {
        this.toastDropdownButtonLoadings[actionsSummery.name] = false;
      }
    }
  }

  @Watch("featureInfos")
  onFeatureInfosChanged() {
    this.setFeatureVisibility();
  }

  @CatchError("toastDropdownButtonLoading")
  async onClickFeatureAction(action: FeatureAction) {
    await action.action();
  }

  isSingleAction(actionsSummery: FeatureActionsSummary): boolean {
    return actionsSummery.actions.length === 1 && actionsSummery.actions[0].name === actionsSummery.name;
  }

  hasHiddenFeatures(group: FeatureInfoGroup): boolean {
    return !!group.records.find(r => r.hidden);
  }

  @CatchError()
  onShowMoreClick(group: FeatureInfoGroup) {
    this.hiddenFeaturesVisible = !this.hiddenFeaturesVisible;

    this.setFeatureGroupVisibility(group);
  }

  private setFeatureVisibility() {
    for (const group of this.featureInfos.groups) {
      if (this.hasHiddenFeatures(group)) {
        this.setFeatureGroupVisibility(group);
      }
    }
  }

  private setFeatureGroupVisibility(group: FeatureInfoGroup) {
    for (const featureInfo of group.records) {
      featureInfo._visible = this.hiddenFeaturesVisible;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-feature-infos-toast {
  &.toast {
    /* Fix ortho images dropdown visibility */
    overflow: visible;
  }

  &-group {
    margin-bottom: 5px;

    &-title {
      background-color: $grey;
      margin: 0 -0.75rem 5px -0.75rem;
      padding: 5px 0.75rem;
      font-size: 1rem;
    }

    &-show-more {
      text-align: center;
      font-size: 1rem;
      padding: 5px;
    }

    .col {
      word-wrap: anywhere;
    }
  }


  .toaster-images {
    img {
      max-width: calc(500px - 1.5rem);
    }
    margin-bottom: 0.75rem;
  }

  .hidden-feature {
    display: none;
  }
}
</style>