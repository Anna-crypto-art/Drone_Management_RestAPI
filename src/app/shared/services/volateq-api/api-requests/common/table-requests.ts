export interface TableRequest {
  limit?: number,
  page?: number,
  order_by?: string,
  order_direction?: 'asc' | 'desc',
  filter?: string,
}