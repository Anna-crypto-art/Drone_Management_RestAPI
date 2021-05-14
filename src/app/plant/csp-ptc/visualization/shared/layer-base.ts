import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { GeoJSONLayer } from "volateq-geovisualization";


const GEO_JSON_OPTIONS = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };


/**
 * Represents a geojson layer
 */
export abstract class LayerBase {
  private _showPCS: boolean = false;

  public abstract readonly name: string;
  public readonly selected: boolean = false;
  public readonly autoZoom: boolean = false;

  constructor(
    protected readonly plant: PlantSchema
  ) {}

  protected abstract getPcs(feature: FeatureLike): string | undefined;
  public abstract load(): Promise<Record<string, unknown>>;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  public showPCS(show: boolean): void {
    this._showPCS = show;
  }

  public toGeoLayer(): GeoJSONLayer {
    return {
      type: "geojson",
      name:this.name,
      selected:this.selected,
      autoZoom:this.autoZoom,
      geoJSONLoader:this.load,
      geoJSONOptions: GEO_JSON_OPTIONS,
      style: this.getStyle,
    }
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