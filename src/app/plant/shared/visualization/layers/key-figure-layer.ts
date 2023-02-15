import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo, OrthoImage } from "./types";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend, IPlantVisualization, FeatureAction, PropsFeature, FeatureActionsSummary, ComparedFeatureType, ComparedFeatures } from "../types";
import { AnalysisResultMappingEntry, AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { IOrthoImageMixin } from "../mixins/types";
import { analysisResultEventService } from "../../plant-admin-view/analysis-result-event-service";
import { AnalysisResultEvent } from "../../plant-admin-view/types";
import { FilterFieldType } from "../../filter-fields/types";
import { keyFigureRainbowColors } from "@/app/plant/shared/visualization/key-figure-colors";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase, Q extends GeoVisualQuery> extends LayerBase implements IOrthoImageMixin {
  protected abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  protected readonly name: string;
  protected readonly description?: string;

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
    public readonly query?: Q,
    protected readonly initColor?: KeyFigureColors,
    public readonly invisibleAutoSelection?: boolean,
  ) {
    super(vueComponent);

    this.visible = false;
    this.name = (this.keyFigureInfo.templateName ||
      (this.keyFigureInfo.displayName && this.vueComponent.$t(this.keyFigureInfo.displayName).toString()) ||
      (this.keyFigureInfo.keyName && this.vueComponent.$t(this.keyFigureInfo.keyName).toString()))!;
    this.description = this.keyFigureInfo.description;
    this.zIndex = this.keyFigureInfo.zIndex || 9; // 9 - to make sure PIs overlay components, always

    this.orhtoImageMixin = new OrhtoImageMixin(this);

    this.created();
  }

  protected created(): void {/* override me */}

  protected getDescription(): string | undefined {
    return this.description && this.vueComponent.$t(this.description).toString();
  }

  protected getLegend(): Legend | undefined {
    return undefined;
  }

  public getLegendId(): string {
    return `${this.analysisResult.id}__${this.keyFigureId}__${this.keyFigureInfo.displayName || this.keyFigureInfo.keyName || this.keyFigureInfo.templateName || ""}`;
  }

  protected getLegendName(): string {
    return this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString()
  }

  protected async onSelected(selected: boolean): Promise<void> {
    super.onSelected(selected);

    await this.vueComponent.onLayerSelected(selected, this.getLegend());
  }

  protected mapResultToFeatureInfos(result: T): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(
      this.analysisResultMapping,
      this.analysisResult!,
      this.vueComponent.isSuperAdmin,
    );
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
        superAdminOnly: entry.superAdminOnly,
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

            if (this.vueComponent.enableResultsModification) {
              await this.addResultsModificationFeatureAction(featureInfos!);
            }

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
      ${this.keyFigureId}__
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
  
  public getComponentId() {
    return this.keyFigure.component_id;
  }

  private async addResultsModificationFeatureAction(featureInfos: FeatureInfos) {
    if (!featureInfos.actionsSummaries) {
      featureInfos.actionsSummaries = [];
    }

    const actionsSummary: FeatureActionsSummary = {
      superAdminOnly: true,
      buttonVariant: "secondary",
      name: this.vueComponent.$t("modify").toString(),
      actions: [
        {
          name: this.vueComponent.$t("set-to-null").toString(),
          action: async () => {
            await this.modfiyFeatureResultAction(featureInfos, "null");
          }
        },
      ],
    }

    const entry = this.getMappingEntry();
    if (entry?.filterType === FilterFieldType.BOOLEAN) {
      actionsSummary.actions.push({
        name: this.vueComponent.$t("set-to-false").toString(),
        action: async () => {
          await this.modfiyFeatureResultAction(featureInfos, "false");
        }
      })
    }

    featureInfos.actionsSummaries.push(actionsSummary);
  }

  private async modfiyFeatureResultAction(featureInfos: FeatureInfos, newValue: "null" | "false") {
    if (!confirm(this.vueComponent.$t("apply-are-you-sure").toString())) {
      return;
    }

    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult);
    const entry = this.getMappingEntry();

    await volateqApi.setAnalysisResultValueToNullOrFalse(this.analysisResult.id, {
      key_figure_id: this.keyFigureId,
      kks: featureInfos.title,
      property_name: entry ? mappingHelper.getPropertyName(entry) : undefined,
      new_value: newValue,
    });

    this.reloadLayer();
    await this.setSelected(false);
    await this.setSelected(true);

    this.vueComponent.hideToast();

    analysisResultEventService.emit(this.analysisResult.id, AnalysisResultEvent.MODIFIED);
  }

  protected get color(): string {
    if (this.initColor) {
      return this.initColor;
    }

    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      return keyFigureRainbowColors[this.keyFigureId];
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      return KeyFigureColors.red;
    }

    throw new Error("Unexpected colorScheme: " + this.colorScheme);
  }

  public getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(KeyFigureColors.green, 0.3);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.5);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      if (classValue === 1) {
        return KeyFigureColors.green;
      }
      
      if (classValue === 2) {
        return KeyFigureColors.yellow;
      }
    }

    return this.color!;
  }

  public getDiffColorByComparedFeatureType(comparedFeatureType: ComparedFeatureType): string {
    switch (comparedFeatureType) {
      case ComparedFeatureType.NEW_IMPROVED:
      case ComparedFeatureType.NO_CHANGE:
        return KeyFigureColors.black;

      case ComparedFeatureType.GONE_IMPROVED:
        return KeyFigureColors.green;

      case ComparedFeatureType.NEW_WORSENED:
        return KeyFigureColors.red;

      case ComparedFeatureType.GONE_WORSENED:
        return this.getColorWithAlpha('#fff', 0); // transparent -> invisible
    }
  }

  public getComparedFeatures(currentClass: number): ComparedFeatures {
    const comparedFeatures: ComparedFeatures = {
      [ComparedFeatureType.NO_CHANGE]: [],
      [ComparedFeatureType.GONE_IMPROVED]: [],
      [ComparedFeatureType.GONE_WORSENED]: [],
      [ComparedFeatureType.NEW_IMPROVED]: [],
      [ComparedFeatureType.NEW_WORSENED]: [],
    };

    for (const propFeature of this.geoJSON!.features) {
      const comparedFeatureType = this.getComparedFeatureType(propFeature.properties, currentClass);
      comparedFeatures[comparedFeatureType].push(propFeature);
    }

    return comparedFeatures;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    const featureValue: number = properties.value! as number;
    const featureDiffValue: number = properties.diff_value! as number;

    if (featureValue !== currentClass) {
      // featureValue is now (new analysis) in another class than the current class,
      // but was before (old analysis) in the current class.

      if (featureValue < currentClass) {
        // featureValue is now in a lower class than the current class.
        return ComparedFeatureType.GONE_IMPROVED;
      }

      if (featureValue > currentClass) {
        // featureValue is now in a higher class than the current class.
        // case goes under the radar for simplicity
        return ComparedFeatureType.GONE_WORSENED;
      }
    } 
    if (featureValue === currentClass && featureDiffValue !== 0) {
      // featureValue is now in the same class as the current class,
      // but was before (old analysis) in another class.
      
      if (featureDiffValue > 0) {
        // class before was lower than the current class
        return ComparedFeatureType.NEW_WORSENED
      }

      if (featureDiffValue < 0) {
        // class before was higher than the current class
        // case goes under the radar for simplicity
        return ComparedFeatureType.NEW_IMPROVED
      }
    }

    return ComparedFeatureType.NO_CHANGE;
  }
}
