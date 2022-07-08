import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";

export class LoopComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_LOOP;
  public readonly name = "loop";

  protected showPcsZoomLevel = 16;
  protected zIndex = 2;

  protected width = 1;

  private refMeasureRunning = false;
  private onClickCallback: ((pcs: string) => Promise<void>) | null = null;

  public getStyle(feature: FeatureLike): Style {
    const props = feature.getProperties();
    
    let width = this.width;
    let color = "#888888";

    if ("value" in props) {
      width = 2;
      if (props["value"] === "inlet") {
        color = "#0000FF";
      } else if (props["value"] === "outlet") {
        color = "#FF0000";
      }
    }

    return new Style({
      stroke: new Stroke({ color, width }),
      text: this.showText(feature),
    });
  }

  public async onClick(features: FeatureLike[]): Promise<void> {
    if (this.refMeasureRunning) {
      for (const feature of features) {
        const pcs = this.getPcs(feature);
        if (pcs) {
          await this.onClickCallback!(pcs);
          break;
        }
      }
    }
  }

  public startReferenceMeasurement(onClickCallback: (pcs: string) => Promise<void>) {
    this.onClickCallback = onClickCallback;
    this.refMeasureRunning = true;

    this.width = 5;

    this.reloadLayer();
    if (this.selected) {
      this.setSelected(false);
    }
    this.setSelected(true);
  }

  public finishReferenceMeasurement() {
    this.onClickCallback = null;
    this.refMeasureRunning = false;

    this.width = 1;

    this.reloadLayer();
    if (this.selected) {
      this.setSelected(false);
    }
    this.setSelected(true);
  }
}
