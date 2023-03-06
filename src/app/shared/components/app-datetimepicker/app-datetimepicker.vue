<template>
  <div class="app-datetimepicker">
    <b-row no-gutters>
      <b-col cols="7">
        <app-datepicker v-model="dateValue" />
      </b-col>
      <b-col cols="5">
        <b-form-timepicker v-model="timeValue"
          class="app-datetimepicker-time"
          :locale="timeLocale"
          placeholder="HH:mm"
        />
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
export default class AppDatetimepicker extends Vue {
  @Prop({ default: "" }) value!: string;

  dateValue = "";
  timeValue = "";

  dateTime = "";

  timeLocale = navigator.language

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
        this.timeValue = this.value.substring(11, 16) + ":00";
      }
    }
  }
}
</script>

<style lang="scss">
.app-datetimepicker {
  &-time {
    margin-left: -1px;
  }
}
</style>