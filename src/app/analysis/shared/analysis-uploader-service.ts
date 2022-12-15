import volateqApi from "../../shared/services/volateq-api/volateq-api";
import { UploaderService } from "../../shared/services/upload-service/uploader-service";
import { i18n } from "@/main";

export class AnalysisUploaderService extends UploaderService {
  private flownAt: string | undefined;

  constructor(
    private plantId?: string,
    public analysisId?: string,
    chunkSizeInMB?: number,
  ) {
    super(chunkSizeInMB);
  }

  public async doUpload(): Promise<void> {
    if (!this.analysisId) {
      if (!this.flownAt) {
        throw { 
          error: 'INVALID_OR_MISSING_PARAMS', 
          message: i18n.t('missing').toString() + " " + i18n.t('acquisition-date').toString() 
        };
      }

      if (!this.plantId) {
        throw { 
          error: 'INVALID_OR_MISSING_PARAMS', 
          message: i18n.t('missing').toString() + " " + i18n.t('plant').toString() 
        };
      }
    }

    await this.createAnalysisUpload();

    await this.startUpload();
  }

  public setFlownAt(flownAt: string) {
    this.flownAt = flownAt;
  }

  public setAnalysisId(analysisId: string) {
    this.analysisId = analysisId;
  }

  public setPlantId(plantId: string) {
    this.plantId = plantId;
  }

  private async createAnalysisUpload(): Promise<void> {
    if (!this.upload) {
      const upload = await volateqApi.createAnalysisUpload({
        chunk_size_in_mb: this.chunkSizeInMB,
        files: this.getCreateUploadFiles(),
        analysis_id: this.analysisId,
        create_analysis: !this.analysisId && {
          flown_at: this.flownAt!,
          plant_id: this.plantId!,
        } || undefined,
      });

      if (!this.analysisId) {
        this.analysisId = upload.analysis_id;
      }
      
      await this.setUpload(upload);
    }
  }
}