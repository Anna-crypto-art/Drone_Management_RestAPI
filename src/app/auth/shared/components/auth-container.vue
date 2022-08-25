<template>
  <div class="app-auth-container">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <img
            src="/images/logos/logo_default.png"
            srcset="/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png"
            alt="Volateq"
            class="logo-img"
          />
          <div class="app-auth-box">
            <div v-if="title" class="app-auth-box-title">
              <h1>{{ title }}</h1>
              <div v-if="subtitle" v-html="subtitle" class="app-auth-box-subtitle grayed"></div>
            </div>
            <b-alert v-if="infoAlert" 
              class="mar-bottom"
              v-model="showInfoAlert"
              variant="info"
              v-html="infoAlert"
              dismissible
            />
            <slot></slot>
            <b-alert
              class="app-auth-container-alert"
              v-model="showAlert"
              :variant="alert.variant"
              v-html="alert.msg"
              dismissible
            ></b-alert>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { AppAlert } from "@/app/shared/services/app-alert/app-alert";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";

@Component({
  name: "app-auth-container",
})
export default class AppAuthContainer extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) subtitle!: string;
  @Prop({ default: "" }) infoAlert!: string;

  alert: AppAlert = { msg: "", variant: "success" };
  showAlert = false;

  created() {
    authContainerEventBus.onShowAlert((newAlert: AppAlert) => {
      this.alert = newAlert;
      this.showAlert = true;
    });
    authContainerEventBus.onClearAlert(() => {
      this.showAlert = false;
    });
  }

  get showInfoAlert(): boolean {
    return !!this.infoAlert;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "~bootstrap/scss/_functions";
@import "~bootstrap/scss/_variables";
@import "~bootstrap/scss/mixins/_breakpoints";

.app-auth-container {
  .app-auth-box {
    padding: 20px;
    box-shadow: 0px 0px 30px $grey;
    position: relative;
    z-index: 1;
    width: 400px;

    &-title {
      margin-bottom: 2em;

      h1 {
        font-size: 2rem;
      }
    }
    &-subtitle {
      font-size: 1rem;
    }
  }
  &-alert {
    margin: 1rem 0 0;
  }
  .logo-img {
    max-width: 100%;
    position: relative;
    z-index: 0;
    width: 234px;
    display: block;
    margin: 40px auto;
  }
}

@include media-breakpoint-down(sm) {
  .app-auth-container {
    .app-auth-box {
      width: 100%;
    }
  }
}
</style>
