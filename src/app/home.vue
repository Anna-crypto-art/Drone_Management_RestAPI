<template>
  <app-content title=""> redirecting... </app-content>
</template>

<script lang="ts">
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component } from "vue-property-decorator";
import store from "./app-state";
import { BaseAuthComponent } from "./shared/components/base-auth-component/base-auth-component";
import { ApiRoles } from "./shared/services/volateq-api/api-roles";

@Component({
  name: "app-home",
  components: {
    AppContent,
  },
})
export default class AppHome extends BaseAuthComponent {
  async created(): Promise<void> {
    try {
      if (this.isSuperAdmin) {
        this.$router.push({ name: "Plants" });
      } else {
        if (this.isPilot) {
          this.$router.push({ name: "Analyses" });
        } else {
          const plants = await volateqApi.getPlants();

          if (plants.length > 1) {
            this.$router.push({ name: "Plants" });
          } else if (plants.length === 0) {
            this.$router.push({ name: "Analyses" });
          } else {
            this.$router.push({ name: "Plant", params: { id: plants[0].id } });
          }
        }
      }
    } catch (e) {
      this.showError(e);
    }
  }
}
</script>
