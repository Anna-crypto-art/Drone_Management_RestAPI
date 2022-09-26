<template>
  <div>
    <div v-for="orderPP in innerOrderPPs" :key="orderPP.id">
      {{ orderPP.product_package.name }} 
      <b-badge v-if="orderPP.quantity">Yearly {{ orderPP.quantity }}</b-badge>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import { OrderProductPackageSchema } from "../../services/volateq-api/api-schemas/order-schema";

@Component({
  name: "app-order-pps-view",
})
export default class AppOrderPpsView extends Vue {
  @Prop({ default: [] }) orderProductPackages!: OrderProductPackageSchema[];

  innerOrderPPs: OrderProductPackageSchema[] = [];

  created() {
    this.onOrderPPsChanged();
  }

  @Watch('orderProductPackages') onOrderPPsChanged() {
    this.innerOrderPPs = this.orderProductPackages.filter(orderPP => orderPP.product_package.id !== 1) // Filter CSP_PTC Basic
  }
}
</script>

<style lang="scss">
</style>
