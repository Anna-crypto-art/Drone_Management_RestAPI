import { CustomerRole } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { SimplePlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

export interface CustomerItem {
  id: string | null;
  name: string;
  role: string | null;
  plants: SimplePlantSchema[];
}