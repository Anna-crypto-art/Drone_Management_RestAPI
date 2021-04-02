export interface IAppModalForm {
  hide(): void;
  show(): void;
  alertError(msg: string | any): void;
  hideAlert(): void;
}