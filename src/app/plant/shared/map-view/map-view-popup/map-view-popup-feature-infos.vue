<template>
  <div class="app-map-view-popup-feature-infos" v-if="featureInfos.length > 0">
    <h4 class="no-mar-top mar-bottom-half">
      <slot name="title">
        {{ title }}
      </slot>
    </h4>
    <app-box class="app-map-view-popup-feature-infos no-mar-top no-mar-bottom">
      <div v-for="(featureInfo, index) in internFeatureInfos" :key="index">
        <div v-show="featureInfo.visible" v-if="featureInfo.value">
          <div class="app-map-view-popup-feature-infos-name" 
            :class="{ collapsable: featureInfo.collapsable, collapsed: featureInfo.collapsed }" 
            @click="onFeatureInfosNameClick(featureInfo)"
          >
            <small :class="{ grayed: !featureInfo.collapsable, blue: featureInfo.collapsable }">
              <app-expl-wrap :expl="featureInfo.descr" ><b>{{ featureInfo.name }}</b></app-expl-wrap>
              <app-super-admin-marker v-if="featureInfo.superAdminOnly" />
            </small>
            <small v-if="featureInfo.collapsable" class="font-xs pad-left-half">
              <app-icon :icon="featureInfo.collapsed ? 'chevron-up' : 'chevron-down'" class="blue" />
            </small>
          </div>
          <div class="app-map-view-popup-feature-infos-value" >
            <div v-if="!featureInfo.collapsed" :class="{ bold: featureInfo.bold }">
              {{ featureInfo.value }}<span v-if="featureInfo.unit">{{ featureInfo.unit }}</span>
            </div>
            <template v-if="featureInfo.historyValues && featureInfo.collapsed">
              <div v-for="(histVal, index) in featureInfo.historyValues" :key="index"
                :class="{ bold: histVal.bold }"
              >
                <app-expl-wrap :expl="histVal.descr">{{ histVal.value }}<span v-if="featureInfo.unit">{{ featureInfo.unit }}</span></app-expl-wrap>
                <small class="pad-left grayed">{{ histVal.date }}</small>
              </div>
            </template>
          </div>
          <hr class="mar-bottom-half mar-top-half" v-show="hasHiddenFeatures || index + 1 < featureInfos.length" />
        </div>
      </div>
      <a href="#" @click.prevent="onShowMoreFeaturesClick" v-if="hasHiddenFeatures">
        {{ hiddenFeaturesVisible ? $t("hide") : $t("show-more") }}
      </a>
      <app-loading v-if="loading" />
    </app-box>
  </div>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { Component, Prop, Watch } from "vue-property-decorator";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { FeatureInfo, FeatureInfoType, InternalFeatureInfo, ObservFeatureInfo } from './types';
import AppBox from '@/app/shared/components/app-box/app-box.vue';
import AppExplWrap from '@/app/shared/components/app-explanation/app-expl-wrap.vue';
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { FieldgeometryComponentSchema } from '@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema';
import dateHelper from '@/app/shared/services/helper/date-helper';
import AppIcon from '@/app/shared/components/app-icon/app-icon.vue';
import { ObservationSchema } from '@/app/shared/services/volateq-api/api-schemas/observation-schema';

@Component({
  name: "app-map-view-popup-feature-infos",
  components: {
    AppExplWrap,
    AppSuperAdminMarker,
    AppBox,
    AppLoading,
    AppIcon,
  }
})
export default class AppMapViewPopupFeatureInfos extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) featureInfos!: FeatureInfo[];
  @Prop({ default: "" }) title!: string;
  @Prop({ required: true }) fieldgeometryComponent!: FieldgeometryComponentSchema;

  internFeatureInfos: InternalFeatureInfo[] = [];
  hiddenFeaturesVisible = false;

  loading = false;

  created() {
    this.refreshInternFeatureInfos();
  }

  @Watch("featureInfos")
  onFeatureInfosChanged() {
    this.hiddenFeaturesVisible = false;

    this.refreshInternFeatureInfos();
  }

  @CatchError()
  onShowMoreFeaturesClick() {
    for (const featureInfo of this.internFeatureInfos) {
      if (featureInfo.hidden) {
        featureInfo.visible = !featureInfo.visible;
      }
    }

    this.hiddenFeaturesVisible = !this.hiddenFeaturesVisible;
  }

  @CatchError("loading")
  async onFeatureInfosNameClick(featureInfo: InternalFeatureInfo) {
    if (!featureInfo.collapsable) {
      return;
    }

    if (!featureInfo.historyValues) {
      switch (featureInfo.type) {
        case FeatureInfoType.OBSERVATION: {
          const currentObservation: ObservationSchema = (featureInfo as unknown as ObservFeatureInfo).observation;

          const observations = await volateqApi.getObservations(
            this.plant.id,
            this.fieldgeometryComponent.component_id,
            dateHelper.toDateTimeWithSeconds(new Date(0)),
            dateHelper.toDateTimeWithSeconds(new Date(), true),
            {
              search_text: this.fieldgeometryComponent.kks,
              search_mode: 'equals',
              ccp_ids: [featureInfo.id],
              limit: 100,
            }
          );

          featureInfo.historyValues = observations.items.map(item => ({
            value: item.column_values[featureInfo.id].toString(),
            date: dateHelper.toDateTime(item.observed_at),
            descr: item.notes,
            bold: item.id === currentObservation.id,
          }));
  
          break;
        }
      }
    }

    featureInfo.collapsed = !featureInfo.collapsed;
  }

  get hasHiddenFeatures(): boolean {
    return !!this.internFeatureInfos.find(f => f.hidden);
  }

  private refreshInternFeatureInfos() {
    this.internFeatureInfos = this.featureInfos.map(f => ({
      ...f,
      collapsed: false,
      visible: !f.hidden,
      historyValues: null,
    }));
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-popup-feature-infos {
  position: relative;

  &-name {
    line-height: 1;

    &.collapsable {
      cursor: pointer;
      &.collapsed {
        line-height: 1.5;
      }
    }
  }

  &-value {
    & .bold {
      font-weight: bold;
    }
  }
}
  
</style>