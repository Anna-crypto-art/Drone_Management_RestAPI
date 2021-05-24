import Vue from "vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { GeoJSONLayer } from "volateq-geovisualization";


const GEO_JSON_OPTIONS = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };


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

  constructor(
    protected readonly plant: PlantSchema,
    protected readonly vueComponent: Vue
  ) {}

  protected abstract getPcs(feature: FeatureLike): string | undefined;
  protected abstract load(): Promise<Record<string, unknown>>;

  protected getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  protected onSelected(selected: boolean): void {
    this.selected = selected;
  }

  public showPCS(show: boolean): void {
    this._showPCS = show;
  }

  public toGeoLayer(): GeoJSONLayer {
    this.geoLayerObject = {
      type: "geojson",
      name: this.vueComponent.$t(this.name).toString(),
      selected: this.selected,
      autoZoom: this.autoZoom,
      geoJSONLoader: () => this.load(),
      geoJSONOptions: GEO_JSON_OPTIONS,
      style: (feature: FeatureLike) => this.getStyle(feature),
      onSelected: (selected: boolean) => this.onSelected(selected),
      visible: this.visible,
    };

    return this.geoLayerObject;
  }

  protected showText(feature: FeatureLike, props: Record<string, unknown> = {}): Text | undefined {
    return new Text({
      text: this._showPCS && this.getPcs(feature) || '',
      overflow: true,
      rotation: -(Math.PI / 2),
      ...props
    });
  }
}