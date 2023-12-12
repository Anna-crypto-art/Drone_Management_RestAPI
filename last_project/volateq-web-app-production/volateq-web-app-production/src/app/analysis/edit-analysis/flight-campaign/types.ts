import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import { PlantStatusSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-status-schema";


export interface FlightRoutesActionDay {
  date: string;
  flightRoutesActions: PlantAction[];
}

export interface PlantAction {
  id: string;
  startTime: string;
  action: string;
}

export interface FlightRoute extends PlantAction {
  id: string;
  drone: DroneSchema;
  plantArea: string;
  plantStatus: PlantStatusSchema;
  duration: number;
}

export interface NewFlightCampaign {
  name: string;
  analysisId: string;
  startDate: string;
  batteryHotswapping: boolean;
  orderProductPackageIds: string[];
  forceAddFlightTypeIds: string[];
  autoExportLitchi: boolean;
  optimizeTorsionFlights: boolean;
}