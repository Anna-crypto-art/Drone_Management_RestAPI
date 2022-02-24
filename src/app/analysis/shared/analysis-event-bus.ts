import Vue from "vue";
import { AnalysisEvent } from "./types";

export class AnalysisEventBus extends Vue {
    emit(event: AnalysisEvent, args: any) {
      this.$emit(event, ...args);
    }
    on(event: AnalysisEvent, callbackFn: any) {
      this.$on(event, callbackFn);
    }
  }
  