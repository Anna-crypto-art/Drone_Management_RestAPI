import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { FeatureInfos, IPlantVisualization } from "../types";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";

export abstract class ComponentLayer extends LayerBase {
  protected abstract readonly componentId: ApiComponent;

  protected readonly allowRefMeasures = false;
  protected onAddRefMeasureCallback: ((fieldgeoComponent: FieldgeometryComponentSchema) => void) | undefined = undefined;

  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
    protected readonly refMeasuredPcsCodes: string[],
  ) {
    super(vueComponent);

    this.created();
  }

  public onAddReferenceMeasurement(callback: (fieldgeoComponent: FieldgeometryComponentSchema) => void) {
    if (this.allowRefMeasures) {
      this.onAddRefMeasureCallback = callback;
    }
  }

  protected created(): void {/* override me */}
  public get id(): string | undefined {
    return this.name;
  }

  protected getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  protected getName(): string {
    return this.vueComponent.$t(this.name).toString();
  }

  public async load(): Promise<Record<string, unknown> | undefined> {
    try {
      return volateqApi.getComponentsGeoVisual(this.vueComponent.plant.id, [this.componentId]);
    } catch (e) {
      this.vueComponent.showError(e);
    }

    return undefined;
  }

  public async onClick(
    features: FeatureLike[],
    fieldgeoComponent: FieldgeometryComponentSchema | undefined
  ): Promise<FeatureInfos | undefined> { 
    if (!this.allowRefMeasures || !this.isVisible || !this.selected) {
      return undefined;
    }

    const layer = this.getVectorGeoLayer()!;
    const feature = features.find(feature => 
      layer.getSource()?.getFeatures().find(layerFeature => layerFeature.get('name') === feature.get('name')));

    if (!feature) {
      return undefined;
    }

    const pcs = this.getPcs(feature)!;

    if (this.refMeasuredPcsCodes.includes(pcs)) {
      // TODO: load ref measure entry by pcs code
    }

    if (!fieldgeoComponent) {
      fieldgeoComponent = await volateqApi.getFieldgeometryComponent(
        this.vueComponent.plant.fieldgeometry!.id,
        pcs,
      )
    }

    if (fieldgeoComponent.component_id !== this.componentId) {
      return undefined;
    }

    return {
      title: pcs,
      records: [],
      actionsSummaries: [
        { 
          buttonVariant: "secondary",
          name: this.vueComponent.$t("add-reference-measurement").toString(),
          actions: [
            {
              name: this.vueComponent.$t("add-reference-measurement").toString(),
              action: async () => {
                this.onAddRefMeasureCallback && this.onAddRefMeasureCallback(fieldgeoComponent!);
              }
            }
          ]
        }
      ]
    }
  }
}
