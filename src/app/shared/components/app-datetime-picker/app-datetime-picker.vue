<template>
  <div class="app-datetime-picker">
    <b-row>
      <b-col cols="8">
        <app-datepicker v-model="dateValue" />
      </b-col>
      <b-col cols="4">
        <b-form-timepicker v-model="timeValue">
        </b-form-timepicker>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { CatchError } from "../../services/helper/catch-helper";
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";

@Component({
  name: "app-datetime-picker",
  components: {
    AppDatepicker,
  }
})
export default class AppDatetimePicker extends Vue {
  @Prop({ default: "" }) value!: string;

  dateValue = "";
  timeValue = "";

  dateTime = "";

  @CatchError()
  created() {
    this.updateModelValues();
    this.updateDateTime();
  }

  @Watch("value")
  onValueChanged() {
    this.updateModelValues();
  }

  @Watch("dateValue")
  onDateChanged() {
    this.updateDateTime();
  }

  @Watch("timeValue")
  onTimeChanged() {
    this.updateDateTime();
  }

  private updateDateTime() {
    this.dateTime = `${this.dateValue} ${this.timeValue}`;

    this.$emit("input", this.dateTime)
  }

  private updateModelValues() {
    if (!this.value) {
      this.dateValue = "";
      this.timeValue = "";
    } else {
      this.dateValue = this.value.substring(0, 10);
      if (this.value.length > 10) {
        this.timeValue = this.value.substring(11);
      }
    }
  }
}
</script>

<style lang="scss">
</style>
