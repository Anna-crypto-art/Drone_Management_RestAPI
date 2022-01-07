<template>
  <app-content title=""> redirecting... </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BaseAuthComponent } from "./shared/components/base-auth-component/base-auth-component";
import appContentEventBus from "./shared/components/app-content/app-content-event-bus";

@Component({
  name: "app-home",
  components: {
    AppContent,
  },
})
export default class AppHome extends BaseAuthComponent {
  async created() {
    try {
      if (this.isSuperAdmin) {
        this.$router.push({ name: "Plants" });
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
    } catch (e) {
      appContentEventBus.showError(e);
    }
  }
}
</script>
