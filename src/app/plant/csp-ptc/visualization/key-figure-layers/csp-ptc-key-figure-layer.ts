import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualCspPtcQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class CspPtcKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T, GeoVisualCspPtcQuery> {
  protected getLegendEntryTransName(
    transClassName: string,
    classLimits: number[] | null,
    currentClass: 1 | 2 | 3 | undefined,
    unit: string
  ): string {
    if (!currentClass) {
      return this.vueComponent.$t(this.keyFigureInfo.displayName!).toString();
    }

    let limitRange = "";
    if (classLimits) {
      if (currentClass === 1) {
        limitRange = `0${unit} - ${classLimits[0]}${unit}: `;
      } else if (currentClass === 2) {
        limitRange = `${classLimits[0]}${unit} - ${classLimits[1]}${unit}: `;
      } else if (currentClass === 3) {
        limitRange = `${classLimits[1]}${unit} - &infin;${unit}: `;
      }
    }

    return limitRange + this.vueComponent.$t(transClassName + "-" + currentClass).toString();
  }
}
