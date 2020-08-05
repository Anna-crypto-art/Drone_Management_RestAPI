<template>
  <div class="app-header">
    <b-container>
      <img class="app-header-logo" src="@/assets/logos/logo_white.png" alt="volateq">
      <div class="app-header-menu float-right">
        <b-nav pills>
          <b-nav-item-dropdown toggle-class="app-header-nav-dropdown" right>
            <template slot="button-content"><b-icon icon="gear-fill" font-scale="1.5"></b-icon></template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-form>
              <b-button @click="logout" class="width-100pc">Logout</b-button>
            </b-dropdown-form>
          </b-nav-item-dropdown>
        </b-nav>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import router from '../../../app-routes';
import volateqApi from '../../../shared/services/volateq-api/volateq-api';

@Component({
  name: 'app-header',
})
export default class AppHeader extends Vue {
  async logout() {
    try {
      await volateqApi.logout();
      
      router.push({ name: 'Login' })
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/_colors.scss';

$header-height: 80px;

.app-header {
  height: $header-height;
  line-height: $header-height;
  align-items: center;
  background-color: $blue;
  color: #ffffff;

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
    background-color: #fff;
    .bi-gear-fill {
      color: $blue;
      transform: rotate(225deg);
    }
  }
  .bi-gear-fill {
    color: #fff;
    transform-origin: center;
    transition: 300ms linear all;
  }

  .dropdown-menu {
    line-height: 20px;
    .dropdown-item {
      color: $blue;
      font-weight: bold;
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

.header-title {
  margin: 0 16px;
  font-weight: 500;
}
</style>


