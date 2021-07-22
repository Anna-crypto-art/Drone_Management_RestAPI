<template>
  <b-navbar class="app-header" toggleable="lg" sticky>
    <b-navbar-brand href="#">
      <img
        class="app-header-logo"
        src="@/assets/logos/logo_white.png"
        alt="volateq"
      />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="app-header-menu" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          class="link"
          href="/plants"
          :active="isActiveRoute(['/plants', '/plant/*'])"
        >
          <span class="nav-item-text">{{ $t("plants") }}</span>
        </b-nav-item>

        <b-nav-item
          class="link"
          href="/analyses"
          :active="isActiveRoute(['/analyses', '/analysis/new'])"
        >
          <span class="nav-item-text">{{ $t("analysis") }}</span>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown toggle-class="app-header-nav-dropdown" right>
          <template #button-content>
            <b-icon icon="gear-fill" font-scale="1.5" />
          </template>

          <b-dropdown-item href="/" class="link">{{
            $t("profile")
          }}</b-dropdown-item>
          <b-dropdown-item
            href="/settings/users"
            v-if="isSuperAdmin"
            class="link"
            >{{ $t("users") }}</b-dropdown-item
          >
          <b-dropdown-divider />
          <b-dropdown-form>
            <b-button @click="logout" class="width-100pc">{{
              $t("logout")
            }}</b-button>
          </b-dropdown-form>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-header",
})
export default class AppHeader extends BaseAuthComponent {
  @Prop({ default: true }) fluid!: boolean;

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
    return !!routes.find((route) =>
      route.indexOf("*") != -1
        ? this.$router.currentRoute.path
            .replace(route.replace("*", ""), "")
            .indexOf("/") == -1
        : this.$router.currentRoute.path === route
    );
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-header {
  height: $header-height;
  line-height: $header-height;
  background-color: $blue;
  color: $white;

  .navbar-nav {
    height: 100%;

    &.ml-auto {
      height: $header-height;
    }
  }

  .navbar-toggler {
    border-radius: 0;
  }

  &-menu {
    .nav-link {
      background: $blue;
      height: $header-height;

      &:not(.dropdown .nav-link) {
        padding: 0 30px !important;
        color: $white !important;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: $hover-light-blue !important;
          color: $blue !important;
        }
        &.active {
          background-color: $hover-blue;
        }

        span {
          position: relative;
        }
      }
    }
  }

  &-settings-menu {
    .dropdown-item {
      color: $blue;
    }
  }

  &-logo {
    max-height: $header-height;
    margin-left: -15px;
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

      &::after {
        content: none;
      }
    }
  }

  .bi-gear-fill {
    color: $white;
    transform-origin: center;
    transition: 300ms linear all;
  }
}
</style>
