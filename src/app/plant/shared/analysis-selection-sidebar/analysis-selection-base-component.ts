import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisSelectionService } from "./analysis-selection-service";
import { AnalysisSelectionEvent } from "./types";

export abstract class AnalysisSelectionBaseComponent extends BaseAuthComponent {
  abstract plant: PlantSchema;
  abstract analysisResults: AnalysisResultDetailedSchema[] | null;

  protected selectedAnalysisResult: AnalysisResultDetailedSchema | null = null;
  protected selectedAnalysesResults: AnalysisResultDetailedSchema[] | null = null; // compare mode

  async created() {
    super.created();

    AnalysisSelectionService.on(
      this.plant.id,
      AnalysisSelectionEvent.ANALYSIS_SELECTED,
      (selectedAnalysisResultId: string | undefined) => {
        // console.log(this.constructor.name)
        // console.log(AnalysisSelectionEvent.ANALYSIS_SELECTED)
        // console.log(selectedAnalysisResultId)

        if (this.analysisResults) {
          this.selectedAnalysisResult = this.analysisResults
            .find(analysisResult => analysisResult.id === selectedAnalysisResultId) || null;

          if (this.selectedAnalysisResult) {
            this.selectedAnalysesResults = null;
          }
        }

        this.onAnalysisSelected();
      }
    )

    AnalysisSelectionService.on(
      this.plant.id,
      AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
      (selectedAnalysisResultIds: string[] | undefined) => {
        // console.log(this.constructor.name)
        // console.log(AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED)
        // console.log(selectedAnalysisResultIds)

        if (!selectedAnalysisResultIds) {
          this.selectedAnalysesResults = null;
        } else if (this.analysisResults) {
          this.selectedAnalysesResults = this.analysisResults
            .filter(analysisResult => selectedAnalysisResultIds.includes(analysisResult.id));

            if (this.selectedAnalysesResults) {
              this.selectedAnalysisResult = null;
            }
        }

        this.onMultiAnalysesSelected();
      }
    )
  }

  protected onAnalysisSelected() { /* override me, if you need to */ }
  protected onMultiAnalysesSelected() { /* override me, if you need to */ }

  protected getKeyFigures(): KeyFigureSchema[] {
    if (this.selectedAnalysisResult) {
      return this.selectedAnalysisResult.key_figures;
    }

    if (this.selectedAnalysesResults) {
      return this.selectedAnalysesResults[0].key_figures.filter(key_figure => {
        return !!this.selectedAnalysesResults![1].key_figures.find(kf => kf.id === key_figure.id)
      });
    }

    return [];
  }

  protected hasAnyAnalysisSelected(): boolean {
    return this.selectedAnalysisResult !== null || this.selectedAnalysesResults !== null;
  }

  protected get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    if (this.selectedAnalysisResult) {
      return this.selectedAnalysisResult;
    }

    if (this.selectedAnalysesResults) {
      return this.selectedAnalysesResults[0];
    }

    return null;
  }

  protected get compareAnalysisResult(): AnalysisResultDetailedSchema | null {
    if (this.selectedAnalysesResults) {
      return this.selectedAnalysesResults[1];
    }

    return null;
  }

}