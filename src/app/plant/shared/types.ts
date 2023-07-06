export interface PlantRouteQuery {
  view?: "map" | "table" | "diagram" | "admin";
  layer?: string | string[];
  result?: string | string[];
  component?: string | string[];
}