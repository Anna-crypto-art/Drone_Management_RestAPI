<template>
  <b-navbar class="app-header" toggleable="lg" type="dark" sticky>
    
    <!-- Only for christmas time -->
    <!-- <div class="snow"><div class="snow-more"></div></div> -->
    
    <b-badge class="app-header-dev-badge" v-if="isEnvDevelopment" variant="danger">
      DEV
    </b-badge>

    <b-navbar-brand href="#">
      <b-link to="/">
        <img
          class="app-header-logo float-left"
          src="/images/logos/logo_white.png"
          srcset="/images/logos/logo_white.webp, /images/logos/logo_white.png"
          alt="volateq"
        />
      </b-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="app-header-menu" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="link" href="/plants" :active="isActiveRoute(['/plants', '/plant/*'])">
          <span class="nav-item-text">{{ $t("plants") }}</span>
        </b-nav-item>

        <b-nav-item v-if="!isAssistant" class="link" href="/analyses" :active="isActiveRoute(['/analyses', '/analysis/new'])">
          <span class="nav-item-text">{{ $t("analysis") }}</span>
        </b-nav-item>

        <b-nav-item class="link" href="/doc/files" :active="isActiveRoute(['/doc/files'])">
          <span class="nav-item-text">{{ $t("documentation") }}</span>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown toggle-class="app-header-nav-dropdown" right>
          <template #button-content>
            <b-icon icon="gear-fill" font-scale="1.5" />
          </template>

          <b-dropdown-item href="/settings/users" v-if="isSuperAdmin" class="link">{{ $t("users") }} <app-super-admin-marker /></b-dropdown-item>
          <b-dropdown-item href="/settings/customers" v-if="isSuperAdmin" class="link">{{ $t("customers") }} <app-super-admin-marker /></b-dropdown-item>
          <b-dropdown-item href="/settings/product-packages" v-if="isSuperAdmin" class="link">{{ $t("product-packages") }} <app-super-admin-marker /></b-dropdown-item>
          <b-dropdown-item href="/settings/orders" v-if="isSuperAdmin" class="link">{{ $t("orders") }} <app-super-admin-marker /></b-dropdown-item>
          <b-dropdown-item href="/settings/drones" v-if="isSuperAdmin" class="link">{{ $t("drones") }} <app-super-admin-marker /></b-dropdown-item>
          <b-dropdown-item href="/settings/monitoring" v-if="isSuperAdmin" class="link">{{ $t("monitoring") }} <app-super-admin-marker /></b-dropdown-item>

          <b-dropdown-divider v-if="isSuperAdmin" />

          <b-dropdown-form v-if="isSuperAdmin">
            <div class=""><small class="text-grey" v-if="!!selectedCustomer">{{ selectedCustomer.name }}</small></div>
            <app-button variant="secondary" cls="width-100pc" @click="onShowSwitchCustomerModal" :title="$t('switch-customer')"> {{ $t("switch") }}<app-super-admin-marker /></app-button>
          </b-dropdown-form>

          <b-dropdown-divider v-if="isSuperAdmin" />

          <b-dropdown-item href="/settings/user-profile" class="link">
            {{ $t("user-profile") }} <span clas="pad-left-half"><app-icon icon="person-fill" /></span>
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-form>
            <b-button @click="logout" class="width-100pc">{{ $t("logout") }}</b-button>
          </b-dropdown-form>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

    <app-modal-form v-if="isSuperAdmin"
      id="switch-customer-modal"
      ref="switchCustomerModal"
      :title="$t('switch')"
      :subtitle="$t('switch-customer-and-change-PIs-view')"
      :superAdminProtected="true"
      :modalLoading="switchCustomerLoading"
      :okTitle="$t('apply')"
      @submit="onCustomerSwitchSubmit"
    >
      <b-alert variant="info" :show="!selectedCustomerId"><span v-html="$t('info-no-customer-selected')"></span></b-alert>
      <b-form-group :label="$t('select-target-customer')">
        <b-form-select v-model="selectedCustomerId" :options="customerSelection" />
      </b-form-group>
      <b-form-group :label="$t('change-pi-view-availability')">
        <b-form-checkbox v-model="showAllKeyFigures">
          {{ $t('show-all-pis') }}
        </b-form-checkbox>
      </b-form-group>
    </app-modal-form>

  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";

