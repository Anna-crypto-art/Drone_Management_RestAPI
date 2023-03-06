import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { ReferenceMeasurementSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { IOrthoImageMixin } from "../mixins/types";
import { FeatureInfo, FeatureInfos, IPlantVisualization } from "../types";
import { LayerBase } from "./layer-base";
import { LayerColor, OrthoImage } from "./types";

export class ReferenceMeasurementLayer extends LayerBase implements IOrthoImageMixin {
  protected zIndex = 9;

  public orthoImages: OrthoImage[] | null = null;

  private readonly orhtoImageMixin: OrhtoImageMixin;

  constructor(
    public readonly vueComponent: BaseAuthComponent & IPlantVisualization,
    public readonly analysis: AnalysisForViewSchema,
    public readonly referenceMeasurement: ReferenceMeasurementSchema,
  ) {
    super(vueComponent);

    this.orhtoImageMixin = new OrhtoImageMixin(this);
  }

  public get analysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysis.analysis_result || null;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public get id(): string | undefined {
    return `reference-measurement-${this.referenceMeasurement.id}`;
  }

  protected get name(): string {
    const user = this.referenceMeasurement.user_created
    const userName = (user.first_name + " " + user.last_name).trim() || user.email;

    let notes = this.referenceMeasurement.notes || "";
    if (notes.length > 20) {
      notes = notes.substring(0, 30) + "...";
    }

    return userName + (notes ? " - " + notes : "")
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
        color: LayerColor.volateqBlue,
        width: 3,
      }),
    });
  }

  public async onClick(feature: FeatureLike, fieldgeoComponent?: FieldgeometryComponentSchema): Promise<FeatureInfos | undefined> {
    if (!this.selected) {
      return undefined;
    }

    const pcs = this.getPcs(feature);
    if (!pcs) {
      return undefined;
    }

    if (!fieldgeoComponent) {
      fieldgeoComponent = await volateqApi.getFieldgeometryComponent(
        this.vueComponent.plant.fieldgeometry!.id,
        pcs,
      );
    }

    const featureInfos = await this.getRefMeasureFeatureInfos(fieldgeoComponent, this.analysis.id)
    
    this.orhtoImageMixin.addShowOrthoImageActions(featureInfos, fieldgeoComponent.component_id);

    return featureInfos;
  }
}