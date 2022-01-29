import Vue from "vue";

export abstract class BaseAuthComponent extends Vue {
  isCreated = false;

  async created() {
    this.isCreated = true;
  }

  get isSuperAdmin(): boolean {
    return this.$store.getters["auth/isSuperAdmin"];
  }

  get isCustomerAdmin(): boolean {
    return this.$store.getters["auth/isCustomerAdmin"];
  }
}