import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import { IAppModalForm } from "../app-modal/types";
import { environment } from "@/environment/environment";

@Component({
  name: "app-header",
  components: {
    AppSuperAdminMarker,
    AppButton,
    AppModalForm,
    AppIcon,
  }
})
export default class AppHeader extends BaseAuthComponent {
  @Prop({ default: true }) fluid!: boolean;

  @Ref() switchCustomerModal!: IAppModalForm;

  switchCustomerLoading = false;
  customerSelection: { text: string; value: string | null }[] = [];
  selectedCustomerId: string | null = null;

  showAllKeyFigures = false;

  async logout(): Promise<void> {
    try {
      await volateqApi.logout();

      this.$router.push({ name: "Login" });
      this.$router.go(0); // Reload the page to refresh the js cache
    } catch (e) {
      console.error(e);
    }
  }

  isActiveRoute(routes: string[]): boolean {
    return !!routes.find(route =>
      route.indexOf("*") != -1
        ? this.$router.currentRoute.path.replace(route.replace("*", ""), "").indexOf("/") == -1
        : this.$router.currentRoute.path === route
    );
  }

  get isEnvDevelopment(): boolean {
    return environment === "development";
  }

  async onShowSwitchCustomerModal() {
    this.customerSelection = [
      { value: null, text: "" },
      ...(await volateqApi.getCustomers()).map(customer => ({
        value: customer.id,
        text: customer.name,
      })),
    ];

    this.selectedCustomerId = this.selectedCustomer?.id || null;

    const user = await volateqApi.getMe();
    this.showAllKeyFigures = user.profile?.show_all_key_figures || false;

    this.switchCustomerModal.show();
  }

