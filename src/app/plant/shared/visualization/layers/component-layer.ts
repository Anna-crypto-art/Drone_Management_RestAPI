import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { LayerBase } from "./layer-base";
import { FeatureLike } from "ol/Feature";

export abstract class ComponentLayer extends LayerBase {
  protected abstract readonly componentId: AnalysisResultComponent;

  protected getPcs(feature: FeatureLike): string {
    return feature.get("name");
  }

  protected getName(): string {
    return this.vueComponent.$t(this.name).toString();
  }

  public load(): Promise<Record<string, unknown>> {
    return volateqApi.getComponentsGeoVisual(this.vueComponent.plant.id, [this.componentId]);
  }
}
