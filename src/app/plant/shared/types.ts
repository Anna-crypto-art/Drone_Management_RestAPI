export interface PlantRouteQuery {
  view?: "map" | "table" | "diagram" | "admin";
  pi?: string | string[];
  piclass?: string | string[];
  result?: string | string[];
  component?: string | string[];
}