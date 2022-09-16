import { OrderType } from "../api-schemas/order-schema";

export interface CreateOrderRequest {
  order_type: OrderType;
  customer_id: string;
  plant_id: string;
  product_packages: number[];
  quantities: number[];
  start_date: string;
  end_date: string;
}

export interface UpdateOrderRequest {
  product_packages: number[];
  quantities: number[];
  start_date: string;
  end_date: string;
}