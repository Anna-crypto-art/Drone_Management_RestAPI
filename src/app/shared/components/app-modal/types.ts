import { ApiException } from "../../services/volateq-api/api-errors";

export interface IAppModalForm {
  hide(): void;
  show(): void;
  alertError(msg: string | ApiException): void;
  hideAlert(): void;
}