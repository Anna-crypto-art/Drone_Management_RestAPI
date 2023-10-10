import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultMappingEntry, AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { keyFigureRainbowColors } from "./key-figure-colors";
import { Stroke, Style } from "ol/style";
import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";
import { BaseLayer } from "./base-layer";
import { i18n } from "@/main";
import { ComparedFeatureType, ComparedFeatures, KeyFigureColorScheme, KeyFigureGeoJSON, KeyFigureLayerOptions, LayerColor, LayerEvent } from "./types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureInfos, FeatureProperties, PropsFeature } from "../types";
import { RefMeasureLayersService } from "./ref-measure-layers-service";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase, Q extends GeoVisualQuery> extends BaseLayer {
  public abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  
  public readonly name: string;

  public colorScheme = KeyFigureColorScheme.TRAFFIC_LIGHT;
  public enableCompare = false;
  public compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  protected readonly refMeasureFeatureStrokeWidth: number = 3;
  protected readonly refMeasureFeatureStrokeWidthAddOnZoom: number = 6;

  public geoJSON?: KeyFigureGeoJSON;

  constructor(
    plant: PlantSchema,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    public readonly keyFigureId: ApiKeyFigure,
    public readonly options: KeyFigureLayerOptions,
    public readonly query?: Q,
    protected readonly initColor?: LayerColor,
    public readonly invisibleAutoSelection?: boolean,
  ) {
    super(plant);

    this.visible = false;

    this.name = this.options.displayName || this.options.keyName || "";

    this.description = this.options.description && i18n.t(this.options.description).toString();
    this.zIndex = this.options.zIndex || 9; // 9 - to make sure PIs overlay components, always

    this.created();
  }

  public getDisplayName(): string {
    return i18n.t(this.name).toString();
  }

  protected created(): void {/* override me */}

  protected getAddStyles(feature: FeatureLike): Style[] | undefined {
    const pcs = this.getPcs(feature);
    if (pcs && RefMeasureLayersService.get(this.plant, this.appLayerCheckbox!.map).hasPCS(pcs)) {
      return [new Style({
        stroke: new Stroke({
          width: this.zoomWidth ? this.zoomWidth + this.refMeasureFeatureStrokeWidthAddOnZoom : this.refMeasureFeatureStrokeWidth,
          color: LayerColor.volateqBlue,
        }),
      })];
    }

    return super.getAddStyles(feature);
  }

  public get id(): string {
    return `${this.analysisResult.id}__${this.keyFigureId}__${this.name}`;
  }

  public getLegendId(): string {
    return this.id;
  }

  protected getLegendName(): string {
    return this.getDisplayName();
  }

  protected async emitOnSelected() {
    if (this.invisibleAutoSelection) {
      this.events.emit(LayerEvent.ON_INV_AUTO_SELECT_SELECTED, this);
    } else {
      await super.emitOnSelected();
    }
  }

  public getMappingEntry(): AnalysisResultMappingEntry<T> | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(this.analysisResultMapping, this.analysisResult!);
    return mappingHelper.getEntries().find(entry => entry.transName === this.options.keyName);
  }

  public getUnit(): string {
    return this.getMappingEntry()?.unit || "";
  }

  public getProperties(feature: FeatureLike): FeatureProperties {
    return feature.getProperties() as FeatureProperties;
  }

  public getMoreSpecificAnalysisResultParams(): TableRequest {
    return {};
  }

  public modifyFeatureInfos(featureInfos: FeatureInfos, result: T) {
    return;
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

  public getPcs(feature: FeatureLike): string | undefined {
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
          this.plant.id,
          this.analysisResult.id,
          this.compareAnalysisResult.id,
          this.keyFigure.id,
          this.query
        )
      } else {
        this.geoJSON = await volateqApi.getKeyFiguresGeoVisual(
          this.plant.id,
          this.analysisResult.id,
          this.keyFigure.id,
          this.query
        );
      }
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    }

    return this.geoJSON;
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

  public setShowCouldNotBeMeasured(showCouldNotBeMeasured: boolean) {
    if (this.query?.undefined !== undefined && !this.invisibleAutoSelection) {
      this.query.undefined = showCouldNotBeMeasured ? 1 : 0;
    }
  }

  public hasKeyFigureForCompareAnalysisResult(): boolean {
    if (this.isCompareEnabled && this.compareAnalysisResult) {
      return !!(this.analysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId) &&
        this.compareAnalysisResult.key_figures.find(keyFigure => keyFigure.id === this.keyFigureId));
    }

    return false;
  }

  public get keyFigure(): KeyFigureSchema {
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
      this.getLegendName();
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

    return limitRange + i18n.t(transClassName + "-" + currentClass).toString();
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

  public getLimitsDisplayName(classLimit: number | undefined, offsetClassLimits: number[] | undefined, unit: string): string {
    if (offsetClassLimits) {
      if (classLimit === 1) {
        return i18n.t("less-than-limit", { limit0: offsetClassLimits[0], unit }).toString();
      }
      if (classLimit === 2) {
        return i18n.t("in-between-limits", {
          limit1: offsetClassLimits[1],
          limit0: offsetClassLimits[0],
          unit,
        }).toString();
      }
      if (classLimit === 3) {
        return i18n.t("exceeds-limit", {
          limit1: offsetClassLimits[1],
          unit,
        }).toString();
      }
    }

    return "";
  }
}
