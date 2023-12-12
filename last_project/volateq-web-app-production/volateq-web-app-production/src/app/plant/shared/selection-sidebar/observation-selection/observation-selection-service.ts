import { SummerizedComponent, SummerizedObservations } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";
import { DateRange } from "../../observations/types";
import { observationSelectEventService } from "./observation-selection-event-service";
import { IObservationSelectionComponent, ObservationSelectionEvent } from "./types";
import { CcpService } from "../../plant-settings/ccp-service";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { AnalysisResultMappingEntry, PI } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { i18n } from "@/main";

export class ObservationSelectionService {
  private readonly id: string;

  private summerizedObservations: SummerizedObservations | null = null;

  public readonly ccpService: CcpService;

  public selectedCcps: CustomComponentPropertySchema[] = [];
  public selectedPIs: PI[] = [];

  public static readonly timeRangeOptions: { value: number, text: string }[] = [
    { value: 7, text: i18n.t("last-7-days").toString() },
    { value: 30, text: i18n.t("last-30-days").toString() },
    { value: 90, text: i18n.t("last-90-days").toString() },
    { value: 365, text: i18n.t("past-year").toString() },
    { value: 36500 /* 100 years */, text: i18n.t("all").toString() },
  ];

  constructor(
    private readonly observSelectionComponent: IObservationSelectionComponent,
  ) {
    this.id = Math.random().toString();
    this.ccpService = CcpService.get(this.observSelectionComponent.plant.id);
  }

  public async register() {
    observationSelectEventService.on(
      this.observSelectionComponent.plant.id,
      ObservationSelectionEvent.SELECTED,
      async (summerizedObservations: SummerizedObservations | undefined, selectedByQueryRoute: boolean) => {
        this.summerizedObservations = summerizedObservations || null;

        this.selectedCcps = await this.getSelectedCCPs();

        this.selectedPIs = AnalysisResultMappingHelper.getPIs(this.summerizedObservations?.pis
          .map(pi => ({ keyFigureId: pi.key_figure_id, piFieldName: pi.pi_field_name })) || []);

        this.observSelectionComponent.onObservationSelected && 
          await this.observSelectionComponent.onObservationSelected(selectedByQueryRoute);
      },
      this.id,
    );
    
    await observationSelectEventService.reemit(this.observSelectionComponent.plant.id);
  }

  public unregister() {
    observationSelectEventService
      .getEventEmitter(this.observSelectionComponent.plant.id)
      .removeListenerById(ObservationSelectionEvent.SELECTED, this.id);
  }

  public get hasSelectedObservations(): boolean {
    return !!this.summerizedObservations;
  }

  public get dateRange(): DateRange | null {
    return this.summerizedObservations && 
      { from: this.summerizedObservations.d_from, to: this.summerizedObservations.d_to };
  }

  public get date(): string | null {
    return this.summerizedObservations?.date || null;
  }

  public get components(): SummerizedComponent[] | null {
    return this.summerizedObservations?.components || null;
  }

  private async getSelectedCCPs(): Promise<CustomComponentPropertySchema[]> {
    return this.summerizedObservations && 
      (await this.ccpService.getCcps())
        .filter(ccp => !!this.summerizedObservations!.ccps.find(c => c.ccp_id === ccp.id)) || 
      [];
  }
}