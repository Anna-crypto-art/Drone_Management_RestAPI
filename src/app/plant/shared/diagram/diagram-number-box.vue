<template>
  <div :class="'diagram-number-box' + (active ? ' active' : '')">
    <slot name="name">
      <div class="diagram-number-box-name grayed">{{ numberBox.displayName }}</div>
    </slot>
    <slot name="number">
      <div class="diagram-number-box-number" v-if="numberBox.num">
        <span>{{ numberBox.num }}</span>
        <small v-if="numberBox.diff !== undefined" :class="textVariant">
          {{ numberBox.diff }}
        </small>
      </div>
      <div class="diagram-number-box-numbers" v-if="numberBox.nums">
        <b-row v-for="num in numberBox.nums" :key="num.columnName">
          <!-- size depends on compare view yes/no -->
          <b-col :cols="getBootstrapColumnSize(num.diff, active)"
            :class="num.diff !== undefined ? 'diagram-number-box-numbers-compare-row' : ''">
            {{ num.displayName }}
          </b-col>
          <b-col>
            <strong class="diagram-number-box-numbers-num">{{ num.num }}</strong>
            <small v-if="num.diff !== undefined" :class="getTextVariant(num.diffVariant)">
              {{ num.diff }}
            </small>
          </b-col>
        </b-row>
      </div>
      <div v-if="numberBox.unit" class="diagram-number-box-number-label grayed">
        {{ unit }}
      </div>
    </slot>
    <app-button class="diagram-number-box-close-button" 
      variant="secondary"
      @click="onCloseButtonClick"
      v-show="active"
    >
      {{ $t("close") }}
    </app-button>
    <div class="diagram-number-box-action-buttons">
      <app-button class="diagram-number-box-action-buttons-button" 
        v-if="showHistoryButton"
        variant="primary"
        @click="onShowHistoryButtonClick"
        :title="$t('show-history-diagram')"
      >
        <b-icon icon="graph-up" />
      </app-button>
      <app-button class="diagram-number-box-action-buttons-button" 
        v-if="showAreasButton"
        variant="primary"
        @click="onShowAreasButtonClick"
        :title="$t('show-areas-diagram')"
      >
        <b-icon icon="bar-chart-fill" />
      </app-button>
      <app-button class="diagram-number-box-action-buttons-button"
        variant="secondary"
        @click="onViewMapButtonClick"
        :title="$t('show-in-map')"
      >
        <b-icon icon="map" />
      </app-button>
      <div class="clearfix"></div>
    </div>
    <div class="diagram-container" v-show="numberBox.historyActive">
      <slot name="historyDiagram" />
    </div>
    <div class="diagram-container" v-show="numberBox.areasActive">
      <slot name="areasDiagram" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { DiagramNumberBox } from "./types";

@Component({
  name: "app-diagram-number-box",
  components: {
    AppButton,
  }
})
export default class AppDiagramNumberBox extends Vue {
  @Prop({ required: true }) numberBox!: DiagramNumberBox;
  @Prop({ default: true }) showHistoryButton!: boolean;
  @Prop({ default: true }) showAreasButton!: boolean;

  get textVariant() {
    return this.getTextVariant(this.numberBox.diffVariant!)
  }

  get active(): boolean {
    return !!(this.numberBox.historyActive || this.numberBox.areasActive);
  }

  getTextVariant(diffVariant: string) {
    if (diffVariant === 'success') {
      return 'text-success';
    } else if (diffVariant === 'danger') {
      return 'text-danger';
    } else if (diffVariant === 'default') {
      return 'grayed';
    }

    return '';
  }

  getBootstrapColumnSize(diff: number, active: boolean) {
    if (active) {
      return '3';
    } else {
      if (diff !== undefined) {
        return '6'
      }
    }
    return '8';
  }

  onShowHistoryButtonClick() {
    this.$emit("showHistoryButtonClick", this.numberBox.id)
  }
  onShowAreasButtonClick() {
    this.$emit("showAreasButtonClick", this.numberBox.id)
  }
  onCloseButtonClick() {
    this.$emit("closeButtonClick", this.numberBox.id)
  }

  onViewMapButtonClick() {
    this.$emit("viewMapButtonClick", this.numberBox.id);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.diagram-number-box {
  padding: 1em;
  margin: 0 1em 1em 0;
  border: 1px solid $blue;
  width: 250px;
  height: 200px;
  background-color: $white;
  position: relative;

  transition: all 0.3s ease;

  &-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    width: calc(800px + 3em);
    height: 625px;
  }
  
  &-number {
    font-weight: bold;
    font-size: 2em;
  }
  &-numbers {
    margin-top: 5px;

    &-num {
      font-weight: bold;
      font-size: 1.3em;
    }
    &-compare-row.col-6 {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &-action-buttons {
    position: absolute;
    top: 145px;
    right: 1em;

    &-button {
      float: right;
      margin-left: 5px;
    }
  }

  &-close-button {
    position: absolute;
    top: 1em;
    right: 1em;
  }

  .diagram-container {
    position: absolute;
    left: 1em;
    bottom: 1em;
  }
}
</style>