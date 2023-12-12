import store from "@/app/app-state";
import { CustomerNameSchema } from "../../services/volateq-api/api-schemas/customer-schemas";
import { BaseComponent } from "../base-component/base-component";

export abstract class BaseAuthComponent extends BaseComponent {
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

  get isHiddenSuperAdmin(): boolean {
    return this.$store.getters["auth/isHiddenSuperAdmin"];
  }

  get selectedCustomer(): CustomerNameSchema | undefined {
    if (this.isSuperAdmin || this.isHiddenSuperAdmin) {
      return store.state.auth.customer;
    }
    
    return undefined;
  }
}
