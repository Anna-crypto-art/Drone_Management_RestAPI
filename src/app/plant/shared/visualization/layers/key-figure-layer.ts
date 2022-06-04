import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { GEO_JSON_OPTIONS, LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo, OrthoImage } from "./types";
import { FeatureInfo, FeatureInfos, FeatureProperties, Legend, IPlantVisualization, FeatureAction, PropsFeature } from "../types";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import Vue from "vue";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { VectorGeoLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { Geometry, SimpleGeometry } from "ol/geom";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { State } from "ol/render";
import * as ExtentFunctions from "ol/extent";
import { Style } from "ol/style";

export abstract class KeyFigureLayer<T extends AnalysisResultSchemaBase> extends LayerBase {
  protected abstract readonly analysisResultMapping: AnalysisResultMappings<T>;
  protected readonly name: string;

  protected abstract get color(): string;
  protected colorScheme = KeyFigureColorScheme.TRAFFIC_LIGHT;
  protected enableCompare = false;
  protected compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  protected orthoImages: OrthoImage[] | null = null;

  protected geoJSON?: {
    type: string;
    features: PropsFeature[];
    custom: { components_total_count: number; mirrors_per_sce?: number };
  };

  constructor(
    vueComponent: Vue & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    protected readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: GeoVisualQuery,
    protected readonly initColor?: KeyFigureColors,
    selected?: boolean,
  ) {
    super(vueComponent);

    if (selected !== undefined) {
      this.selected = selected;
    }

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
            const featureInfos = this.mapResultToFeatureInfos(result);

            this.addShowOrthoImageActions(featureInfos);

            return featureInfos;
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

  protected getVectorGeoLayer(): VectorGeoLayer {
    return this.vueComponent.openLayers!.getMap().getAllLayers().find(layer => layer.getProperties()['id'] === this.id) as VectorGeoLayer;
  }

  protected setOrthoImageAvailable() {
    if (this.orthoImages !== null) {
      for (const orthoImage of this.orthoImages) {
        orthoImage.available = !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === orthoImage.keyFigureId);
      }
    }
  }

  protected addShowOrthoImageActions(featureInfos: FeatureInfos | undefined) {
    if (featureInfos && this.orthoImages) {
      const actions: FeatureAction[] = this.orthoImages.filter(orthoImage => orthoImage.available)
        .map(orthoImage => ({
          name: orthoImage.name,
          action: async () => {
            await this.loadOrthoImage(orthoImage, featureInfos);
          }
        }));
      
      if (actions.length > 0) {
        featureInfos.actions = {
          name: this.vueComponent.$t("show-ortho-image").toString(),
          buttonVariant: 'secondary',
          actions: actions,
        };
      }
    }

    return featureInfos;
  }

  protected async loadOrthoImage(orthoImage: OrthoImage, featureInfos: FeatureInfos): Promise<void> {
    const geoJSON = await volateqApi.getKeyFiguresGeoVisual(
      this.vueComponent.plant.id,
      this.analysisResult.id,
      orthoImage.keyFigureId,
      {
        child_component_id: this.keyFigure.component_id,
        child_pcs: featureInfos.title
      }
    );

    const features: Feature<Geometry>[] = new GeoJSON(GEO_JSON_OPTIONS).readFeatures(geoJSON)

    if (!orthoImage.features) {
      orthoImage.features = [];
    }
    orthoImage.features.push(...features);

    for (const feature of features) {
      this.setImageFeatureStyle(feature);
    }
    
    const vectorGeoLayer = this.getVectorGeoLayer();
    vectorGeoLayer.getSource()!.addFeatures(features);

    this.vueComponent.hideToast();
  }

  protected setImageFeatureStyle(feature: Feature<Geometry>) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      feature.setStyle(
        new Style({
          renderer: (pixelCoordinates, state: State): void => {
            const ctx = state.context;
            const geometry = state.geometry.clone() as SimpleGeometry;
            geometry.setCoordinates(pixelCoordinates);
            // image rotation will come in the future... may be
            // geometry.rotate(-state.rotation - (feature.get("rotation") || 0), [0, 0]);
            const extent = geometry.getExtent();

            const width = ExtentFunctions.getWidth(extent);
            const height = ExtentFunctions.getHeight(extent);
            const bottomLeft = ExtentFunctions.getBottomLeft(extent);
            const bottom = bottomLeft[1];
            const left = bottomLeft[0];

            // const drawRotation = (feature.get("rotation") ?? 0) + state.rotation;

            ctx.save();
            // ctx.rotate(drawRotation);
            ctx.drawImage(img, left, bottom, width, height);
            ctx.restore();
          },
          zIndex: -1,
        })
      );
    };

    img.src = feature.get("image");
  }

  public removeOrthoImageFeatures() {
    if (this.orthoImages) {
      for (const orthoImage of this.orthoImages) {
        if (orthoImage.features) {
          for (const feature of orthoImage.features) {
            this.getVectorGeoLayer().getSource()!.removeFeature(feature);
          }

          orthoImage.features = undefined;
        }
      }
    }
  }
}
