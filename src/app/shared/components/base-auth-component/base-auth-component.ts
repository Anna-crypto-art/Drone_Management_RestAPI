import { BaseComponent } from "../base-component/base-component";

export abstract class BaseAuthComponent extends BaseComponent {
  isCreated = false;

  async created(): Promise<void> {
    this.isCreated = true;
  }

  get isSuperAdmin(): boolean {
    return this.$store.getters["auth/isSuperAdmin"];
  }

  get isCustomerAdmin(): boolean {
    return this.$store.getters["auth/isCustomerAdmin"];
  }

  get isPilot(): boolean {
    return this.$store.getters["auth/isPilot"];
  }
}
