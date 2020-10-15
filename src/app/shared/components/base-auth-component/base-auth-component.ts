import Vue from "vue"


export abstract class BaseAuthComponent extends Vue {
  get isSuperAdmin(): boolean {
    return this.$store.getters["auth/isSuperAdmin"];
  }

  get isCustomerAdmin(): boolean {
    return this.$store.getters["auth/isCustomerAdmin"];
  }
}
