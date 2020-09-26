import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component
export default class BaseAuthComponent extends Vue {
  get isSuperAdmin(): boolean {
    return this.$store.getters["auth/isSuperAdmin"];
  }

  get isCustomerAdmin(): boolean {
    return this.$store.getters["auth/isCustomerAdmin"];
  }
}
