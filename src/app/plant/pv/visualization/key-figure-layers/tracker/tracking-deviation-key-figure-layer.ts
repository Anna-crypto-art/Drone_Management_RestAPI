import { TrackerKeyFigureLayer } from "./abstract/tracker-key-figure-layer";

export class TrackingDeviationKeyFigureLayer extends TrackerKeyFigureLayer {
  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  public getClassLimits(): number[] {
    return this.analysisResult.pv!.tracker_deviation_class_limits;
  }

  public getQueryClass(): 1 | 2 | 3 | undefined {
    return this.query?.tracker_deviation_class
  }

  protected getLegendName(): string {
    if (this.query?.undefined === 1) {
      return this.vueComponent.$t("not-measured").toString();
    }

    return this.vueComponent.$t(
      "alignment-offset-class-" + this.getQueryClass(),
      { 
        limit0: this.getClassLimits()[0],
        limit1: this.getClassLimits()[1],
        unit: "°",
      },
    ).toString();
  }
}