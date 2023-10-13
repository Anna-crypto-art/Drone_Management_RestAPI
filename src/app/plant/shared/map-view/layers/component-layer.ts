import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { PropsFeature } from "../types";
import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";
import { Extent } from "ol/extent";
import { BaseLayer } from "./base-layer";
import { LayerColor } from "../../visualization/layers/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { RefMeasureLayersService } from "./ref-measure-layers-service";

export abstract class ComponentLayer extends BaseLayer {
  public abstract readonly componentId: ApiComponent;
  protected abstract readonly color: LayerColor;
  
  protected readonly width: number = 1;

  protected readonly refMeasureColor = LayerColor.volateqBlue;
  public readonly allowRefMeasures: boolean = false;

  constructor(plant: PlantSchema) {
    super(plant);

    this.created();
  }

  protected created(): void {/* override me */}

  public get id(): string {
    return this.plant.id + "___" + this.name;
  }

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  protected getColor(feature: FeatureLike): string {
    const pcs = this.getPcs(feature);
    if (this.allowRefMeasures && pcs && this.appLayerCheckbox && 
      RefMeasureLayersService.get(this.plant, this.appLayerCheckbox.map).hasPCS(pcs)) 
    {
      return this.refMeasureColor;
    }

    return this.color;
  }

  protected getWidth(): number {
    return this.zoomWidth || this.width;
  }

  public async load(extent: Extent): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      return await volateqApi.getComponentsGeoVisual(
        this.plant.id,
        [this.componentId],
        extent ? {
          min_long: extent[0], 
          min_lat: extent[1],
          max_long: extent[2],
          max_lat: extent[3],
        } : undefined,
      );
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    }

    return undefined;
  }
}
