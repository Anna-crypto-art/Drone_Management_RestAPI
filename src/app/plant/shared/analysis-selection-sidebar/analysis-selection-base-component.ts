import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { EventHelper } from "@/app/shared/services/helper/event-helper";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { analysisSelectEventService } from "./analysis-selection-service";
import { AnalysisSelectionEvent } from "./types";

export abstract class AnalysisSelectionBaseComponent extends BaseAuthComponent {
  abstract plant: PlantSchema;
  abstract analyses: AnalysisForViewSchema[] | null;

  private selectedAnalysis: AnalysisForViewSchema | null = null;
  private selectedAnalyses: AnalysisForViewSchema[] | null = null; // compare mode

  private id: string | undefined = undefined

  /**
   * Every SFC subclass has to overide mounted and call super.mounted. 
   * Otherwise the code will not be executed
   */
  async mounted() {
    // We need the id to unregister the AnalysisSelection event, again
    this.id = Math.random().toString()

    analysisSelectEventService.on(
      this.plant.id,
      AnalysisSelectionEvent.ANALYSIS_SELECTED,
      async (selectedAnalysisId: string | undefined) => {
        await this.fireAnalysisSelected(selectedAnalysisId);
      },
      this.id
    );

    analysisSelectEventService.on(
      this.plant.id,
      AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
      async (selectedAnalysesIds: string[] | undefined) => {
        await this.fireMultiAnalysisSelected(selectedAnalysesIds);
      },
      this.id
    );

    const eventEmitter = analysisSelectEventService.getEventEmitter(this.plant.id)
    if (eventEmitter.lastEvent === AnalysisSelectionEvent.ANALYSIS_SELECTED) {
      await this.fireAnalysisSelected(eventEmitter.lastArgs[0]);
    } else if (eventEmitter.lastEvent === AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED) {
      await this.fireMultiAnalysisSelected(eventEmitter.lastArgs[0]);
    }
  }

  unmounted() {
    analysisSelectEventService.getEventEmitter(this.plant.id)
      .removeListenerById(AnalysisSelectionEvent.ANALYSIS_SELECTED, this.id!);
      analysisSelectEventService.getEventEmitter(this.plant.id)
      .removeListenerById(AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED, this.id!);
  }

  private async fireAnalysisSelected(selectedAnalysisId: string | undefined) {
    if (this.analyses) {
      this.selectedAnalysis = this.analyses
        .find(analysis => analysis.id === selectedAnalysisId) || null;

      if (this.selectedAnalysis) {
        this.selectedAnalyses = null;
      }
    }

    await this.onAnalysisSelected();
  }

  private async fireMultiAnalysisSelected(selectedAnalysesIds: string[] | undefined) {
    if (!selectedAnalysesIds) {
      this.selectedAnalyses = null;
    } else if (this.analyses) {
      this.selectedAnalyses = this.analyses
        .filter(analysis => selectedAnalysesIds.includes(analysis.id));

      if (this.selectedAnalyses.length > 1) {
        this.selectedAnalysis = null;
      }
    }

    await this.onMultiAnalysesSelected();
  }

  protected async onAnalysisSelected() { /* override me, if you need to */ }
  protected async onMultiAnalysesSelected() { /* override me, if you need to */ }

  protected getKeyFigures(): KeyFigureSchema[] {
    if (this.selectedAnalysis?.analysis_result) {
      return this.selectedAnalysis?.analysis_result.key_figures;
    }

    if (this.selectedAnalyses) {
      return this.selectedAnalyses[0].analysis_result!.key_figures.filter(key_figure => {
        return !!this.selectedAnalyses![1].analysis_result!.key_figures.find(kf => kf.id === key_figure.id)
      });
    }

    return [];
  }

  protected hasAnyAnalysisSelected(): boolean {
    return this.selectedAnalysis !== null || this.selectedAnalyses !== null;
  }

  protected get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.selectedAnalysis?.analysis_result || 
      (this.selectedAnalyses && this.selectedAnalyses[0].analysis_result) || null;
  }

  protected get compareAnalysisResult(): AnalysisResultDetailedSchema | null {
    return (this.selectedAnalyses && this.selectedAnalyses[1].analysis_result) || null;
  }

  protected get firstAnalysis(): AnalysisForViewSchema | null {
    return this.selectedAnalysis || (this.selectedAnalyses && this.selectedAnalyses[0]) || null;
  }

  protected get analysisResults(): AnalysisResultDetailedSchema[] {
    return this.analyses?.map(analysis => analysis.analysis_result!).filter(analysisResult => !!analysisResult) || [];
  }
}