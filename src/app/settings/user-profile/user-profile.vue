<template>
  <div class="app-user-profile">
    <app-box :title="$t('change-authentication-method')">
      
    </app-box>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppBox from "@/app/shared/components/app-box/app-box.vue"
import AppButton from "@/app/shared/components/app-button/app-button.vue";

@Component({
  name: "app-user-profile",
  components: {
    AppBox,
    AppButton,
  },
})
export default class AppUserProfile extends BaseAuthComponent {

}
</script>

<style></style>
