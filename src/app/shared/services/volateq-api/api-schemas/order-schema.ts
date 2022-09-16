import { CustomerSchema } from "./customer-schemas";
import { PlantSchema } from "./plant-schema";
import { ProductPackageSchema } from "./product-package";
import { SimpleUserSchema } from "./user-schemas";

export interface OrderProductPackageSchema {
  id: string;
  quantity: number;
  product_package: ProductPackageSchema;
}

export enum OrderType {
  SETUP = 1,
  SUBSCRIPTION = 2,
}

export interface OrderSchema {
  id: string;
  order_type: OrderType;
  name: string;
  plant: PlantSchema;
  customer: CustomerSchema;
  start_date: string;
  end_date: string;
  product_packages: OrderProductPackageSchema[];
  created_at: string;
  user_created: SimpleUserSchema;
  updated_at?: string;
  user_updated?: SimpleUserSchema;
}