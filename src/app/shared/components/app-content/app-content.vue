<template>
  <div>
    <app-header v-if="showHeader"></app-header>
    <div class="app-content">
      <b-container>
        <div v-if="navback" class="app-content-navback">
          <router-link class="link" to="/analyses"> <b-icon icon="chevron-left"></b-icon> {{ $t("back-to-overview") }} </router-link>
        </div>
        <div class="app-content-title">
          <h1 v-html="title"></h1>
          <div v-if="subtitle" v-html="subtitle" class="app-content-subtitle grayed"></div>
        </div>
        <div class="app-content-content">
          <div class="app-content-content-alert">
            <b-alert v-model="showAlert" :variant="alert.variant" dismissible fade>
              <div v-html="alert.msg"></div>
            </b-alert>
          </div>
          <slot></slot>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import AppHeader from "@/app/shared/components/app-header/app-header.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AppAlert } from "@/app/shared/services/app-alert/app-alert";

@Component({
  name: "app-content",
  components: {
    AppHeader,
  },
})
export default class AppContent extends Vue {
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ default: false }) navback: boolean | undefined;
  @Prop({ default: true }) showHeader!: boolean;

  alert: AppAlert = { msg: "", variant: "info" };
  showAlert = false;

  created() {
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
