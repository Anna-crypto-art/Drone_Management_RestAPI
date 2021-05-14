import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import Feature, { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';

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

  public getStyle(feature: FeatureLike): Style | undefined {
    return new Style({
      text: this.showText(feature),
    });
  }

  public showPCS(show: boolean): void {
    this._showPCS = show;
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