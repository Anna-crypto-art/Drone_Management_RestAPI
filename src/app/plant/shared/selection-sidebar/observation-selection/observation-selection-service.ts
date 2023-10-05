import { SummerizedObservations } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";
import { DateRange } from "../../observations/types";
import { observationSelectEventService } from "./observation-selection-event-service";
import { IObservationSelectionComponent, ObservationSelectionEvent } from "./types";
import { CcpService } from "../../plant-settings/ccp-service";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";

export class ObservationSelectionService {
  private readonly id: string;

  private summerizedObservations: SummerizedObservations | undefined = undefined;

  public readonly ccpService: CcpService;

  public dateRange: DateRange | undefined = undefined;
  public selectedCcps: CustomComponentPropertySchema[] = [];

  constructor(
    private readonly observSelectionComponent: IObservationSelectionComponent,
  ) {
    this.id = Math.random().toString();
    this.ccpService = CcpService.get(this.observSelectionComponent.plant.id);
  }

  public register() {
    observationSelectEventService.on(
      this.observSelectionComponent.plant.id,
      ObservationSelectionEvent.SELECTED,
      async (summerizedObservations: SummerizedObservations | undefined) => {
        this.summerizedObservations = summerizedObservations;

        this.dateRange = this.getDateRange();
        this.selectedCcps = await this.getSelectedCCPs();

        this.observSelectionComponent.onObservationSelected && await this.observSelectionComponent.onObservationSelected();
      },
      this.id,
    );
  }

  public unregister() {
    observationSelectEventService
      .getEventEmitter(this.observSelectionComponent.plant.id)
      .removeListenerById(ObservationSelectionEvent.SELECTED, this.id);
  }

  public get hasSelectedObservations(): boolean {
    return this.dateRange !== undefined;
  }

  private getDateRange(): DateRange | undefined {
    return this.summerizedObservations && 
      { from: this.summerizedObservations.d_from, to: this.summerizedObservations.d_to };
  }

  private async getSelectedCCPs(): Promise<CustomComponentPropertySchema[]> {
    return this.summerizedObservations && 
      (await this.ccpService.getCcps())
        .filter(ccp => !!this.summerizedObservations!.ccps.find(c => c.ccp_id === ccp.id)) || 
      [];
  }
}