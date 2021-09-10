import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "../../shared/layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend } from "./types";
import apiResultsLoader from "@/app/shared/services/volateq-api/api-results-loader";
import { AnalysisResultCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultCspPtcMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-helper";
import Vue from "vue";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { IPlantVisualization } from "../../types";


export abstract class KeyFigureLayer<T extends AnalysisResultCspPtcSchemaBase> extends LayerBase {
  protected abstract readonly keyFigureId: AnalysisResultKeyFigure;
  protected abstract readonly analysisResultMapping: AnalysisResultCspPtcMappings<T>;

  protected geoJSON?: { 
    type: string, 
    features: { properties: { name: string, value: string | boolean | number }}[], 
    custom: { components_total_count: { [componentId: number]: number }},
  };

  constructor(
    vueComponent: Vue & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
  ) {
    super(vueComponent);

    this.visible = false;
  }

  protected getLegend(): Legend | undefined {
    return undefined;
  }

  protected async onSelected(selected: boolean): Promise<void> {
    super.onSelected(selected);

    this.vueComponent.onLayerSelected(selected, this.getLegend());
  }

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = {
      name: this.vueComponent.$t(key).toString(),
      value: value === null || value === undefined ? "" : (value as any).toString(),
      descr: descr,
    };

    return featureInfo;
  }

  protected mapResultToFeatureInfos(result: T): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultCspPtcMappingHelper(this.analysisResultMapping, this.analysisResult!);
    const record = mappingHelper.getItem(result)

    const featureInfos: FeatureInfos = {
      title: result.fieldgeometry_component.kks,
      records: Object.keys(record).filter(k => k !== 'pcs')
        .map(k => this.mapRecordEntryToFeatureInfo(
            k, 
            record[k]!,
            this.analysisResultMapping.find(entry => entry.transName === k)?.transDescr
          )
        ).filter(featureInfo => featureInfo !== undefined) as any
    }

    return featureInfos
  }

  protected getProperties(feature: FeatureLike): FeatureProperties {
    return feature.getProperties() as FeatureProperties;
  }

  protected getResultDetails(feature: FeatureLike): T | undefined {
    const results = apiResultsLoader.getResults<T>(this.analysisResult!.id, this.keyFigure.component.id);
    if (results) {
      const pcs = this.getPcs(feature);
      const resultsFiltered = results.filter(result => result.fieldgeometry_component.kks === pcs);
      if (resultsFiltered.length > 0) {
        return resultsFiltered[0];
      }
    }

    return undefined;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return this.getProperties(feature).name;
  }
  
  public async load(): Promise<Record<string, unknown>> {
    apiResultsLoader.loadResults<T>(this.analysisResult.id, this.keyFigure.component.id);

    this.geoJSON = await volateqApi.getKeyFiguresGeoVisual(this.vueComponent.plant.id, this.analysisResult.id, [this.keyFigure.id]);

    return this.geoJSON as Record<string, unknown>;
  }

  public onClick(features: FeatureLike[]): FeatureInfos | undefined {
    if (this.selected) {
      for (const feature of features) {
        const result = this.getResultDetails(feature);
        if (result) {
          const fieldgeo_component = result.fieldgeometry_component;
          if (fieldgeo_component && fieldgeo_component.component_id === this.keyFigure.component.id) {
            return this.mapResultToFeatureInfos(result);
          }
        }
      }
    }

    return undefined;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
    if (this.geoLayerObject) {
      this.geoLayerObject.visible = this.visible;
    }
  }

  protected get keyFigure(): KeyFigureSchema {
    return this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId)!;
  }

  protected getLegendEntryCount(feature_count?: number): string {
    feature_count = feature_count || this.geoJSON!.features.length;
    const totalCount = this.geoJSON!.custom.components_total_count[this.keyFigure.component_id];

    return ` (<b>${(feature_count / totalCount * 100).toFixed(1)}%</b> - <small>${feature_count}</small>)`
  }
}