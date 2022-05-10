<template>
  <div :class="'diagram-number-box' + (active ? ' active' : '')">
    <slot name="name">
      <div class="diagram-number-box-name grayed">{{ $t(name) }}</div>
    </slot>
    <slot name="number">
      <div class="diagram-number-box-number">
        <span>{{ num }}</span>
        <small v-if="diff !== null" :class="textVariant">
          {{ diff }}
        </small>
      </div>
      <div v-if="unit" class="diagram-number-box-number-label grayed">
        {{ unit }}
      </div>
    </slot>
    <slot name="action" v-if="showActionButton">
      <app-button class="diagram-number-box-button" :variant="buttonVariant" @click="onActionButtonClick">
        {{ active ? $t('close') : $t('view') }}
      </app-button>
    </slot>
    <div class="diagram-history-container" v-show="active">
      <slot name="historyDiagram" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";

@Component({
  name: "app-diagram-number-box",
  components: {
    AppButton,
  }
})
export default class AppDiagramNumberBox extends Vue {
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) num!: string;
  @Prop({ default: null }) diff!: string | null;
  @Prop({ default: null }) unit!: string | null;
  @Prop({ default: null }) variant!: 'success' | 'danger' | 'default' | null;
  @Prop({ default: true }) showActionButton!: boolean;
  @Prop({ default: false }) active!: boolean;

  buttonVariant = "primary";

  @Watch('active') async onActiveChanged() {
    this.buttonVariant = this.active ? "secondary" : "primary";
  }

  get textVariant() {
    if (this.variant === 'success') {
      return 'text-success';
    } else if (this.variant === 'danger') {
      return 'text-danger';
    } else if (this.variant === 'default') {
      return 'grayed';
    }

    return '';
  }

  onActionButtonClick() {
    this.$emit("actionButtonClick", this.name)
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

  &-button {
    position: absolute;
    bottom: 1em;
    right: 1em;
  }
}
</style>