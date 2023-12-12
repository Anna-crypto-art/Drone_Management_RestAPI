import { OrderType } from "../api-schemas/order-schema";

export interface OrderPPKeyFiguresDisabledRequest {
  product_package_id: number;
  key_figures_ids: number[];
}

export interface CreateOrderRequest {
  order_type: OrderType;
  customer_id: string;
  plant_id: string;
  product_packages: number[];
  quantities: number[];
  start_date: string;
  end_date: string;
  key_figures_disabled?: OrderPPKeyFiguresDisabledRequest[]; 
}

export interface UpdateOrderRequest {
  product_packages: number[];
  quantities: number[];
  start_date: string;
  end_date: string;
  key_figures_disabled?: OrderPPKeyFiguresDisabledRequest[];
}