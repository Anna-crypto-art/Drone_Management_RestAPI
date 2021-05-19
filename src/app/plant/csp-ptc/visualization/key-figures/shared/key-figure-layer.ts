import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "../../shared/layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { FeatureInfos, FeatureProperties } from "./types";
import { GeoJSONLayer } from "volateq-geovisualization";
import apiResultsLoader from "@/app/shared/services/volateq-api/api-results-loader";
import { AnalysisResultCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";


export abstract class KeyFigureLayer<T extends AnalysisResultCspPtcSchemaBase> extends LayerBase {
  protected abstract readonly keyFigureId: AnalysisResultKeyFigure;
  protected abstract readonly analysisResultMapping: AnalysisResultCspPtcMappings<T>;
  
  private analysisResult?: AnalysisResultDetailedSchema;

  protected getOnClickInfo(feature: FeatureLike): FeatureInfos | undefined {
    // TODO: implment this
    return undefined
  }

  protected getProperties(feature: FeatureLike): FeatureProperties {
    return feature.getProperties() as FeatureProperties;
  }

  protected getResultDetails(feature: FeatureLike): T | undefined {
    if (this.isAvailable()) {
      const results = apiResultsLoader.getResults<T>(this.analysisResult!.id, this.getComponentKeyFigureId()!);
      if (results) {
        const pcs = this.getPcs(feature);
        const resultsFiltered = results.filter(result => result.fieldgeometry_component.kks === pcs);
        if (resultsFiltered.length > 0) {
          return resultsFiltered[0];
        }
      }
    }

    return undefined;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return this.getProperties(feature).name;
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

    apiResultsLoader.loadResults<T>(this.analysisResult!.id, this.getComponentKeyFigureId()!);

    return volateqApi.getKeyFiguresGeoVisual(this.plant.id, this.analysisResult!.id, [this.getComponentKeyFigureId()!])
  }

  public onClick(features: FeatureLike[]): FeatureInfos | undefined {
    for (const feature of features) {
      const fieldgeo_component = this.getResultDetails(feature)?.fieldgeometry_component;
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