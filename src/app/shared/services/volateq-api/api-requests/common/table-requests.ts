export interface TableRequest {
  limit?: number;
  page?: number;
  order_by?: string | null;
  order_direction?: 'asc' | 'desc';
  filter?: string;
  filter_mode?: 'contains' | 'equals';
}