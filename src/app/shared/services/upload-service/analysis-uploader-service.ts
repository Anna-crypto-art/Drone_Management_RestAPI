import volateqApi from "../volateq-api/volateq-api";
import { UploaderService } from "./uploader-service";

export class AnalysisUploaderService extends UploaderService {
  constructor(
    private readonly plantId?: string,
    private analysisId?: string,
    chunkSizeInMB?: number,
  ) {
    super(chunkSizeInMB);
  }

  public async doUpload(): Promise<void> {
    await this.createAnalysisUpload();

    await this.startUpload();
  }

  private async createAnalysisUpload(): Promise<void> {
    if (!this.upload) {
      if (!this.analysisId) {
        this.analysisId = (await volateqApi.createEmptyAnalysis({
          flown_at: new Date(Date.now()).toISOString(),
          plant_id: this.plantId!,
        })).id;
      }

      const upload = await volateqApi.createAnalysisUpload(this.analysisId, {
        chunk_size_in_mb: this.chunkSizeInMB,
        files: this.getCreateUploadFiles()
      });
      
      this.setUpload(upload);
    }
  }
}