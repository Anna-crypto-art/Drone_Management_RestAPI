<template>
  <div :class="'app-order-pps-view' + (lefted ? ' lefted' : '')">
    <div v-for="orderPP in innerOrderPPs" :key="orderPP.id"
    :class="'app-order-pps-view-item ' + (orderPP.quantity ? 'primary' : 'secondary')">
      <b>{{ orderPP.product_package.name }}</b>
      <i v-if="orderPP.quantity"> Yearly {{ orderPP.quantity }}</i>
      <i v-if="!orderPP.quantity"> Setup</i>
      <small class="app-order-pps-view-item-badge" v-if="orderPP.disabled_key_figures_count"> -{{ orderPP.disabled_key_figures_count }}</small>
    </div>
    <div v-if="lefted" class="clear"></div>
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
  @Prop({ default: false }) lefted!: boolean;

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
@import "@/scss/_colors.scss";

.app-order-pps-view {
  &.lefted {
    .app-order-pps-view-item {
      float: left;
      margin-right: 0.5em;
    }
  }

  &-item {
    position: relative;
    font-size: 12px;
    padding: 0.1em 0.75em;
    border-radius: 10em;
    border: 1px solid $hover-blue;
    margin-bottom: 0.5em;
    width: 165px;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }

    &.primary {
      color: $white;
      background: $hover-blue;
      width: 165px;
    }
    &.secondary {
      background: $white;
    }

    &-badge {
      position: absolute;
      border-radius: 10px;
      padding: 3px;
      right: -5px;
      top: -5px;
      color: $white;
      background-color: $orange;
      height: 15px;
      font-size: 10px;
      line-height: 10px;
    }
  }
}
</style>
