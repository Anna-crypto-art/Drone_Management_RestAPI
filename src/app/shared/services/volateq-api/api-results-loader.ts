import { AnalysisResultCspPtcSchemaBase } from "./api-schemas/analysis-result-csp-ptc-schema-base";
import volateqApi from "./volateq-api";

export class ApiResultsLoader {
  private readonly loadedResults: Record<string, Record<string, AnalysisResultCspPtcSchemaBase[]>> = {};

  public async loadResults<T extends AnalysisResultCspPtcSchemaBase>(analysisResultId: string, componentKeyFigureId: string): Promise<void>
  {
    if (!(analysisResultId in this.loadedResults)) {
      this.loadedResults[analysisResultId] = {};
    }
    if (!(componentKeyFigureId in this.loadedResults[analysisResultId])) {
      this.loadedResults[analysisResultId][componentKeyFigureId] = await volateqApi.getAllSpecificAnalysisResult<T>(
        analysisResultId, componentKeyFigureId);
    }
  }

  public getResults<T extends AnalysisResultCspPtcSchemaBase>(analysisResultId: string, componentKeyFigureId: string): T[] | undefined {
    return (analysisResultId in this.loadedResults && componentKeyFigureId in this.loadedResults[analysisResultId] && 
      this.loadedResults[analysisResultId][componentKeyFigureId] as T[]) || undefined
  }
}

const apiResultsLoader = new ApiResultsLoader();

export default apiResultsLoader;