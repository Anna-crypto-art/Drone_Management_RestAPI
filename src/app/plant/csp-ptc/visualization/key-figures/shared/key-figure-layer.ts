import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "../../shared/layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend } from "./types";
import { GeoJSONLayer } from "volateq-geovisualization";
import apiResultsLoader from "@/app/shared/services/volateq-api/api-results-loader";
import { AnalysisResultCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultCspPtcMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-helper";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import Vue from "vue";


export abstract class KeyFigureLayer<T extends AnalysisResultCspPtcSchemaBase> extends LayerBase {
  protected abstract readonly keyFigureId: AnalysisResultKeyFigure;
  protected abstract readonly analysisResultMapping: AnalysisResultCspPtcMappings<T>;

  constructor(
    plant: PlantSchema,
    vueComponent: Vue,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    protected readonly onSelectedEvent: (selected: boolean, legend: Legend) => void,
  ) {
    super(plant, vueComponent);

    this.visible = false;
  }

  protected abstract getLegend(): Legend;

  protected onSelected(selected: boolean): void {
    super.onSelected(selected);

    this.onSelectedEvent(selected, this.getLegend());
  }

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = {
      name: this.vueComponent.$t(key).toString(),
      value: (value as any).toString(),
      descr: descr,
    };

    return featureInfo;
  }

  protected mapResultToFeatureInfos(result: T): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultCspPtcMappingHelper(this.analysisResultMapping, this.analysisResult!);
    const record = mappingHelper.getItem(result)

    const getDescr = (key: string) => this.analysisResultMapping.find(entry => entry.transName === key)?.transDescr;

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
    const results = apiResultsLoader.getResults<T>(this.analysisResult!.id, this.getComponentKeyFigureId()!);
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
  
  public load(): Promise<Record<string, unknown>> {
    apiResultsLoader.loadResults<T>(this.analysisResult.id, this.getComponentKeyFigureId());

    return volateqApi.getKeyFiguresGeoVisual(this.plant.id, this.analysisResult.id, [this.getComponentKeyFigureId()])
  }

  public onClick(features: FeatureLike[]): FeatureInfos | undefined {
    if (this.selected) {
      for (const feature of features) {
        const result = this.getResultDetails(feature);
        if (result) {
          const fieldgeo_component = result.fieldgeometry_component;
          if (fieldgeo_component && this.hasComponentId(fieldgeo_component.component_id)) {
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

  private getComponentKeyFigureId(): string {
    const comp_key_figures = this.analysisResult.component_key_figures
      .filter(comp_key_figure => comp_key_figure.key_figure.id === this.keyFigureId)

    if (comp_key_figures.length > 0) {
      return comp_key_figures[0].id;
    }

    throw new Error('Invalid analysis result for key figure layer');
  }

  private hasComponentId(componentId: AnalysisResultComponent): boolean {
    return this.analysisResult.component_key_figures
      .filter(compKeyFigure => compKeyFigure.component.id === componentId && compKeyFigure.key_figure.id === this.keyFigureId)
      .length > 0;
  }
}