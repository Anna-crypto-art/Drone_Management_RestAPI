import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo, OrthoImage } from "./types";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend, IPlantVisualization, FeatureAction, PropsFeature } from "../types";
import { AnalysisResultMappingEntry, AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { IOrthoImageMixin } from "../mixins/types";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase> extends LayerBase implements IOrthoImageMixin {
  protected abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  protected readonly name: string;

  protected abstract get color(): string;
  public colorScheme = KeyFigureColorScheme.TRAFFIC_LIGHT;
  public enableCompare = false;
  public compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  protected readonly orhtoImageMixin: OrhtoImageMixin;
  public orthoImages: OrthoImage[] | null = null;

  public geoJSON?: {
    type: string;
    features: PropsFeature[];
    custom: { components_total_count: number; mirrors_per_sce?: number };
  };

  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    public readonly keyFigureId: ApiKeyFigure,
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

    this.orhtoImageMixin = new OrhtoImageMixin(this);

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

  protected mapResultToFeatureInfos(result: T): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult!);
    const resultItem = mappingHelper.getItem(result);

    const recordFeatureInfos: FeatureInfo[] = [];
    for (const entry of mappingHelper.getEntries()) {
      if (entry.transName === "pcs") {
        continue;
      }

      let recordValue: any = resultItem[entry.transName];
      if (recordValue === undefined || recordValue === null) {
        recordValue = "";
      }
      
      recordFeatureInfos.push({
        name: this.vueComponent.$t(entry.transName).toString(),
        value: recordValue,
        bold: entry.transName === this.keyFigureInfo.keyName,
        descr: entry.transDescr,
        unit: recordValue !== "" ? entry.unit : undefined,
      });
    }

    const featureInfos: FeatureInfos = {
      title: result.fieldgeometry_component.kks,
      records: recordFeatureInfos,
    };

    return featureInfos;
  }

  protected getMappingEntry(): AnalysisResultMappingEntry<T> | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult!);
    return mappingHelper.getEntries().find(entry => entry.transName === this.keyFigureInfo.keyName);
  }

  public getUnit(): string {
    return this.getMappingEntry()?.unit || "";
  }

  public getProperties(feature: FeatureLike): FeatureProperties {
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

  public async load(): Promise<Record<string, unknown> | undefined> {
    try {
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
    } catch (e) {
      this.vueComponent.showError(e);
    }

    return this.geoJSON;
  }

  public async onClick(features: FeatureLike[]): Promise<FeatureInfos | undefined> {
    if (this.selected) {
      for (const feature of features) {
        const result = await this.getResultDetails(feature);
        if (result) {
          const fieldgeo_component = result.fieldgeometry_component;
          if (fieldgeo_component && fieldgeo_component.component_id === this.keyFigure.component.id) {
            const featureInfos = this.mapResultToFeatureInfos(result);

            this.orhtoImageMixin.addShowOrthoImageActions(featureInfos);

            return featureInfos;
          }
        }
      }
    }

    return undefined;
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

  public get id() {
    return `${this.analysisResult.id}__
      ${this.keyFigureInfo.displayName || this.keyFigureInfo.keyName || this.keyFigureInfo.templateName}`;
  }

  protected get keyFigure(): KeyFigureSchema {
    return this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId)!;
  }

  public getLegendEntryCount(featureCount?: number, precision = 10): string {
    featureCount = featureCount !== undefined ? featureCount : this.geoJSON!.features.length;
    const totalCount = this.geoJSON!.custom.components_total_count;

    return ` (<b>${(
      Math.round((featureCount / totalCount) * 100 * precision) / precision
    ).toString()}%</b> - <small>${featureCount}</small>)`;
  }

  public removeOrthoImageFeatures() {
    this.orhtoImageMixin.removeOrthoImageFeatures();
  }

  public getOrthoImageZIndex(): number {
    return -1;
  }

  public getComponentId() {
    return this.keyFigure.component_id;
  }
}
