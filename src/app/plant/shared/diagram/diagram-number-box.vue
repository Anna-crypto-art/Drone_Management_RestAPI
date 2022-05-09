<template>
  <div class="diagram-number-box">
    <slot name="name">
      <div class="diagram-number-box-name grayed">{{ name }}</div>
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
    <!-- <slot name="evolution">
      <div class="diagram-number-box-diff" v-if="diff !== null">
        <strong :class="success ? 'text-success' : 'text-danger'">{{ diff }}</strong>
        <span>{{ diffText }}</span>
        
      </div>
    </slot> -->
    <slot name="action" v-if="showActionButton">
      <app-button class="diagram-number-box-button" variant="primary" >{{ $t('view') }}</app-button>
    </slot>
    <!-- <b-collapse :id="toggleId" v-if="showActionButton">
      <slot name="diagram-view">
        blub
      </slot>
    </b-collapse> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";

@Component({
  name: "app-diagram-number-box",
  components: {
    AppButton,
  }
})
export default class AppDiagramNumberBox extends Vue{
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) num!: string;
  @Prop({ default: null }) diff!: string | null;
  @Prop({ default: null }) unit!: string | null;
  @Prop({ default: null }) variant!: 'success' | 'danger' | 'default' | null;
  @Prop({ default: false }) showActionButton!: boolean;

  toggleId!: string;

  created() {
    this.toggleId = `${this.name}_${this.num}`;
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

  &-number {
    font-weight: bold;
    font-size: 2em;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>