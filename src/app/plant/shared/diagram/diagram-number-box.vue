<template>
  <div :class="'diagram-number-box' + (numberBox.active ? ' active' : '')">
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
          <b-col cols="8">{{ num.displayName }}</b-col>
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
    <slot name="action" v-if="showActionButton">
      <app-button class="diagram-number-box-button" :variant="buttonVariant" @click="onActionButtonClick">
        {{ numberBox.active ? $t('close') : $t('view') }}
      </app-button>
    </slot>
    <div class="diagram-history-container" v-show="numberBox.active">
      <slot name="historyDiagram" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
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
  @Prop({ default: true }) showActionButton!: boolean;

  buttonVariant = "primary";

  @Watch('numberBox.active') async onActiveChanged() {
    this.buttonVariant = this.numberBox.active ? "secondary" : "primary";
  }

  get textVariant() {
    return this.getTextVariant(this.numberBox.diffVariant!)
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

  onActionButtonClick() {
    this.$emit("actionButtonClick", this.numberBox.id)
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
    height: 600px;

    // background-color: $blue;
    // color: $white !important;

    // .diagram-number-box-number .text-success {
    //   color: $light-green !important;
    // }

    // .grayed {
    //   color: $hover-light-blue !important
    // }

    .diagram-number-box-button {
      top: 1em;
      bottom: auto;
    }
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
  }

  &-button {
    position: absolute;
    bottom: 1em;
    right: 1em;
  }
}
</style>