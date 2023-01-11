import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { layerEvents } from "@/app/plant/shared/visualization/layer-events";
import { Geometry } from "ol/geom";
import { Feature } from "ol";

export class TrackerComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.PV_TRACKER;

  protected showPcsZoomLevel = 16.5;
  protected zIndex = 3;

  public readonly name = "pv-tracker";
  public readonly selected = true;
  public readonly autoZoom = true;

  protected created(): void {
    layerEvents.onOrthoImageLoaded((features: Feature<Geometry>[]) => {
      const vectorGeoLayer = this.getVectorGeoLayer();
      vectorGeoLayer.getSource()!.addFeatures(features);
    });

    layerEvents.onRemoveOrthoImages((features: Feature<Geometry>[]) => {
      const layerSource = this.getVectorGeoLayer().getSource()!;
      for (const feature of features) {
        layerSource.removeFeature(feature);
      }
    });
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: "#888888",
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}
