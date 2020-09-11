<template>
  <app-content :title="$t('create-new-analysis')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col sm="4" v-if="isSuperAdmin">
            <b-form-group label-cols="auto" :label="$t('customer')">
              <b-form-select required v-model="newAnalysis.customer_id" :options="customerOptions" @change="onCustomerSelect"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label-cols="auto" :label="$t('route')">
              <b-form-select required v-model="newAnalysis.route_id" :options="routesOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <app-file-upload ref="appFileUpload">
          <h3>{{ $t('upload-your-files') }}</h3>
        </app-file-upload>
      </b-form>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Watch, Ref } from "vue-property-decorator";
import BaseAuthComponent from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { RouteSchema } from "@/app/shared/services/volateq-api/api-schemas/route-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import { SelectOption } from "@/app/shared/types/select-option";
import AppFileUpload from "@/app/shared/components/app-file-upload/app-file-upload.vue";
import { IAppFileUpload } from "@/app/shared/components/app-file-upload/types";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppFileUpload
  }
})
export default class AppNewAnalysis extends BaseAuthComponent {
  @Ref() appFileUpload!: IAppFileUpload
  
  customers: CustomerSchema[] | undefined;
  customerOptions: SelectOption[] = [];

  routes: RouteSchema[] = [];
  routesOptions: SelectOption[] = [];

  newAnalysis: NewAnalysis = { route_id: "" };

  async created() {
    try {
      if (this.isSuperAdmin) {
        this.customers = await volateqApi.getCustomers();
        this.customerOptions = this.customers.map(customer => ({ value: customer.id, text: customer.name }));
      }
      this.routes = await volateqApi.getRoutes();
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }

  async onCustomerSelect() {
    if (this.newAnalysis.customer_id) {
      try {
        this.routes = await volateqApi.getRoutes({ customer_id: this.newAnalysis.customer_id });
      } catch (e) {
        appContentEventBus.showErrorAlert(this.$t(e.error).toString());
      }
    }
  }

  @Watch('routes')
  onRoutesChanged(routes: RouteSchema[], oldRoutes: RouteSchema[]) {
    this.routesOptions = this.routes.map(route => ({ value: route.id, text: route.abbrev }));
  }

  onSubmit() {
    // some magic
  }
}
</script>

<style lang="scss">

</style>
