import { ApiKeyFigure } from "../api-key-figures";
import { CustomComponentPropertySchema } from "./custom-component-property-schema";
import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";
import { SimpleUserSchema } from "./user-schemas";

export enum TimePeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface SummerizedCCPs {
  ccp_id: string;
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

export interface CcpColumn {
  custom_component_property: CustomComponentPropertySchema;
  count?: number;
}

export interface PiColumn {
  key_figure_id: ApiKeyFigure;
  pi_field_name: string;
  count?: number;
}

export interface ObservationColumn {
  id: string;
  ccp_column?: CcpColumn;
  pi_column?: PiColumn;
}

export type ObservationValue = string | number | boolean;

export type ObservationColumnValue = Record<string, ObservationValue>;

export interface ObservationSchema {
  id: string; 
  plant_id: string; 
  fieldgeometry_component: FieldgeometryComponentSchema; 
  observed_at: string; 
  notes: string; 
  external_id: string;
  created_by_user: SimpleUserSchema;
  updated_at: string;
  created_at: string;
  column_values: ObservationColumnValue;
  ignore_as_ref_measure?: boolean;
}

export interface ReferenceMeasurementsSchema {
  items: ObservationSchema[];
  columns: ObservationColumn[];
}