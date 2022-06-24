<template>
  <app-content
    :title="$t('QFly Analysis Monitoring')"
    :subtitle="$t('Overview about all currently running evaluations.')"
  >
    <div class="monitoring-toolbar">
      <b-button @click="loadAnalysisStatus()">{{ $t("Reload") }}</b-button>
      <div class="monitoring-toolbar-loading"><b-spinner v-if="loading" /></div>
      <b-checkbox switch v-model="autoReload" @change="changeAutoReload">
        {{ $t("Auto reload") }}
      </b-checkbox>
    </div>

    <div class="app-analysis-monitoring">
      <div v-for="(states, analysisName) in monitoring_json" v-bind:key="analysisName">
        <b-card :class="{ 'app-analysis-monitoring-title': true, closed: !collapsed_states[analysisName] }">
          <span>{{ analysisName }}</span>
          <b-icon
            icon="chevron-down"
            font-scale="1.5"
            class="app-analysis-monitoring-toggle"
            variant="secondary"
            @click="toggleAnalysis(analysisName)"
          />
        </b-card>
        <b-collapse v-model="collapsed_states[analysisName]">
          <div v-if="typeof states === 'object'">
            <div v-for="(state, name) in states" v-bind:key="name" class="app-analysis-monitoring-states">
              <b-card no-body>
                <div
                  :class="`app-analysis-monitoring-state app-analysis-monitoring-state-${state.state.toLowerCase()}`"
                  :title="state.state"
                >
                  <span class="monitoring-project">{{ name }}</span>
                  <span class="monitoring-state grayed">{{ state.state }}</span>
                  <span class="monitoring-action grayed">{{ state.current_action }}</span>
                </div>
              </b-card>
            </div>
          </div>
          <div v-if="typeof states === 'string'">
            <div class="app-analysis-monitoring-states">
              <b-card no-body>
                <div
                  :class="`app-analysis-monitoring-state app-analysis-monitoring-state-crashed`"
                  title="CRASHED"
                >
                  {{ states }}
                </div>
              </b-card>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AnalysisMonitoring } from "@/app/shared/services/volateq-api/api-schemas/analysis-monitoring";

const AUTORELOAD_INTERVAL = 10e3;

@Component({
  name: "app-analysis-monitoring",
  components: {
    AppContent,
  },
})
export default class AppAnalysisMonitoring extends BaseAuthComponent {
  monitoring_json: AnalysisMonitoring | null = null;
  collapsed_states: { [k in string]: boolean } = {};
  loading = true;
  autoReload = false;

  reloadInterval?: ReturnType<typeof setInterval>; // the NodeJS.Timer type is undefined for some reason ¯\_(ツ)_/¯

  changeAutoReload(autoReload: boolean) {
    if (autoReload) {
      this.reloadInterval = setInterval(this.loadAnalysisStatus, AUTORELOAD_INTERVAL);
    } else {
      this.reloadInterval != undefined && clearInterval(this.reloadInterval);
    }
  }

  toggleAnalysis(name: string) {
    this.collapsed_states = { ...this.collapsed_states, [name]: !this.collapsed_states[name] }; // assigning to this.collapsed_states[name] breaks reactivity
  }

  async loadAnalysisStatus() {
    try {
      this.loading = true;
      const current_analyses = await volateqApi.getAnalysisMonitoring();

      for (const analysisName in current_analyses) {
        if (this.collapsed_states[analysisName] === undefined) {
          this.collapsed_states[analysisName] = true;
        }
      }

      this.monitoring_json = current_analyses;
      this.loading = false;
    } catch (e) {
      this.showError(e);
    }
  }

  async created() {
    this.loadAnalysisStatus();
  }
}
</script>

<style lang="scss">
@use "@/scss/_colors.scss";
@use "sass:color";

.monitoring-toolbar {
  display: grid;
  grid-template-columns: max-content auto max-content;
  margin-bottom: 30px;
  align-items: center;
  gap: 0.5rem;
}

.app-analysis-monitoring {
  &-title {
    .app-analysis-monitoring-toggle {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .card-text {
      margin-bottom: 0;
    }

    &.closed {
      .app-analysis-monitoring-toggle {
        transform: rotateZ(-90deg);
      }
    }

    .card-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-state {
    display: grid;
    gap: 10px;
    grid-template-areas:
      "project project"
      "state   action";
    padding: 1.25rem;

    .monitoring-project {
      grid-area: project;
    }

    .monitoring-state {
      grid-area: state;
    }

    .monitoring-action {
      grid-area: action;
      justify-self: end;
    }

    &-running {
      background: color.adjust(colors.$blue, $lightness: 45%); // use Volateq's blue with increased lightness
    }

    &-holding {
      background: #fff3cd;
    }

    &-crashed {
      background: #f8d7da;
    }

    &-finished {
      background: #d4edda;
    }

    &-launched {
      background: #e2e3e5;
    }
  }

  &-states {
    padding-left: 2rem;

    .card {
      border-top: none;
    }
  }
}
</style>
