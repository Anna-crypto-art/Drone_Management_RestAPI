export interface CreateProductPackageRequest {
  name: string;
  technology_id: number;
  key_figures: number[];
  plant_status: string[];
}
export interface UpdateProductPackageRequest {
  name: string;
  technology_id: number;
  key_figures: number[];
  plant_status: string[];
}
