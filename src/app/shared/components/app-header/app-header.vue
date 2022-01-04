<template>
  <div class="app-header">
    <b-container :fluid="fluid">
      <router-link :to="{ name: 'Home' }">
        <img
          class="app-header-logo float-left"
          src="/images/logos/logo_white.webp"
          srcset="/images/logos/logo_white.webp, /images/logos/logo_white.png"
          alt="volateq"
        />
      </router-link>
      <div class="app-header-menu float-left">
        <b-nav pills>
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
        </b-nav>
      </div>
      <div class="app-header-settings-menu float-right">
        <b-nav pills>
          <b-nav-item-dropdown toggle-class="app-header-nav-dropdown" right>
            <template slot="button-content"
              ><b-icon icon="gear-fill" font-scale="1.5"></b-icon
            ></template>
            <b-dropdown-item href="/" class="link">{{
              $t("profile")
            }}</b-dropdown-item>
            <b-dropdown-item
              href="/settings/users"
              v-if="isSuperAdmin"
              class="link"
              >{{ $t("users") }}</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-form>
              <b-button @click="logout" class="width-100pc">{{
                $t("logout")
              }}</b-button>
            </b-dropdown-form>
          </b-nav-item-dropdown>
        </b-nav>
      </div>
    </b-container>
  </div>
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

  async logout() {
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
  align-items: center;
  background-color: $blue;
  color: $white;

  &-menu {
    margin-left: 15px;
    .nav-link {
      padding: 0 30px;
      color: $white;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: $hover-light-blue !important;
        color: $blue;
      }
      &.active {
        background-color: $hover-blue;
      }

      span {
        position: relative;
        top: 4px;
      }
    }
  }

  &-settings-menu {
    .nav-pills {
      height: $header-height;
    }
    .dropdown-item {
      color: $blue;
    }
  }

  &-logo {
    max-height: $header-height;
    margin-left: -15px;
  }

  &-nav-dropdown {
    &::after {
      content: none;
    }
    height: calc(100% - 1rem);
  }

  .dropdown.show > .app-header-nav-dropdown {
    background-color: $white;
    .bi-gear-fill {
      color: $blue;
      transform: rotate(225deg);
    }
  }
  .bi-gear-fill {
    color: $white;
    transform-origin: center;
    transition: 300ms linear all;
  }

  .dropdown-menu {
    line-height: 20px;
    width: 200px;

    .dropdown-item {
      text-align: right;
      padding: 0.75rem 1.5rem;
    }
    .b-dropdown-form {
      padding: 0.75rem 1.5rem;
    }
  }
}
</style>
