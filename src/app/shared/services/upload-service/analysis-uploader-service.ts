import volateqApi from "../volateq-api/volateq-api";
import { UploaderService } from "./uploader-service";

export class AnalysisUploaderService extends UploaderService {
  private flownAt: string | undefined;

  constructor(
    private plantId?: string,
    public analysisId?: string,
    chunkSizeInMB?: number,
  ) {
    super(chunkSizeInMB);

    this.setAllowStartUpload();
  }

  public async doUpload(): Promise<void> {
    if (!this.plantId) {
      throw new Error("Missing plant id");
    }

    await this.createAnalysisUpload();

    await this.startUpload();
  }

  public setFlownAt(flownAt: string) {
    this.flownAt = flownAt;

    this.setAllowStartUpload();
  }

  public setAnalysisId(analysisId: string) {
    this.analysisId = analysisId;

    this.setAllowStartUpload();
  }

  public setPlantId(plantId: string) {
    this.plantId = plantId;

    this.setAllowStartUpload();
  }

  private async createAnalysisUpload(): Promise<void> {
    if (!this.upload) {
      if (!this.analysisId) {
        this.analysisId = (await volateqApi.createEmptyAnalysis({
          flown_at: this.flownAt!,
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

  private setAllowStartUpload() {
    this.allowStartUpload = !!this.analysisId || !!(this.plantId && this.flownAt);
  }
}