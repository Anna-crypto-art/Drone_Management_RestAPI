import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { FeatureInfos, PropsFeature } from "../types";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ReferenceMeasurementEntriesSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";
import { Extent } from "ol/extent";
import { BaseLayer } from "./base-layer";
import { IOrthoImageMixin, OrthoImage } from "../../visualization/mixins/types";
import { LayerColor } from "../../visualization/layers/types";
import { OrhtoImageMixin } from "../../visualization/mixins/ortho-image-mixin";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { i18n } from "@/main";

export abstract class ComponentLayer extends BaseLayer /*implements IOrthoImageMixin*/ {
  public abstract readonly componentId: ApiComponent;
  protected abstract readonly color: LayerColor;
  
  protected readonly width: number = 1;
  // protected readonly refMeasureColor = LayerColor.volateqBlue;

  // protected readonly allowRefMeasures: boolean = false;
  // protected onAddRefMeasureCallback: (
  //     (fieldgeoComponent: FieldgeometryComponentSchema, refMeasureEntries: ReferenceMeasurementEntriesSchema | null) => void
  //   ) | undefined = undefined;

  // protected analysis: AnalysisForViewSchema | null = null;

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
    // const pcs = this.getPcs(feature);
    // if (pcs && this.allowRefMeasures && this.vueComponent.refMeasuredPcsCodes.includes(pcs)) {
    //   return this.refMeasureColor;
    // }

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
