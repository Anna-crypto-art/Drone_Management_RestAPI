<template>
  <div class="app-step-progress">
    <div v-for="step in realSteps" :key="step.id" 
      :class="'app-step-progress-step ' + step.class" 
      :id="'appStepProgressStep' + step.id"
    >
      <div :class="'app-step-progress-step-counter ' + (step.danger ? 'text-danger' : '')">
        {{ step.danger ? 'X' : step.id }}
      </div>
      <div :class="'app-step-progress-step-name ' + (step.danger ? 'text-danger' : '')">
        {{ step.name }}
      </div>
      <b-popover v-if="step.active" :target="'appStepProgressStep' + step.id" triggers="hover" placement="top">
        <span v-html="step.description"></span>
      </b-popover>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { ProgressStep } from "./types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue"

@Component({
  name: "app-step-progress",
  components: {
    AppExplanation,
  }
})
export default class AppStepProgress extends Vue {
  @Prop({ required: true }) steps!: ProgressStep[];

  realSteps: (ProgressStep & { class: string })[] = [];

  created() {
    this.onStepsChanged();
  }

  @Watch('steps') onStepsChanged() {
    const stepTransTime = 300; // ms

    this.realSteps = [];

    this.steps.forEach((step, index) => {
      const realStep = {
        id: step.id,
        name: step.name,
        description: step.description,
        active: step.active,
        danger: step.danger,
        class: "",
      };
      this.realSteps.push(realStep);

      setTimeout(() => realStep.class = this.getStepClass(step), index * stepTransTime);
    });
  }

  getStepClass(step: ProgressStep): string {
    if (this.isStepComplete(step)) {
      return "completed";
    }

    if (this.isActiveStep(step)) {
      return "active";
    }

    return "";
  }

  isStepComplete(step: ProgressStep): boolean {
    return this.activeStep && this.activeStep.id > step.id || false;
  }

  isActiveStep(step: ProgressStep): boolean {
    return this.activeStep && this.activeStep.id === step.id || false;
  }

  get activeStep(): ProgressStep | undefined {
    return this.steps.find(step => step.active);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$stepTop: 12px;
$stepBorder: 2px;
$completeColor: $blue;
$uncompleteColor: $grey;
$stepSize: 25px;
$stepMarginBottom: 3px;
$stepTransTime: .3s;
$counterCompleteColor: $blue;
$counterFontSize: 0.7em;

.app-step-progress {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;

  &-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    &::before {
      position: absolute;
      content: "";
      border-bottom: $stepBorder solid $completeColor;
      width: 0;
      top: $stepTop;
      left: 50%;
      z-index: 3;
      transition: width $stepTransTime linear;
    }
    &::after {
      position: absolute;
      content: "";
      border-bottom: $stepBorder solid $uncompleteColor;
      width: 100%;
      top: $stepTop;
      left: 50%;
      z-index: 2;
    }

    &.completed::before {
      width: 100%;
    }

    &.active {
      font-weight: bold;
    }

    &:first-child::before {
      left: 0;
    }
    &.completed:first-child::before {
      width: 150%;
    }
    &.active:first-child::before {
      width: 50%;
    }
    &:first-child::after {
      left: 0;
      width: 150%;
    }

    &:last-child::before {
      content: none;
    }
    &:last-child::after {
      content: none;
    }

    &-counter {
      position: relative;
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: $stepSize;
      height: $stepSize;
      border-radius: 50%;
      font-size: $counterFontSize;
      background: $white;
      border: 2px solid $uncompleteColor;
      margin-bottom: $stepMarginBottom;
    }
    &.completed &-counter, &.active &-counter {
      border: 2px solid $completeColor;
      background: $white;
      color: $dark;
    }

    &-name {
      font-size: 0.6em;
    }
    &.completed &-name, &.active &-name {
      color: $dark;
    }
  }
}
</style>
