import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ReferenceMeasurementSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { IOrthoImageMixin } from "../mixins/types";
import { FeatureInfo, FeatureInfos, IPlantVisualization } from "../types";
import { LayerBase } from "./layer-base";
import { KeyFigureColors, OrthoImage } from "./types";

export class ReferenceMeasurementLayer extends LayerBase implements IOrthoImageMixin {
  protected zIndex = 9;

  public orthoImages: OrthoImage[] | null = null;

  private readonly orhtoImageMixin: OrhtoImageMixin;

  constructor(
    public readonly vueComponent: BaseAuthComponent & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema | null,
    public readonly referenceMeasurement: ReferenceMeasurementSchema,
  ) {
    super(vueComponent);

    this.orhtoImageMixin = new OrhtoImageMixin(this);
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public get id(): string | undefined {
    return `reference-measurement-${this.referenceMeasurement.id}`;
  }

  protected get name(): string {
    let notes = this.referenceMeasurement.notes || "";
    if (notes.length > 20) {
      notes = notes.substring(0, 30) + "...";
    }

    return dateHelper.toDate(this.referenceMeasurement.measure_date) + 
      (notes ? " - " + notes : "")
  }

  protected async load(): Promise<Record<string, unknown> | undefined> {
    try {
      return await volateqApi.getReferenceMeasurementValuesGeoVisual(this.referenceMeasurement.id);
    } catch (e) {
      this.vueComponent.showError(e);
    }

    return undefined;
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: KeyFigureColors.volateqBlue,
        width: 3,
      }),
    });
  }

  public async onClick(features: FeatureLike[]): Promise<FeatureInfos | undefined> {
    if (this.selected) {
      for (const feature of features) {
        const childFeatureInfos: FeatureInfo[] = [];

        const hceTemperature: number | undefined = feature.get("hce_temperature");
        if (hceTemperature) {
          childFeatureInfos.push({
            name: this.vueComponent.$t("glass-tube-temperature").toString(),
            value: MathHelper.roundTo(hceTemperature, 2) + " °C",
          });
        }

        const hceBrokenGlass: true | undefined = feature.get("hce_broken_glass");
        if (hceBrokenGlass) {
          childFeatureInfos.push({
            name: this.vueComponent.$t("missing-gct").toString(),
            value: "true",
          });
        }

        const notes: string | undefined = feature.get("notes");
        if (notes) {
          childFeatureInfos.push({
            name: this.vueComponent.$t("notes").toString(),
            value: notes,
          });
        }
        
        if (childFeatureInfos.length > 0) {
          const featureInfos: FeatureInfos = {
            title: this.getPcs(feature)!,
            records: childFeatureInfos,
          };
          
          this.orhtoImageMixin.addShowOrthoImageActions(featureInfos)

          return featureInfos;
        }
      }
    }

    return undefined;
  }

  public getComponentId(): ApiComponent {
    return ApiComponent.CSP_PTC_ABSORBER;
  }

  protected getDescription(): string | undefined {
    return this.referenceMeasurement.notes;
  }
}