import { AnalysisResultCspPtcSchemaBase } from "./api-schemas/analysis-result-csp-ptc-schema-base";
import volateqApi from "./volateq-api";

export class ApiResultsLoader {
  private readonly loadedResults: Record<string, Record<string, AnalysisResultCspPtcSchemaBase[]>> = {};

  public async loadResults<T extends AnalysisResultCspPtcSchemaBase>(analysisResultId: string, componentId: number): Promise<void>
  {
    if (!(analysisResultId in this.loadedResults)) {
      this.loadedResults[analysisResultId] = {};
    }
    if (!(componentId in this.loadedResults[analysisResultId])) {
      this.loadedResults[analysisResultId][componentId] = await volateqApi.getAllSpecificAnalysisResult<T>(
        analysisResultId, componentId);
    }
  }

  public getResults<T extends AnalysisResultCspPtcSchemaBase>(analysisResultId: string, componentId: number): T[] | undefined {
    return (analysisResultId in this.loadedResults && componentId in this.loadedResults[analysisResultId] && 
      this.loadedResults[analysisResultId][componentId] as T[]) || undefined
  }
}

const apiResultsLoader = new ApiResultsLoader();

export default apiResultsLoader;