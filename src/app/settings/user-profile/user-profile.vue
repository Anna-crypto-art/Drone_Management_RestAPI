<template>
  <div class="app-user-profile" v-if="user">
    <app-change-auth-method :user="user" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppChangeAuthMethod from "./change-auth-method.vue";
import { UserEvent, UserEventService } from "./user-event-service";
import { userService } from "@/app/shared/services/user-service/user-service";

@Component({
  name: "app-user-profile",
  components: {
    AppChangeAuthMethod
  },
})
export default class AppUserProfile extends BaseAuthComponent {
  user: UserSchema | null = null;

  @CatchError()
  async created() {
    this.user = await userService.me();

    UserEventService.on(this.user!.id, UserEvent.CHANGED, async () => {
      await userService.refreshMe();

      this.user = await userService.me();
    })
  }
}
</script>

<style></style>
