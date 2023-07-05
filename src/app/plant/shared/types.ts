export interface PlantRouteQuery {
  view?: "map" | "table" | "diagram" | "admin";
  pi_layer_name?: string | string[];
  result?: string | string[];
  component?: string | string[];
}