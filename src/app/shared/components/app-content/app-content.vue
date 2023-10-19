<template>
  <div>
    <app-header v-if="showHeader"></app-header>
    <div class="app-content">
      <b-container>
        <div v-if="navback" class="app-content-navback">
          <router-link class="link" :to="navbackPath">
            <b-icon icon="chevron-left"></b-icon> {{ $t("back-to-overview") }}
          </router-link>
        </div>
        <div class="app-content-title">
          <h1><span v-html="title"></span> <app-super-admin-marker v-if="superAdminProtected" /></h1>
          <div v-if="subtitle" v-html="subtitle" class="app-content-subtitle grayed"></div>
          <div v-if="!subtitle" class="app-content-subtitle grayed">
            <slot name="subtitle"></slot>
          </div>
        </div>
        <div class="app-content-content">
          <div class="app-content-content-alert">
            <b-alert v-model="showAlert" :variant="alert.variant" dismissible fade>
              <div v-html="alert.msg"></div>
            </b-alert>
          </div>
          <div class="app-content-content-alert">
            <b-alert v-model="showAlertId" :variant="alertId.variant" dismissible fade>
              <div v-html="alertId.msg"></div>
            </b-alert>
          </div>
          <slot></slot>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator";
import AppHeader from "@/app/shared/components/app-header/app-header.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AppAlert, AppAlertEvents } from "@/app/shared/services/app-alert/app-alert";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";

@Component({
  name: "app-content",
  components: {
    AppHeader,
    AppSuperAdminMarker,
  },
})
export default class AppContent extends BaseAuthComponent {
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ default: false }) navback: boolean | undefined;
  @Prop({ default: true }) showHeader!: boolean;
  @Prop({ default: null }) eventId!: string | null;
  @Prop({ default: false }) superAdminProtected!: boolean;
  @Prop() navbackPath: string | undefined;

  alert: AppAlert = { msg: "", variant: "info" };
  alertId: AppAlert = { msg: "", variant: "info" };
  showAlert = false;
  showAlertId = false;

  async created() {
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

    this.setBrowserTitle(this.title);
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
