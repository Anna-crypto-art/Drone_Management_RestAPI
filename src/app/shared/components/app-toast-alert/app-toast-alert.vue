<template>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import AppHeader from "@/app/shared/components/app-header/app-header.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AppAlert, AppAlertEvents } from "@/app/shared/services/app-alert/app-alert";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";

@Component({
  name: "app-toast-alert",
  components: {
    AppHeader,
  },
})
export default class AppToastAlert extends Vue {
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ default: false }) navback: boolean | undefined;
  @Prop({ default: true }) showHeader!: boolean;
  @Prop({ default: null }) eventId!: string | null;

  alert: AppAlert = { msg: "", variant: "info" };
  alertId: AppAlert = { msg: "", variant: "info" };
  showAlert = false;
  showAlertId = false;

  created() {
    if (this.eventId) {
      AppContentEventService.on(this.eventId, AppAlertEvents.showAlert, (alert: AppAlert) => {
        this.alertId = alert;
        this.showAlertId = true;
      });
      AppContentEventService.on(this.eventId, AppAlertEvents.clearAlert, () => {
        this.showAlertId = false;
      });
    }

    appContentEventBus.onShowAlert((newAlert: AppAlert) => {
      this.alert = newAlert;
      this.showAlert = true;
    });
    appContentEventBus.onClearAlert(() => {
      this.showAlert = false;
    });
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-content {
  &-navback {
    margin-top: 50px;
  }
  &-title {
    margin: 50px 0;

    h1 {
      font-size: 4rem;
      margin-bottom: 10px;
    }
  }
  &-subtitle {
    font-size: 1.5rem;
  }
  &-content-alert {
    .alert {
      margin-bottom: 50px;
    }
  }
}
</style>
