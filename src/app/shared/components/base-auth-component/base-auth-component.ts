import store from "@/app/app-state";
import { ApiRoles } from "../../services/volateq-api/api-roles";
import { BaseComponent } from "../base-component/base-component";

export abstract class BaseAuthComponent extends BaseComponent {
  isCreated = false;

  async created(): Promise<void> {
    this.isCreated = true;
  }

  get isSuperAdmin(): boolean {
    return this.$store.getters["auth/isSuperAdmin"];
  }

  get isPilot(): boolean {
    return store.state.auth.role === ApiRoles.PILOT;
  }
}
