import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "../../shared/layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { FeatureInfos } from "./types";
import { GeoJSONLayer } from "volateq-geovisualization";


export abstract class KeyFigureLayer<T extends AnalysisResultCspPtcSchemaBase> extends LayerBase {
  protected abstract readonly keyFigureId: AnalysisResultKeyFigure;
  
  private analysisResult?: AnalysisResultDetailedSchema;

  protected abstract getOnClickInfo(feature: FeatureLike): FeatureInfos | undefined;

  protected getProperties(feature: FeatureLike): T | undefined {
    return feature.getProperties() as T;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return this.getProperties(feature)?.fieldgeometry_component?.kks;
  }

  public setAnalysisResult(analysisResult: AnalysisResultDetailedSchema): void {
    this.analysisResult = analysisResult;
  }

  public isAvailable(): boolean {
    return !!this.getComponentKeyFigureId();
  }
  
  public load(): Promise<Record<string, unknown>> {
    if (!this.isAvailable()) {
      throw Error('KeyFigure not available');
    }

    return volateqApi.getKeyFiguresGeoVisual(this.plant.id, this.analysisResult!.id, [this.getComponentKeyFigureId()!])
  }

  public onClick(features: FeatureLike[]): FeatureInfos | undefined {
    for (const feature of features) {
      const fieldgeo_component = this.getProperties(feature)?.fieldgeometry_component;
      if (fieldgeo_component) {
        const keyFigureId = this.getKeyFigureIdByComponentId(fieldgeo_component.component_id);
        if (keyFigureId) {
          return this.getOnClickInfo(feature);
        }
      }
    }

    return undefined;
  }

  public toGeoLayer(): GeoJSONLayer {
    return {
      ...super.toGeoLayer(),
      isVisible: this.isAvailable
    }
  }

  private getComponentKeyFigureId(): string | undefined {
    if (!this.analysisResult) {
      throw Error('analysisResult is undefined!');
    }

    const comp_key_figures = this.analysisResult.component_key_figures
      .filter(comp_key_figure => comp_key_figure.key_figure.id === this.keyFigureId)

    if (comp_key_figures.length > 0) {
      return comp_key_figures[0].id;
    }

    return undefined;
  }

  private getKeyFigureIdByComponentId(componentId: AnalysisResultComponent): AnalysisResultKeyFigure | undefined {
    if (!this.analysisResult) {
      throw Error('analysisResult is undefined!');
    }

    const comp_key_figures = this.analysisResult.component_key_figures
      .filter(comp_key_figure => comp_key_figure.component.id === componentId);

      if (comp_key_figures.length > 0) {
        return comp_key_figures[0].key_figure.id;
      }

    return undefined;
  }
}