import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { Style, Stroke, Fill } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { layerEvents } from "@/app/plant/shared/visualization/layer-events";
import { Geometry } from "ol/geom";
import { Feature } from "ol";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";
import { PvComponentLayer } from "./abstract/pv-component-layer";

export class TrackerComponentLayer extends PvComponentLayer {
  public readonly componentId = ApiComponent.PV_TRACKER;
  protected readonly color = LayerColor.darkGrey;
  protected readonly allowRefMeasures = true;
  
  protected showPcsZoomLevel = 18.5;
  protected zIndex = 3;
  protected disabled = true;
  protected width = 1;

  public readonly name = "pv-tracker";
  public readonly selected = true;
  public readonly autoZoom = true;

  protected created(): void {
    super.created();

    layerEvents.onOrthoImageLoaded((features: Feature<Geometry>[]) => {
      const vectorGeoLayer = this.getVectorGeoLayer();
      vectorGeoLayer?.getSource()!.addFeatures(features);
    });

    layerEvents.onRemoveOrthoImages((features: Feature<Geometry>[]) => {
      const layerSource = this.getVectorGeoLayer()?.getSource();
      if (layerSource) {
        for (const feature of features) {
          layerSource.removeFeature(feature);
        }
      }
    });
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      fill: new Fill({
        color: LayerColor.metallicBlue,
      }),
      text: this.showText(feature),
    });
  }
}
