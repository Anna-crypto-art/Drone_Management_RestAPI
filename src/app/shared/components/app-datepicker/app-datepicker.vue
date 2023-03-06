<template>
  <div class="app-datepicker">
    <b-datepicker class="app-datepicker-date"
      v-model="innerValue"
      :required="required"
    />
    <b-form-input v-model="innerValue" class="app-datepicker-text" placeholder="YYYY-MM-DD" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { CatchError } from "../../services/helper/catch-helper";

@Component({
  name: "app-datepicker",
})
export default class AppDatetimePicker extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) required!: boolean;

  innerValue = "";

  @CatchError()
  created() {
    this.updateInnerDate();
  }

  @Watch("value")
  onValueChanged() {
    this.updateInnerDate();
  }

  @Watch("innerValue")
  onInnerValueChanged() {
    this.updateDate();
  }


  private isValidDate(d: string): boolean {
    return !!d.match(/^[0-4]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);
  }

  private updateInnerDate() {
    if (this.isValidDate(this.value)) {
      this.innerValue = this.value;
    }
  }
  
  private updateDate() {
    if (this.isValidDate(this.innerValue)) {
      this.$emit("input", this.innerValue);
    }
  }
}
</script>

<style lang="scss">
.app-datepicker {
  position: relative;

  &-date {
    label.form-control {
      opacity: 0;
    }

    background: transparent;
    z-index: 1;

    &:focus, &.focus {
      background: transparent;
    }
  }
  &-text {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-indent: 40px;
  }
}
</style>
