import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo } from "./types";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend, IPlantVisualization } from "../types";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import Vue from "vue";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase> extends LayerBase {
  protected abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  protected readonly name: string;

  protected abstract get color(): string;
  protected colorScheme = KeyFigureColorScheme.TRAFFIC_LIGHT;
  protected enableCompare = false;
  protected compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  protected geoJSON?: {
    type: string;
    features: { properties: FeatureProperties }[];
    custom: { components_total_count: number; mirrors_per_sce?: number };
  };

  constructor(
    vueComponent: Vue & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    protected readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: GeoVisualQuery,
    protected readonly initColor?: KeyFigureColors,
  ) {
    super(vueComponent);

    this.visible = false;
    this.name = (this.keyFigureInfo.templateName ||
      (this.keyFigureInfo.displayName && this.vueComponent.$t(this.keyFigureInfo.displayName).toString()) ||
      (this.keyFigureInfo.keyName && this.vueComponent.$t(this.keyFigureInfo.keyName).toString()))!;
    this.zIndex = this.keyFigureInfo.zIndex || 9; // 9 - to make sure PIs overlay components, always

    this.created();
  }

  protected created(): void {/* override me */}

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
      bold: key == this.keyFigureInfo.keyName,
    };

    return featureInfo;
  }

  protected mapResultToFeatureInfos(result: T): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult!);
    const record = mappingHelper.getItem(result);

    const featureInfos: FeatureInfos = {
      title: result.fieldgeometry_component.kks,
      records: Object.keys(record)
        .filter(k => k !== "pcs")
        .map(k =>
          this.mapRecordEntryToFeatureInfo(
            k,
            record[k]!,
            this.analysisResultMapping.find(entry => entry.transName === k)?.transDescr
          )
        )
        .filter(featureInfo => featureInfo !== undefined) as any,
    };

    return featureInfos;
  }

  protected getProperties(feature: FeatureLike): FeatureProperties {
    return feature.getProperties() as FeatureProperties;
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return {};
  }

  protected async getResultDetails(feature: FeatureLike): Promise<T | undefined> {
    const pcs = this.getPcs(feature);

    const results = await volateqApi.getSpecificAnalysisResult(this.analysisResult!.id, this.keyFigure.component.id, {
      search_text: pcs,
      limit: 1,
      search_mode: "equals",
      ...this.getMoreSpecificAnalysisResultParams(),
    });

    if (results.items.length > 0) {
      return results.items[0] as T;
    }

    return undefined;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return this.getProperties(feature).name;
  }

  protected getPropertyValue<T>(feature: FeatureLike): T | undefined {
    return this.getProperties(feature)?.value as unknown as T;
  }

  protected getPropertyDiffValue(feature: FeatureLike): number | undefined {
    if (this.enableCompare && this.compareAnalysisResult) {
      return this.getProperties(feature)?.diff_value as number;
    }

    return undefined;
  }

  public async load(): Promise<Record<string, unknown>> {
    if (this.enableCompare && this.compareAnalysisResult) {
      this.geoJSON = await volateqApi.getKeyFiguresGeoVisualCompare(
        this.vueComponent.plant.id,
        this.analysisResult.id,
        this.compareAnalysisResult.id,
        this.keyFigure.id,
        this.query
      )
    } else {
      this.geoJSON = await volateqApi.getKeyFiguresGeoVisual(
        this.vueComponent.plant.id,
        this.analysisResult.id,
        this.keyFigure.id,
        this.query
      );
    }

    return this.geoJSON as Record<string, unknown>;
  }

  public async onClick(features: FeatureLike[]): Promise<FeatureInfos | undefined> {
    if (this.selected) {
      for (const feature of features) {
        const result = await this.getResultDetails(feature);
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

  public setColorScheme(colorScheme: KeyFigureColorScheme) {
    this.colorScheme = colorScheme;
  }

  public setCompareAnalysisResult(compareAnalysisResult: AnalysisResultDetailedSchema | null) {
    if (this.enableCompare) {
      this.compareAnalysisResult = compareAnalysisResult;
    }
  }

  public get isCompareEnabled(): boolean {
    return this.enableCompare;
  }

  public hasKeyFigureForCompareAnalysisResult(): boolean {
    if (this.isCompareEnabled && this.compareAnalysisResult) {
      return !!(this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId) &&
        this.compareAnalysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId));
    }

    return false;
  }

  protected get id() {
    return `${this.analysisResult.id}__
      ${this.keyFigureInfo.displayName || this.keyFigureInfo.keyName || this.keyFigureInfo.templateName}`;
  }

  protected get keyFigure(): KeyFigureSchema {
    return this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId)!;
  }

  protected getLegendEntryCount(featureCount?: number, precision = 10): string {
    featureCount = featureCount !== undefined ? featureCount : this.geoJSON!.features.length;
    const totalCount = this.geoJSON!.custom.components_total_count;

    return ` (<b>${(
      Math.round((featureCount / totalCount) * 100 * precision) / precision
    ).toString()}%</b> - <small>${featureCount}</small>)`;
  }
}
