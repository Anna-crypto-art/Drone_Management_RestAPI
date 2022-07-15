import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";

export class AbsorberComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_ABSORBER;
  public readonly name = "absorber-tubes";

  protected showPcsZoomLevel = 19.5;
  protected zIndex = 5;

  protected width = 1;

  private refMeasureRunning = false;
  private onClickCallback: ((pcs: string) => Promise<void>) | null = null;

  private coloredPcsCodes: string[] | null = null;

  public load(): Promise<Record<string, unknown> | undefined> {
    this.onZoom((zoomlevel) => {
      console.log(zoomlevel)

      if (this.refMeasureRunning && zoomlevel) {
        if (zoomlevel < 18) {
          this.width = 5;
        } else if (zoomlevel >= 18 && zoomlevel < 19) {
          this.width = 10;
        } else if (zoomlevel >= 19 && zoomlevel < 20) {
          this.width = 20;
        } else if (zoomlevel >= 20) {
          this.width = 30;
        }
      }
    });

    return super.load();
  }

  public getStyle(feature: FeatureLike): Style {
    const color = this.coloredPcsCodes && this.coloredPcsCodes.find(pcs => pcs === this.getPcs(feature)) ? 
      KeyFigureColors.volateqBlue :
      KeyFigureColors.black

    return new Style({
      stroke: new Stroke({
        color: color,
        width: this.width,
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }

  public async onClick(feature: FeatureLike): Promise<void> {
    if (this.refMeasureRunning) {
      const pcs = this.getPcs(feature);
      
      if (pcs) {
        await this.onClickCallback!(pcs);
      }
    }
  }

  public startReferenceMeasurement(existingPcsCodes: string[], onClickCallback: (pcs: string) => Promise<void>) {
    this.onClickCallback = onClickCallback;
    this.refMeasureRunning = true;
    this.coloredPcsCodes = existingPcsCodes;

    this.width = 5;

    this.rerender();
  }

  public finishReferenceMeasurement() {
    this.onClickCallback = null;
    this.refMeasureRunning = false;
    this.coloredPcsCodes = null;

    this.width = 1;

    this.rerender();
  }

  public changeColor(pcs: string) {
    this.coloredPcsCodes?.push(pcs);

    this.rerender();
  }
}
