<template>
  <div class="app-map-view-popup-feature-infos" v-if="featureInfos.length > 0">
    <h4 class="no-mar-top mar-bottom-half">
      <slot name="title">
        {{ title }}
      </slot>
    </h4>
    <app-box class="app-map-view-popup-feature-infos no-mar-top no-mar-bottom">
      <div v-for="(featureInfo, index) in featureInfos" :key="index">
        <div v-show="featureInfo._visible !== false" v-if="featureInfo.value">
          <div class="app-map-view-popup-feature-infos-name">
            <small class="grayed">
              <app-expl-wrap :expl="featureInfo.descr" ><b>{{ featureInfo.name }}</b></app-expl-wrap>
              <app-super-admin-marker v-if="featureInfo.superAdminOnly" />
            </small>
          </div>
          <div class="app-map-view-popup-feature-infos-value" :class="{ bold: featureInfo.bold }">
            {{ featureInfo.value }}
            <span v-if="featureInfo.unit">
              {{ featureInfo.unit }}
            </span>
          </div>
          <hr class="mar-bottom-half mar-top-half" v-show="hasHiddenFeatures || index + 1 < featureInfos.length" />
        </div>
      </div>
      <a href="#" @click.prevent="onShowMoreFeaturesClick" v-if="hasHiddenFeatures">
        {{ hiddenFeaturesVisible ? $t("hide") : $t("show-more") }}
      </a>
    </app-box>
  </div>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { Component, Prop, Watch } from "vue-property-decorator";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { FeatureInfo } from './types';
import AppBox from '@/app/shared/components/app-box/app-box.vue';
import AppExplWrap from '@/app/shared/components/app-explanation/app-expl-wrap.vue';

@Component({
  name: "app-map-view-popup-feature-infos",
  components: {
    AppExplWrap,
    AppSuperAdminMarker,
    AppBox,
  }
})
export default class AppMapViewPopupFeatureInfos extends BaseAuthComponent {
  @Prop({ required: true }) featureInfos!: FeatureInfo[];
  @Prop({ default: "" }) title!: string;

  hiddenFeaturesVisible = false;

  @Watch("featureInfos")
  onFeatureInfosChanged() {
    this.hiddenFeaturesVisible = false;
  }

  @CatchError()
  onShowMoreFeaturesClick() {
    for (const featureInfo of this.featureInfos) {
      if (featureInfo.hidden) {
        featureInfo._visible = !featureInfo._visible;
      }
    }
    this.hiddenFeaturesVisible = !this.hiddenFeaturesVisible;
  }

  get hasHiddenFeatures(): boolean {
    return !!this.featureInfos.find(f => f.hidden);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-popup-feature-infos {
  &-name {
    line-height: 1;
  }
  &-value.bold {
    font-weight: bold;
  }
}
  
</style>