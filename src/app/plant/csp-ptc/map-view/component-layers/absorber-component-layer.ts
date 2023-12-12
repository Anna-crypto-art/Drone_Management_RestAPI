import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/map-view/layers/types";
import { ComponentLayer } from "@/app/plant/shared/map-view/layers/component-layer";

export class AbsorberComponentLayer extends ComponentLayer {
  public readonly componentId = ApiComponent.CSP_PTC_ABSORBER;
  protected readonly color = LayerColor.white;
  public readonly allowRefMeasures = true;
  public readonly name = "absorber-tubes";
  protected readonly width = 3;
  public readonly minZoomLevel = 18;

  protected showPcsZoomLevel = 19.5;
  public zIndex = 5;

  protected zoomWidths = {
    18: 10,
    18.5: 15,
    19: 20,
    19.5: 25,
    20: 30,
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth() - 3,
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }

  protected getAddStyles(feature: FeatureLike): Style[] | undefined {
    return [new Style({
      stroke: new Stroke({
        color: LayerColor.black,
        width: this.getWidth(),
      }),
    })];
  }
}