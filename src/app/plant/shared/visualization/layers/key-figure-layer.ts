import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { LayerColor, KeyFigureColorScheme, KeyFigureInfo, OrthoImage, KeyFigureGeoJSON } from "./types";
import { FeatureInfo, FeatureInfos, FeatureProperties, IPlantVisualization, PropsFeature, FeatureActionsSummary, ComparedFeatureType, ComparedFeatures, FeatureInfosMeta } from "../types";
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
import { Stroke, Style } from "ol/style";
import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase, Q extends GeoVisualQuery> extends LayerBase implements IOrthoImageMixin {
  protected abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  protected readonly name: string;
  protected readonly description?: string;
  public readonly noTransName: string;

  public colorScheme = KeyFigureColorScheme.TRAFFIC_LIGHT;
  public enableCompare = false;
  public compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  protected readonly orhtoImageMixin: OrhtoImageMixin;
  public orthoImages: OrthoImage[] | null = null;

  protected readonly refMeasureFeatureStrokeWidth: number = 3;
  protected readonly refMeasureFeatureStrokeWidthAddOnZoom: number = 6;

  public geoJSON?: KeyFigureGeoJSON;

  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    public readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: Q,
    protected readonly initColor?: LayerColor,
    public readonly invisibleAutoSelection?: boolean,
  ) {
    super(vueComponent);

    this.visible = false;

    this.noTransName = this.keyFigureInfo.displayName || this.keyFigureInfo.keyName || "";
    this.name = this.keyFigureInfo.templateName || this.vueComponent.$t(this.noTransName).toString();

    this.description = this.keyFigureInfo.description;
    this.zIndex = this.keyFigureInfo.zIndex || 9; // 9 - to make sure PIs overlay components, always

    this.orhtoImageMixin = new OrhtoImageMixin(this);

    this.created();
  }

  protected created(): void {/* override me */}

  protected getAddStyles(feature: FeatureLike): Style[] | undefined {
    const pcs = this.getPcs(feature);
    if (pcs && this.vueComponent.refMeasuredPcsCodes.includes(pcs)) {
      return [new Style({
        stroke: new Stroke({
          width: this.zoomWidth ? this.zoomWidth + this.refMeasureFeatureStrokeWidthAddOnZoom : this.refMeasureFeatureStrokeWidth,
          color: LayerColor.volateqBlue,
        }),
      })];
    }

    return super.getAddStyles(feature);
  }

  public isOrthoImageAvailable(orthoImage: OrthoImage): boolean {
    return this.orhtoImageMixin.isOrthoImageAvailable(orthoImage);
  }

  protected getDescription(): string | undefined {
    return this.description && this.vueComponent.$t(this.description).toString();
  }

  public getLegendId(): string {
    return `${this.analysisResult.id}__${this.keyFigureId}__${this.noTransName || this.keyFigureInfo.templateName || ""}`;
  }

  protected getLegendName(): string {
    return this.vueComponent.$t(this.noTransName).toString()
  }

  protected async onSelected(selected: boolean): Promise<void> {
    await super.onSelected(selected);

    console.log("onSelected")
    console.log(this.id)
    console.trace();

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

      let recordValue: string | undefined | null = (resultItem[entry.transName] as any)?.toString();
      if (recordValue === undefined || recordValue === null) {
        recordValue = "";
      }

      recordFeatureInfos.push(mappingHelper.toFeatureInfo(entry, recordValue, this.keyFigureId));
    }

    const featureInfos: FeatureInfos = {
      title: result.fieldgeometry_component.kks,
      groups: [{ title: this.vueComponent.$t("performance-indicators").toString(), records: recordFeatureInfos }],
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

  public async load(): Promise<GeoJSON<PropsFeature> | undefined> {
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

  public async onClick(feature: FeatureLike, featureInfosMeta: FeatureInfosMeta): Promise<FeatureInfos | undefined> {
    if (!this.isVisible || !this.selected) {
      return undefined;
    }

    if (featureInfosMeta.fieldgeoComponent && featureInfosMeta.fieldgeoComponent.component_id !== this.keyFigure.component.id) {
      return undefined;
    }

    const result = await this.getResultDetails(feature);
    if (!result) {
      return undefined;
    }

    if (!featureInfosMeta.fieldgeoComponent) {
      featureInfosMeta.fieldgeoComponent = result.fieldgeometry_component;

      if (featureInfosMeta.fieldgeoComponent.component_id !== this.keyFigure.component.id) {
        return undefined;
      }
    }

    let featureInfos = this.mapResultToFeatureInfos(result);

    const refFeatureInfos = await this.getRefMeasureFeatureInfos(featureInfosMeta, this.analysisResult.analysis_id);

    if (!featureInfos) {
      featureInfos = refFeatureInfos
    } else if (refFeatureInfos) {
      featureInfos.groups.push(...refFeatureInfos.groups);
      if (!featureInfos.actionsSummaries) {
        featureInfos.actionsSummaries = refFeatureInfos.actionsSummaries;
      } else {
        featureInfos.actionsSummaries.push(...refFeatureInfos.actionsSummaries!);
      }
    }

    this.orhtoImageMixin.addShowOrthoImageActions(featureInfos, this.keyFigure.component_id);

    if (this.vueComponent.enableResultsModification) {
      await this.addResultsModificationFeatureAction(featureInfos!);
    }

    return featureInfos;
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
    return `${this.analysisResult.id}__${this.keyFigureId}__${
      this.noTransName || this.keyFigureInfo.templateName
    }`;
  }

  protected get keyFigure(): KeyFigureSchema {
    return this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId)!;
  }

  public getLegendEntryCount(featureCount?: number, precision = 100): string {
    
    featureCount = featureCount !== undefined ? featureCount : this.geoJSON!.features.length;
    const totalCount = this.geoJSON!.custom.components_total_count;

    let percentage = Math.round((featureCount / totalCount) * 100 * precision) / precision;
    if (percentage === 0 && featureCount > 0) {
      percentage = Math.round((featureCount / totalCount) * 100 * (precision * 10)) / (precision * 10);
    }

    return ` (<b>${percentage.toString()}%</b> - <small>${featureCount}</small>)`;
  }

  public removeOrthoImageFeatures() {
    this.orhtoImageMixin.removeOrthoImageFeatures();
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
      });
      actionsSummary.actions.push({
        name: this.vueComponent.$t("set-to-true").toString(),
        action: async () => {
          await this.modfiyFeatureResultAction(featureInfos, "true");
        }
      });
    }

    featureInfos.actionsSummaries.push(actionsSummary);
  }

  private async modfiyFeatureResultAction(featureInfos: FeatureInfos, newValue: "null" | "false" | "true") {
    if (!confirm(this.vueComponent.$t("apply-are-you-sure").toString())) {
      return;
    }

    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult);
    const entry = this.getMappingEntry();

    await volateqApi.setAnalysisResultValueToNullOrFalseOrTrue(this.analysisResult.id, {
      key_figure_id: this.keyFigureId,
      kks: featureInfos.title!,
      property_name: entry ? mappingHelper.getPropertyName(entry) : undefined,
      new_value: newValue,
    });

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
      return LayerColor.red;
    }

    throw new Error("Unexpected colorScheme: " + this.colorScheme);
  }

  public getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(LayerColor.green, 0.3);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.5);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      if (classValue === 1) {
        return LayerColor.green;
      }
      
      if (classValue === 2) {
        return LayerColor.yellow;
      }
    }

    return this.color!;
  }

  protected getLegendEntryTransName(
    transClassName: string,
    classLimits: number[] | null,
    currentClass: 1 | 2 | 3 | undefined,
    unit: string
  ): string {
    if (!currentClass) {
      return this.vueComponent.$t(this.noTransName).toString();
    }

    let limitRange = "";
    if (classLimits) {
      if (currentClass === 1) {
        limitRange = `0${unit} - ${classLimits[0]}${unit}: `;
      } else if (currentClass === 2) {
        limitRange = `${classLimits[0]}${unit} - ${classLimits[1]}${unit}: `;
      } else if (currentClass === 3) {
        limitRange = `${classLimits[1]}${unit} - &infin;${unit}: `;
      }
    }

    return limitRange + this.vueComponent.$t(transClassName + "-" + currentClass).toString();
  }

  public getDiffColorByComparedFeatureType(comparedFeatureType: ComparedFeatureType): string {
    switch (comparedFeatureType) {
      case ComparedFeatureType.NEW_IMPROVED:
      case ComparedFeatureType.NO_CHANGE:
        return LayerColor.black;

      case ComparedFeatureType.GONE_IMPROVED:
        return LayerColor.strongGreen;

      case ComparedFeatureType.NEW_WORSENED:
        return LayerColor.red;

      case ComparedFeatureType.GONE_WORSENED:
        return this.getColorWithAlpha('#fff', 0); // transparent -> invisible

      case ComparedFeatureType.UNDEFINED:
        return LayerColor.grey;
    }
  }

  public getComparedFeatures(currentClass: number): ComparedFeatures {
    const comparedFeatures: ComparedFeatures = {
      [ComparedFeatureType.NO_CHANGE]: [],
      [ComparedFeatureType.GONE_IMPROVED]: [],
      [ComparedFeatureType.GONE_WORSENED]: [],
      [ComparedFeatureType.NEW_IMPROVED]: [],
      [ComparedFeatureType.NEW_WORSENED]: [],
      [ComparedFeatureType.UNDEFINED]: [],
    };

    for (const propFeature of this.geoJSON!.features) {
      const comparedFeatureType = this.getComparedFeatureType(propFeature.properties, currentClass);
      comparedFeatures[comparedFeatureType].push(propFeature);
    }

    return comparedFeatures;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    const featureValue: number | null = properties.value! as (number | null);
    const featureDiffValue: number = properties.diff_value! as number;

    if (featureValue === null) {
      return ComparedFeatureType.UNDEFINED;
    }

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
