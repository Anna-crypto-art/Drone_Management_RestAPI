import volateqApi from "../volateq-api/volateq-api";
import { UploaderService } from "./uploader-service";

export class AnalysisUploaderService extends UploaderService {
  private flownAt: Date | undefined;

  constructor(
    private readonly plantId?: string,
    public analysisId?: string,
    chunkSizeInMB?: number,
  ) {
    super(chunkSizeInMB);
  }

  public async doUpload(): Promise<void> {
    await this.createAnalysisUpload();

    await this.startUpload();
  }

  public setFlownAt(flownAt: Date) {
    this.flownAt = flownAt;
  }

  public setAnalysisId(analysisId: string) {
    this.analysisId = analysisId;
  }

  private async createAnalysisUpload(): Promise<void> {
    if (!this.upload) {
      if (!this.analysisId) {
        this.analysisId = (await volateqApi.createEmptyAnalysis({
          flown_at: this.flownAt && this.flownAt.toISOString() || new Date(Date.now()).toISOString(),
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