<template>
  <app-content :title="$t('create-new-analysis')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <!-- <b-form @submit="onSubmit">

      </b-form> -->
    </div>
  </app-content>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseAuthComponent from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent
  }
})
export default class AppNewAnalysis extends BaseAuthComponent {
  customers: CustomerSchema[] | undefined;
  // routes


  // onSubmit() {
    
  // }
}
</script>

<style>

</style>
