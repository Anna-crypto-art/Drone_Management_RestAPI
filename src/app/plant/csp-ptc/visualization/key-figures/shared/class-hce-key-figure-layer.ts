import { Legend } from "@/app/plant/shared/visualization/types";
import { HceKeyFigureLayer } from "./hce-key-figure-layer";

export class ClassHceKeyFigureLayer extends HceKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.getColor(),
          name: this.vueComponent.$t(this.getLegendName()).toString() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getColor(): string {
    const classValue =
      this.query?.glass_tube_temperature_class ||
      this.query?.ir_intensity_class ||
      this.query?.recommended_action_class;

    return this.getClassColor(classValue);
  }

  protected getLegendName(): string {
    return (this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!;
  }
}
