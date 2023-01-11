import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { RoleSchema } from "@/app/shared/services/volateq-api/api-schemas/role-schema";
import { SelectPlant } from "../types";

export interface UserItem {
  id: string;
  name: {
    userName: string,
    email: string,
  };
  state: {
    date: string,
    userState: "locked" | "registered" | "pending",
  };
  customer: {
    name: string | null,
    id: string | null,
  };
  role: RoleSchema;
  plants: PlantSchema[];
  authMethod: number;
}

export interface EditUser {
  id: string;
  email: string;
  roleId: number;
  customerPlants: SelectPlant[];
}