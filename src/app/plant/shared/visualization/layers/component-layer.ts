import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IPlantVisualization } from "../types";

export abstract class ComponentLayer extends LayerBase {
  protected abstract readonly componentId: ApiComponent;

  constructor(vueComponent: BaseAuthComponent & IPlantVisualization) {
    super(vueComponent);

    this.created();
  }

  protected created(): void {/* override me */}
  protected get id(): string | undefined {
    return this.name;
  }

  protected getPcs(feature: FeatureLike): string {
    return feature.get("name");
  }

  protected getName(): string {
    return this.vueComponent.$t(this.name).toString();
  }

  public async load(): Promise<Record<string, unknown>> {
    try {
      return volateqApi.getComponentsGeoVisual(this.vueComponent.plant.id, [this.componentId]);
    } catch (e) {
      this.vueComponent.showError(e);
    }

    return {};
  }
}
