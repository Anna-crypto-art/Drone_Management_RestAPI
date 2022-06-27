import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text } from "ol/style";
import { asArray, asString } from "ol/color";
import { IPlantVisualization } from "../types";
import { GeoJSONLayer, VectorGeoLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { EventEmitter } from "events";

export const GEO_JSON_OPTIONS = { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" };

/**
 * Represents a geojson layer
 */
export abstract class LayerBase {
  private _showPCS = false;

  protected geoLayerObject?: GeoJSONLayer;

  protected abstract readonly name: string;
  protected selected = false;
  protected readonly autoZoom: boolean = false;
  protected visible = true;
  protected zIndex?: number;
  protected showPcsZoomLevel = 15;
  protected refreshLayer = false;
  protected readonly events = new EventEmitter();

  constructor(public readonly vueComponent: BaseAuthComponent & IPlantVisualization) {}

  protected abstract getPcs(feature: FeatureLike): string | undefined;
  protected abstract load(): Promise<Record<string, unknown>>;
  protected abstract get id(): string | undefined;

  protected getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  protected onSelected(selected: boolean): void { /* overide me */ }

  protected getName(): string {
    return this.name;
  }

  public showPCS(show: boolean): void {
    this._showPCS = show;
  }

  public reloadLayer(): void {
    this.refreshLayer = true;
    if (this.geoLayerObject) {
      this.geoLayerObject.reloadLayer = this.refreshLayer;
    }
  }

  public toGeoLayer(): GeoJSONLayer {
    if (!this.geoLayerObject) {
      this.geoLayerObject = {
        type: "geojson",
        name: this.getName(),
        selected: this.selected,
        autoZoom: this.autoZoom,
        geoJSONLoader: () => this.load(),
        geoJSONOptions: GEO_JSON_OPTIONS,
        style: (feature: FeatureLike) => this.getStyle(feature),
        onSelected: (selected: boolean) => this.onSelected(selected),
        visible: this.visible,
        zIndex: this.zIndex,
        layerType: "VectorImageLayer",
        reloadLayer: this.refreshLayer,
        id: this.id,
        events: this.events,
      };
    }

    return this.geoLayerObject;
  }

  public setSelected(selected: boolean) {
    this.events.emit("setSelected", selected);
  }

  protected showText(feature: FeatureLike, props: Record<string, unknown> = {}): Text | undefined {
    return new Text({
      text: (this._showPCS && this.hasZoomLevelForPcs() && this.getPcs(feature)) || "",
      overflow: true,
      rotation: (props.rotation as number) || -(Math.PI / 2.3),
      stroke: new Stroke({
        color: "#fff",
        width: 2,
      }),
      font: "bold 14px Arial, Verdana, Helvetica, sans-serif",

      ...props,
    });
  }

  private hasZoomLevelForPcs(): boolean {
    return (this.vueComponent.openLayers!.getMap().getView().getZoom() || 0) >= this.showPcsZoomLevel;
  }

  protected getComplementColor(color: string): string {
    return "#" + (0xffffff ^ parseInt(color.replace("#", "0x"))).toString(16);
  }

  public getColorWithAlpha(color: string, alpha: number): string {
    const [r, g, b] = Array.from(asArray(color));
    return asString([r, g, b, alpha]);
  }

  protected getVectorGeoLayer(): VectorGeoLayer {
    return this.vueComponent.openLayers!.getMap().getAllLayers().find(layer => layer.getProperties()['id'] === this.id) as VectorGeoLayer;
  }
}
