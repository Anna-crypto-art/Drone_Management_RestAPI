export interface LoadingEvent {
  loading: boolean;
  state?: string;
}

export enum LayerEvent {
  SET_SELECTED = "setSelected",
  COLLAPSE = "collapse"
}
