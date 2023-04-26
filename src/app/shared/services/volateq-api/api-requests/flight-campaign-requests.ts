export interface CreateFlightCampaignRequest {
  name: string;
  analysis_id: string;
  drone_id: string;
  start_date: string;
  original_start_date: string;
  battery_hotswapping: boolean;
  product_package_ids: string[];
  force_add_flight_type_ids: string[];
}
