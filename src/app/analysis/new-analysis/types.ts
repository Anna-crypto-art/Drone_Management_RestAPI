import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";

export interface CheckListItems {
  videoFiles: boolean;
  droneMetaFile: boolean;
  plantMetaFile: boolean;
}

export interface IAppNewAnalysisFetched {
  newAnalysis: NewAnalysis;
  analysis: { id: string } | undefined;
  fileNames: string[];
}

export interface IAnalysisId {
  id: string;
}