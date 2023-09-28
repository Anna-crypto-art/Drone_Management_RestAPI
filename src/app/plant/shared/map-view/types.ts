import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

export interface IAppMapView {
  plant: PlantSchema;
  setLoading(loading: boolean): Promise<void>;
}