import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { FeatureInfos, FeatureInfosMeta, IPlantVisualization, PropsFeature } from "../types";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { LayerColor } from "./types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ReferenceMeasurementEntriesSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";
import { Extent } from "ol/extent";
import { IOrthoImageMixin, OrthoImage } from "../mixins/types";

export abstract class ComponentLayer extends LayerBase implements IOrthoImageMixin {
  public abstract readonly componentId: ApiComponent;
  protected abstract readonly color: LayerColor;
  
  protected readonly width: number = 1;
  protected readonly refMeasureColor = LayerColor.volateqBlue;

  public readonly allowRefMeasures: boolean = false;
  protected onAddRefMeasureCallback: (
      (fieldgeoComponent: FieldgeometryComponentSchema, refMeasureEntries: ReferenceMeasurementEntriesSchema | null) => void
    ) | undefined = undefined;

  protected analysis: AnalysisForViewSchema | null = null;

  private readonly orhtoImageMixin: OrhtoImageMixin;
  public orthoImages: OrthoImage[] | null = null;

  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
  ) {
    super(vueComponent);

    this.orhtoImageMixin = new OrhtoImageMixin(this);

    this.created();
  }

  protected created(): void {/* override me */}
  public get id(): string | undefined {
    return this.name;
  }

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  protected getName(): string {
    return this.vueComponent.$t(this.name).toString();
  }

  protected getColor(feature: FeatureLike): string {
    const pcs = this.getPcs(feature);
    if (pcs && this.allowRefMeasures && this.vueComponent.refMeasuredPcsCodes.includes(pcs)) {
      return this.refMeasureColor;
    }

    return this.color;
  }

  public isOrthoImageAvailable(orthoImage: OrthoImage, componentId: ApiComponent): boolean {
    return this.orhtoImageMixin.isOrthoImageAvailable(orthoImage, componentId);
  }

  protected getWidth(): number {
    return this.zoomWidth || this.width;
  }

  public async load(extent: Extent): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      return await volateqApi.getComponentsGeoVisual(
        this.vueComponent.plant.id,
        [this.componentId],
        extent ? {
          min_long: extent[0], 
          min_lat: extent[1],
          max_long: extent[2],
          max_lat: extent[3],
        } : undefined,
      );
    } catch (e) {
      this.vueComponent.showError(e);
    }

    return undefined;
  }

  public setSelectedAnalysis(analysis: AnalysisForViewSchema | null) {
    this.analysis = analysis;
  }

  public get analysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysis?.analysis_result || null;
  }

  public async onClick(
    feature: FeatureLike,
    featureInfosMeta: FeatureInfosMeta,
  ): Promise<FeatureInfos | undefined> { 
    if (!this.allowRefMeasures || !this.isVisible || !this.selected) {
      return undefined;
    }

    const pcs = this.getPcs(feature)!;
    if (!pcs) {
      return undefined;
    }

    if (!featureInfosMeta.fieldgeoComponent) {
      featureInfosMeta.fieldgeoComponent = await volateqApi.getFieldgeometryComponent(
        this.vueComponent.plant.fieldgeometry!.id,
        pcs,
      )
    }

    if (featureInfosMeta.fieldgeoComponent!.component_id !== this.componentId) {
      return undefined;
    }

    if (!this.analysis) {
      return undefined;
    }

    const featureInfos = await this.getRefMeasureFeatureInfos(featureInfosMeta, this.analysis.id);
    
    this.orhtoImageMixin.addShowOrthoImageActions(featureInfos, this.componentId);

    return featureInfos;
  }
}
