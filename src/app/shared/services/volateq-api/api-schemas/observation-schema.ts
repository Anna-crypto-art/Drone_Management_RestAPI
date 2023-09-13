export enum TimePeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface SummerizedCCPs {
  component_id: number;
  name: string;
  count: number;
}

export interface SummerizedPIs {
  key_figure_id: number;
  pi_field_name: string;
  count: number;
}

export interface SummerizedComponent {
  component_id: number;
  count: number;
}


export interface SummerizedObservations {
  date: string;
  d_from: string;
  d_to: string;
  user_names: string[];
  components: SummerizedComponent[];
  ccps: SummerizedCCPs[];
  pis: SummerizedPIs[];
  count: number;
}

export interface SummerizedDates {
  period: TimePeriod;
  observations: SummerizedObservations[];
  total: number;
}