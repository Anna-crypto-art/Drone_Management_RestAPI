import volateqApi from "../../shared/services/volateq-api/volateq-api";
import { UploaderService } from "../../shared/services/upload-service/uploader-service";
import { i18n } from "@/main";
import { AnalysisEventService } from "./analysis-event-service";
import { AnalysisEvent } from "./types";

export class AnalysisUploaderService extends UploaderService {
  private flownAt: string | undefined;

  constructor(
    private plantId?: string,
    public analysisId?: string,
    chunkSizeInMB?: number,
  ) {
    super(chunkSizeInMB);
  }

  public async addFiles(files: File[]): Promise<void> {
    await super.addFiles(files);

    if (!this.analysisId) {
      return;
    }

    const analysis = await volateqApi.getAnalysis(this.analysisId);
    if (analysis.files) {
      let fileNames = [];
      for (const key of Object.keys(analysis.files)) {
        fileNames = fileNames.concat(analysis!.files[key]);
      }

      const analysisFileInfos = await volateqApi.getAnalysisFiles(analysis.id, fileNames);

      for (const fileUploader of this.fileUploaders) {
        if (analysisFileInfos[fileUploader.fileName]) {
          fileUploader.description = i18n.t("file-exists-and-overide").toString();
        }
      }
    }
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

    if (this.analysisId) {
      AnalysisEventService.emit(this.analysisId, AnalysisEvent.UPDATE_ANALYSIS);
    }

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