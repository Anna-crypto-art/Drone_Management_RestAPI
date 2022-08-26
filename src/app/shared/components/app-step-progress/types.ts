export interface ProgressStep {
  id: number;
  name: string;
  description: string;
  danger?: boolean;
  active?: boolean;
}