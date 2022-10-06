export interface ICompareClassLimitsKeyFigureMixin extends ICompareClassKeyFigureMixin {
  getClassLimits(): number[];
}

export interface ICompareClassKeyFigureMixin {
  getDiffLegendName(): string;
  getQueryClass(): number | undefined;
}