  async onCustomerSwitchSubmit() {
    this.switchCustomerLoading = true;

    try {
      await volateqApi.switchCustomer(this.selectedCustomerId || undefined, this.showAllKeyFigures);

      let selectedCustomer: any  = this.customerSelection.find(customer => customer.value === this.selectedCustomerId);
      if (selectedCustomer) {
        selectedCustomer = { id: this.selectedCustomerId, name: selectedCustomer.text };
      }

      this.$store.direct.commit.auth.updateCustomer(selectedCustomer);

      this.$router.go(0);
    } catch (e) {
      this.showError(e);
    } finally {
      this.switchCustomerLoading = false;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";
@import "~bootstrap/scss/_functions";
@import "~bootstrap/scss/_variables";
@import "~bootstrap/scss/mixins/_breakpoints";

%padtopbot-0 {
  padding-top: 0;
  padding-bottom: 0;
}

@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0px $header-height;
  }
}


.app-header {
  position: relative;
  height: $header-height;
  line-height: $header-height;
  background-color: $blue;
  color: $white;

  @extend %padtopbot-0;

  &-dev-badge {
    position: absolute;
    top: 10px;
    left: 142px;
  }

  .snow {
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50%3B' xml:space='preserve'%3E%3Cstyle type='text/css'%3E.st1%7Bopacity:0.3%3Bfill:%23FFFFFF%3B%7D.st3%7Bopacity:0.1%3Bfill:%23FFFFFF%3B%7D%3C/style%3E%3Ccircle class='st1' cx='5' cy='8' r='1'/%3E%3Ccircle class='st1' cx='38' cy='3' r='1'/%3E%3Ccircle class='st1' cx='12' cy='4' r='1'/%3E%3Ccircle class='st1' cx='16' cy='16' r='1'/%3E%3Ccircle class='st1' cx='47' cy='46' r='1'/%3E%3Ccircle class='st1' cx='32' cy='10' r='1'/%3E%3Ccircle class='st1' cx='3' cy='46' r='1'/%3E%3Ccircle class='st1' cx='45' cy='13' r='1'/%3E%3Ccircle class='st1' cx='10' cy='28' r='1'/%3E%3Ccircle class='st1' cx='22' cy='35' r='1'/%3E%3Ccircle class='st1' cx='3' cy='21' r='1'/%3E%3Ccircle class='st1' cx='26' cy='20' r='1'/%3E%3Ccircle class='st1' cx='30' cy='45' r='1'/%3E%3Ccircle class='st1' cx='15' cy='45' r='1'/%3E%3Ccircle class='st1' cx='34' cy='36' r='1'/%3E%3Ccircle class='st1' cx='41' cy='32' r='1'/%3E%3C/svg%3E");
    background-position: 0px 0px;
    animation: animatedBackground 10s linear infinite;
    z-index: -1;
    left: 0;
    top: 0;

    &-more {
      height: 100%;
      width: 100%;
      background-image: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50%3B' xml:space='preserve'%3E%3Cstyle type='text/css'%3E.st1%7Bopacity:0.7%3Bfill:%23FFFFFF%3B%7D.st3%7Bopacity:0.1%3Bfill:%23FFFFFF%3B%7D%3C/style%3E%3Ccircle class='st3' cx='4' cy='14' r='1'/%3E%3Ccircle class='st3' cx='43' cy='3' r='1'/%3E%3Ccircle class='st3' cx='31' cy='30' r='2'/%3E%3Ccircle class='st3' cx='19' cy='23' r='1'/%3E%3Ccircle class='st3' cx='37' cy='22' r='1'/%3E%3Ccircle class='st3' cx='43' cy='16' r='1'/%3E%3Ccircle class='st3' cx='8' cy='45' r='1'/%3E%3Ccircle class='st3' cx='29' cy='39' r='1'/%3E%3Ccircle class='st3' cx='13' cy='37' r='1'/%3E%3Ccircle class='st3' cx='47' cy='32' r='1'/%3E%3Ccircle class='st3' cx='15' cy='4' r='2'/%3E%3Ccircle class='st3' cx='9' cy='27' r='1'/%3E%3Ccircle class='st3' cx='30' cy='9' r='1'/%3E%3Ccircle class='st3' cx='25' cy='15' r='1'/%3E%3Ccircle class='st3' cx='21' cy='45' r='2'/%3E%3Ccircle class='st3' cx='42' cy='45' r='1'/%3E%3C/svg%3E");
      background-position: 0px 0px;
      animation: animatedBackground 15s linear infinite;
    }
  }

  .navbar-toggler {
    border-radius: 0;
  }

  @include media-breakpoint-down(sm) {
    .navbar-collapse {
      margin-right: -1rem;
      margin-left: -1rem;
    }
  }

  &-menu {
    .dropdown-item {
      color: $blue;
    }

    .nav-link {
      @media (max-width: 991px) {
        background: $blue;
      }

      &:not(.dropdown .nav-link) {
        $transition: 0.2s ease-in-out;
        padding: 0 30px !important;
        color: $white !important;
        transition: background $transition, color $transition;

        &:hover {
          background-color: $hover-light-blue !important;
          color: $blue !important;
        }

        &.active {
          background-color: $hover-blue;
        }
      }
    }
  }

  .navbar-brand {
    height: $header-height;
    @extend %padtopbot-0;
  }

  &-logo {
    height: $header-height;
    margin-left: -15px;
    @extend %padtopbot-0;
  }

  .dropdown {
    &.show > .app-header-nav-dropdown {
      background-color: $white;

      .bi-gear-fill {
        color: $blue;
        transform: rotate(225deg);
      }
    }

    &-menu {
      line-height: 20px;
      margin-top: -1px;

      .dropdown-item {
        text-align: right;
        padding: 0.75rem 1.5rem;
      }

      .b-dropdown-form {
        padding: 0.75rem 1.5rem;
      }
    }

    &-toggle {
      height: $header-height;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.15s linear;

      &::after {
        content: none;
      }
    }
  }

  .bi-gear-fill {
    color: $white;
    transform-origin: center;
    transition: all 0.3s linear;
  }
}
</style>
