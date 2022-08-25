<template>
  <div class="app-step-progress">
    <div v-for="step in realSteps" :key="step.id" :class="'app-step-progress-step ' + step.class">
      <div class="app-step-progress-step-counter">{{ step.id }}</div>
      <div class="app-step-progress-step-name">
        {{ step.name }}
        <!-- <app-explanation v-if="step.description">
          {{ step.description }}
        </app-explanation> -->
      </div>
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
    const stepTransTime = 250; // ms

    this.realSteps = [];

    this.steps.forEach((step, index) => {
      const realStep = {
        id: step.id,
        name: step.name,
        description: step.description,
        active: step.active,
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

$stepTop: 20px;
$stepBorder: 2px;
$completeColor: $blue;
$uncompleteColor: $grey;
$stepSize: 40px;
$stepMarginBottom: 6px;
$stepTransTime: .25s;
$counterCompleteColor: $white;

.app-step-progress {
  display: flex;
  justify-content: space-between;

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
      background: $uncompleteColor;
      margin-bottom: $stepMarginBottom;
    }
    &.completed &-counter {
      background: $completeColor;
      color: $counterCompleteColor
    }

    &-name {
      font-size: 0.6em;
    }
  }
}
</style>
