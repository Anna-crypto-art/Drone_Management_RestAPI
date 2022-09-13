export interface ProductPackageSchema {
  id: number;
  name: string;
}

export interface CustomerPlantSchema {
  customer_id: string;
}

export type YearlyInterval = 1 | 4 | 12;

export interface CustomerPlantProductPackageSchema {
  customer_plant: CustomerPlantSchema;
  product_package: ProductPackageSchema;
  yearly_interval: YearlyInterval;
}