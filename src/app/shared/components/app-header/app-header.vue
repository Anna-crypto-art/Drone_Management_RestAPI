<template>
  <div class="app-header">
    <b-container>
      <img class="app-header-logo" src="@/assets/logos/logo_white.png" alt="volateq">
      <div class="app-header-menu float-right">
        <b-nav pills>
          <b-nav-item-dropdown toggle-class="app-header-nav-dropdown" right>
            <template slot="button-content"><b-icon icon="gear-fill" font-scale="1.5"></b-icon></template>
            <b-dropdown-item><router-link class="link" :to="{ name: 'Home' }">{{ $t("profile") }}</router-link></b-dropdown-item>
            <b-dropdown-item v-if="isSuperAdmin" ><router-link class="link" :to="{ name: 'Users' }"> {{ $t("users") }}</router-link></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-form>
              <b-button @click="logout" class="width-100pc">{{ $t("logout") }}</b-button>
            </b-dropdown-form>
          </b-nav-item-dropdown>
        </b-nav>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";

import BaseAuthComponent from "@/app/shared/components/base-auth-component/base-auth-component";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-header",
})
export default class AppHeader extends BaseAuthComponent {
  async logout() {
    try {
      await volateqApi.logout();
      
      this.$router.push({ name: "Login" })
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$header-height: 80px;

.app-header {
  height: $header-height;
  line-height: $header-height;
  align-items: center;
  background-color: $blue;
  color: $white;

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


