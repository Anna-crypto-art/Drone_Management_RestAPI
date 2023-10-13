import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { Style, Stroke, Fill } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";
import { PvComponentLayer } from "./abstract/pv-component-layer";

export class ModuleComponentLayer extends PvComponentLayer {
  public readonly componentId = ApiComponent.PV_MODULE;
  protected readonly color = LayerColor.darkGrey;
  public readonly allowRefMeasures = true;
  public readonly minZoomLevel = 19;
  
  protected showPcsZoomLevel = 21.5;
  public zIndex = 4;
  protected width = 1;

  public readonly name = "pv-module";

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      fill: new Fill({
        color: LayerColor.romanticRain,
      }),
      text: this.showText(feature),
    });
  }
}

