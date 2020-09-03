export interface IAppModalForm {
  hide(): void;
  show(): void;
  alertError(msg: string): void;
  hideAlert(): void;
}