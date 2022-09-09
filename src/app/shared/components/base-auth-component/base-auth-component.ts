import store from "@/app/app-state";
import { CustomerNameSchema } from "../../services/volateq-api/api-schemas/customer-schemas";
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

  get isAssistant(): boolean {
    return this.$store.getters["auth/isAssistant"];
  }

  get selectedCustomer(): CustomerNameSchema | undefined {
    if (this.isSuperAdmin) {
      return store.state.auth.customer;
    }
    
    return undefined;
  }
}
