import { Map } from "ol";
import { LayerStructure } from "../layer-structure";
import { LayerType } from "./layers";

export interface IOpenLayersComponent {
  getMap(): Map;
  updateLayers(): void;
}

export interface IAppLayerSWitcher {
  updateLayers(): void;
}

export interface IAppGeoJsonLayerCheckbox {
  setSelected(selected: boolean): Promise<void>;
}