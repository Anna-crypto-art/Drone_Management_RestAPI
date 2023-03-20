import { NewEmptyAnalysisRequest } from "./analysis-requests";

export interface CreateFileUpload {
  name: string;
  size: number;
}

export interface CreateAnalysisUploadRequest {
  chunk_size_in_mb: number;
  files: CreateFileUpload[];
  analysis_id?: string;
  create_analysis?: NewEmptyAnalysisRequest;
}