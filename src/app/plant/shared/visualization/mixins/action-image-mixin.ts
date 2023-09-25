import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { LayerBase } from "../layers/layer-base";
import { IActionImageMixin } from "./types";
import { BaseImageMixin } from "./base-image-mixin";

export class ActionImageMixin extends BaseImageMixin<IActionImageMixin> {
  constructor(layer: LayerBase & IActionImageMixin) {
    super(layer);

    this.layer.actionImages = [
      { keyFigureId: ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID, actionName: layer.vueComponent.$t("show-raw-ir-image").toString() },
    ];

    this.images = this.layer.actionImages;
  }
}