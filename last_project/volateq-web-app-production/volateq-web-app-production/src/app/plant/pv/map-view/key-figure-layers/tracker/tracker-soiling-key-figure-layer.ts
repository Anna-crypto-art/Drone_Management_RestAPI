import { TrackerKeyFigureLayer } from "./abstract/tracker-key-figure-layer";

export class TrackerSoilingKeyFigureLayer extends TrackerKeyFigureLayer {
  protected getColor(): string {
    return this.getClassColor(this.query!.tracker_soiling_level);
  }
}