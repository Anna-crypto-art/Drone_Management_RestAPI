import { CustomerSchema } from "./customer-schemas";
import { KeyFigureSchema } from "./key-figure-schema";
import { PlantSchema } from "./plant-schema";
import { ProductPackageSchema } from "./product-package";
import { SimpleUserSchema } from "./user-schemas";

export interface OrderProductPackageSchema {
  id: string;
  quantity: number;
  product_package: ProductPackageSchema;
  disabled_key_figures_count: number;
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
  order_product_packages: OrderProductPackageSchema[];
  created_at: string;
  user_created: SimpleUserSchema;
  updated_at?: string;
  user_updated?: SimpleUserSchema;
}

export interface OrderPPKeyFiguresDisabledSchema {
  id: string;
  quantity: number;
  product_package_id: number;
  key_figures_disabled: KeyFigureSchema[];
}