<template>
  <div class="app-selection-sidebar" :class="{ absolute: absolute }">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="app-selection-sidebar-leftside">
        <h2 class="app-selection-sidebar-leftside-title" translate="no">
          {{ plant.name }}
        </h2>
        <b-tabs>
          <b-tab>
            <template #title><app-icon-analysis /> <span class="pad-left">{{ $t('analysis') }}</span></template>
            <app-analysis-selection :plant="plant" :analyses="analyses" />
          </b-tab>
          <b-tab>
            <template #title><app-icon icon="clipboard-data" /> <span class="pad-left">{{ $t('observations') }}</span></template>
            <app-observation-selection :plant="plant" />
          </b-tab>
        </b-tabs>
        
      </div>
    </app-sidebar>
  </div>
</template>

// <script lang="ts">
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { SelectionSidebarEvent, selectionSidebarEventService } from "./selection-sidebar-event-serivce";
import AppAnalysisSelection from "./analysis-selection/analysis-selection.vue";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppObservationSelection from "./observation-selection/observation-selection.vue";

@Component({
  name: "app-selection-sidebar",
  components: {
    AppSidebar,
    AppAnalysisSelection,
    AppIcon,
    AppIconAnalysis,
    AppObservationSelection,
  },
})
export default class AppAnalysisSelectionSidebar extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  absolute = true;

  async created() {
    selectionSidebarEventService.on(this.plant.id, SelectionSidebarEvent.SIDEBAR_ABSOLUTE, async (absolute) => {
      this.absolute = absolute;
    });
  }

  onSidebarToggled(): void {
    this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix sidebar overlays toaster
.b-popover {
  z-index: 1101;
}

.app-selection-sidebar {
  height: calc(100vh - #{$header-height});
  display: flex;

  &.absolute {
    position: absolute;
  }

  &-leftside {
    padding: 0.5em;
    height: 100%;
    width: 100%;
    border-right: $border-color-grey 1px solid;
    display: flex;
    flex-flow: column;

    &-title {
      margin-bottom: 1em;
      margin-left: 10px;
    }
  }

  .tab-content {
    padding-top: 1em;
  }
}
</style>
