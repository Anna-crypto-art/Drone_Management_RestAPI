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

  /**
   * Emits and waits for the response
   * @param eventName 
   * @param value 
   */
  protected async emit(eventName: string, ...args: any[]) {
    return new Promise<void>(resolve => {
      this.$emit(eventName, ...args);
      this.$nextTick(resolve);
    })
  }
}
