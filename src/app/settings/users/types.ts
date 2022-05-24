import { SimplePlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

export interface UserItem {
  id: string,
  name: {
    userName: string,
    email: string,
  },
  state: {
    date: string,
    userState: "locked" | "registered" | "pending",
  },
  customer: {
    name: string | null,
    id: string | null,
  },
  role: string
  plants: SimplePlantSchema[],
}

export interface UserPlant {
  plant: SimplePlantSchema;
  selected: boolean;
  otherCustomers?: string;
}