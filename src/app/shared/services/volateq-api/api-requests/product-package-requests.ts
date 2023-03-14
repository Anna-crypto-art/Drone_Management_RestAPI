export interface CreateProductPackageRequest {
  name: string;
  technology_id: number;
  key_figures: number[];
  plant_status: number[];
}
export interface UpdateProductPackageRequest {
  name: string;
  technology_id: number;
  key_figures: number[];
  plant_status: number[];
}
