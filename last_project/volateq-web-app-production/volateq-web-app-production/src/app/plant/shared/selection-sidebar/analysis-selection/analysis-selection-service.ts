import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { analysisSelectEventService } from "./analysis-selection-event-service";
import { AnalysisSelectionEvent, IAnalysisSelectionComponent } from "./types";

export class AnalysisSelectionService {
  private selectedAnalysis: AnalysisForViewSchema | null = null;
  private selectedAnalyses: AnalysisForViewSchema[] | null = null; // compare mode

  private readonly id: string;

  constructor(
    private readonly analysisSelectionComponent: IAnalysisSelectionComponent,
  ) {
    // We need the id to unregister the AnalysisSelection event, again
    this.id = Math.random().toString()
  }

  public async register() {
    analysisSelectEventService.on(
      this.analysisSelectionComponent.plant.id,
      AnalysisSelectionEvent.ANALYSIS_SELECTED,
      async (selectedAnalysisId: string | undefined, selectedByQueryRoute?: boolean) => {
        await this.fireAnalysisSelected(selectedAnalysisId, selectedByQueryRoute);
      },
      this.id
    );

    analysisSelectEventService.on(
      this.analysisSelectionComponent.plant.id,
      AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
      async (selectedAnalysesIds: string[] | undefined, selectedByQueryRoute?: boolean) => {
        await this.fireMultiAnalysisSelected(selectedAnalysesIds, selectedByQueryRoute);
      },
      this.id
    );

    const eventEmitter = analysisSelectEventService.getEventEmitter(this.analysisSelectionComponent.plant.id)
    if (eventEmitter.lastEvent === AnalysisSelectionEvent.ANALYSIS_SELECTED) {
      await this.fireAnalysisSelected(eventEmitter.lastArgs[0]);
    } else if (eventEmitter.lastEvent === AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED) {
      await this.fireMultiAnalysisSelected(eventEmitter.lastArgs[0]);
    }
  }

  public async unregister() {
    analysisSelectEventService.getEventEmitter(this.analysisSelectionComponent.plant.id)
      .removeListenerById(AnalysisSelectionEvent.ANALYSIS_SELECTED, this.id!);
      analysisSelectEventService.getEventEmitter(this.analysisSelectionComponent.plant.id)
      .removeListenerById(AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED, this.id!);
  }

  private async fireAnalysisSelected(selectedAnalysisId: string | undefined, selectedByQueryRoute?: boolean) {
    if (this.analysisSelectionComponent.analyses) {
      this.selectedAnalysis = this.analysisSelectionComponent.analyses
        .find(analysis => analysis.id === selectedAnalysisId) || null;

      if (this.selectedAnalysis) {
        this.selectedAnalyses = null;
      }
    }

    this.analysisSelectionComponent.onAnalysisSelected && await this.analysisSelectionComponent.onAnalysisSelected(selectedByQueryRoute);
  }

  private async fireMultiAnalysisSelected(selectedAnalysesIds: string[] | undefined, selectedByQueryRoute?: boolean) {
    if (!selectedAnalysesIds) {
      this.selectedAnalyses = null;
    } else if (this.analysisSelectionComponent.analyses) {
      this.selectedAnalyses = this.analysisSelectionComponent.analyses
        .filter(analysis => selectedAnalysesIds.includes(analysis.id));

      if (this.selectedAnalyses.length > 1) {
        this.selectedAnalysis = null;
      }
    }

    this.analysisSelectionComponent.onMultiAnalysesSelected && await this.analysisSelectionComponent.onMultiAnalysesSelected(selectedByQueryRoute);
  }

  public getKeyFigures(): KeyFigureSchema[] {
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

  public hasAnyAnalysisSelected(): boolean {
    return this.selectedAnalysis !== null || this.selectedAnalyses !== null;
  }

  public get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.selectedAnalysis?.analysis_result || 
      (this.selectedAnalyses && this.selectedAnalyses[0].analysis_result) || null;
  }

  public get compareAnalysisResult(): AnalysisResultDetailedSchema | null {
    return (this.selectedAnalyses && this.selectedAnalyses[1].analysis_result) || null;
  }

  public get firstAnalysis(): AnalysisForViewSchema | null {
    return this.selectedAnalysis || (this.selectedAnalyses && this.selectedAnalyses[0]) || null;
  }

  public get analysisResults(): AnalysisResultDetailedSchema[] {
    return this.analysisSelectionComponent.analyses?.map(analysis => analysis.analysis_result!).filter(analysisResult => !!analysisResult) || [];
  }
}