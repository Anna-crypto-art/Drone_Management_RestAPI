import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ReferenceMeasurementSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { OrhtoImageMixin } from "../mixins/ortho-image-mixin";
import { IOrthoImageMixin } from "../mixins/types";
import { FeatureInfos, FeatureInfosMeta, IPlantVisualization, Legend } from "../types";
import { LayerBase } from "./layer-base";
import { LayerColor, OrthoImage } from "./types";

export class ReferenceMeasurementLayer extends LayerBase implements IOrthoImageMixin {
  protected zIndex = 20;

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

  protected async onSelected(selected: boolean): Promise<void> {
    super.onSelected(selected);

    await this.vueComponent.onLayerSelected(selected, this.getLegend());
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

  protected getLegend(): Legend | undefined {
    const features = this.getVectorGeoLayer()?.getSource()?.getFeatures() || [];

    return {
      id: "legend-" + this.id,
      entries: [
        {
          color: LayerColor.volateqBlue,
          name: features.length + " " + this.vueComponent.$t("reference-measurements").toString(),
        }
      ],
      merge: {
        name: this.vueComponent.$t("reference-measurements").toString(),
        count: features.length,
      }
    };
  }

  public async onClick(feature: FeatureLike, featureInfosMeta: FeatureInfosMeta): Promise<FeatureInfos | undefined> {
    if (!this.selected) {
      return undefined;
    }

    const pcs = this.getPcs(feature);
    if (!pcs) {
      return undefined;
    }

    if (!featureInfosMeta.fieldgeoComponent) {
      featureInfosMeta.fieldgeoComponent = await volateqApi.getFieldgeometryComponent(
        this.vueComponent.plant.fieldgeometry!.id,
        pcs,
      );
    }

    const featureInfos = await this.getRefMeasureFeatureInfos(featureInfosMeta, this.analysis.id)
    
    this.orhtoImageMixin.addShowOrthoImageActions(featureInfos, featureInfosMeta.fieldgeoComponent.component_id);

    return featureInfos;
  }
}