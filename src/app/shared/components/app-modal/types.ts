export interface IAppModalForm {
  stopLoading(): void;
  hide(): void;
  show(): void;
  alertError(msg: string): void;
  hideAlert(): void;
}