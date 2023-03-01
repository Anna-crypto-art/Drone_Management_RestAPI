import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { FeatureInfo, FeatureInfos, IPlantVisualization } from "../types";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { LayerColor } from "./types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

export abstract class ComponentLayer extends LayerBase {
  protected abstract readonly componentId: ApiComponent;
  protected abstract readonly color: LayerColor;
  
  protected readonly width: number = 1;
  protected readonly refMeasureColor = LayerColor.volateqBlue;
  // zoomlevel: width
  protected readonly zoomWidths: Record<number, number> | null = null;

  protected readonly allowRefMeasures: boolean = false;
  protected onAddRefMeasureCallback: ((fieldgeoComponent: FieldgeometryComponentSchema) => void) | undefined = undefined;

  protected zoomWidth: number | null = null;

  protected analysis: AnalysisSchema | null = null;

  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
    protected readonly refMeasuredPcsCodes: string[],
  ) {
    super(vueComponent);

    this.created();
  }

  public onAddReferenceMeasurement(callback: (fieldgeoComponent: FieldgeometryComponentSchema) => void) {
    if (this.allowRefMeasures) {
      this.onAddRefMeasureCallback = callback;
    }
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
    if (pcs && this.allowRefMeasures && this.refMeasuredPcsCodes.includes(pcs)) {
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

  public setSelectedAnalysis(analysis: AnalysisSchema | null) {
    this.analysis = analysis;
  }

  public async onClick(
    features: FeatureLike[],
    fieldgeoComponent: FieldgeometryComponentSchema | undefined
  ): Promise<FeatureInfos | undefined> { 
    if (!this.allowRefMeasures || !this.isVisible || !this.selected) {
      return undefined;
    }

    const layer = this.getVectorGeoLayer()!;
    const feature = features.find(feature => 
      layer.getSource()?.getFeatures().find(layerFeature => layerFeature.get('name') === feature.get('name')));

    if (!feature) {
      return undefined;
    }

    const pcs = this.getPcs(feature)!;
    const featureInfoRecords: FeatureInfo[] = [];

    if (this.analysis && this.refMeasuredPcsCodes.includes(pcs)) {
      const refMeasureEntries = await volateqApi.getReferenceMeasurementEntries(this.analysis.id, { pcs });

      
      // TODO: load ref measure entry by pcs codel
    }

    if (!fieldgeoComponent) {
      fieldgeoComponent = await volateqApi.getFieldgeometryComponent(
        this.vueComponent.plant.fieldgeometry!.id,
        pcs,
      )
    }

    if (fieldgeoComponent.component_id !== this.componentId) {
      return undefined;
    }

    return {
      title: pcs,
      records: [],
      actionsSummaries: [
        { 
          buttonVariant: "secondary",
          name: this.vueComponent.$t("add-reference-measurement").toString(),
          actions: [
            {
              name: this.vueComponent.$t("add-reference-measurement").toString(),
              action: async () => {
                this.onAddRefMeasureCallback && this.onAddRefMeasureCallback(fieldgeoComponent!);
              }
            }
          ]
        }
      ]
    }
  }
}
