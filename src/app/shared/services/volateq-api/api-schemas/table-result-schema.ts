export interface TableResultSchema<T, C = any> {
  items: T[];
  total: number;
  sums?: T;
  columns?: C[];
}
