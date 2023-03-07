import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { FeatureInfo, FeatureInfoGroup, FeatureInfos, FeatureInfosMeta, IPlantVisualization } from "../types";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { LayerColor, OrthoImage } from "./types";
import { AnalysisForViewSchema, AnalysisSchema, SimpleAnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { ReferenceMeasurementEntriesSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";

export abstract class ComponentLayer extends LayerBase {
  protected abstract readonly componentId: ApiComponent;
  protected abstract readonly color: LayerColor;
  
  protected readonly width: number = 1;
  protected readonly refMeasureColor = LayerColor.volateqBlue;
  // zoomlevel: width
  protected readonly zoomWidths: Record<number, number> | null = null;

  protected readonly allowRefMeasures: boolean = false;
  protected onAddRefMeasureCallback: (
      (fieldgeoComponent: FieldgeometryComponentSchema, refMeasureEntries: ReferenceMeasurementEntriesSchema | null) => void
    ) | undefined = undefined;

  protected zoomWidth: number | null = null;

  protected analysis: AnalysisForViewSchema | null = null;

  public orthoImages: OrthoImage[] | null = null;

  private readonly orhtoImageMixin: OrhtoImageMixin;

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

  protected getPcs(feature: FeatureLike): string | undefined {
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

  protected getWidth(): number {
    return this.zoomWidth || this.width;
  }

  public async load(): Promise<Record<string, unknown> | undefined> {
    if (this.zoomWidths) {
      this.onZoom((zoomlevel) => {
        if (zoomlevel) {
          let matchingZoomLevel: string | null = null;

          const zoomWidthLevels = Object.keys(this.zoomWidths!);
          for (let i = 0; i < zoomWidthLevels.length; i++) {
            const zoomWidthLevel = +zoomWidthLevels[i];
            if (zoomWidthLevel > zoomlevel) {
              if ((i + 1) === zoomWidthLevels.length) {
                matchingZoomLevel = zoomWidthLevels[i];
              }

              break;
            }

            matchingZoomLevel = zoomWidthLevels[i];
          }

          if (matchingZoomLevel !== null) {
            this.zoomWidth = this.zoomWidths![matchingZoomLevel];
          } else {
            this.zoomWidth = null;
          }
        }
      });
    }

    try {
      return volateqApi.getComponentsGeoVisual(this.vueComponent.plant.id, [this.componentId]);
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
