import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

export class CcpService {
  private static ccpServices: Record<string, CcpService> = {};

  private _ccps: CustomComponentPropertySchema[] | null = null;

  constructor(private readonly plantId: string) {}
  
  async update() {
    this._ccps = await volateqApi.getCustomComponentProperties(this.plantId);
  }
  
  async getCcps(): Promise<CustomComponentPropertySchema[]> {
    if (this._ccps === null) {
      await this.update();
    }

    return this._ccps!;
  }

  async getCcpsByComponent(componentId: number): Promise<CustomComponentPropertySchema[]> {
    return (await this.getCcps()).filter(c => c.component.id === componentId);
  }

  getCcp(ccpId: string): CustomComponentPropertySchema | undefined {
    return this._ccps?.find(ccp => ccp.id === ccpId);
  }

  public static get(plantId: string): CcpService {
    if (!(plantId in CcpService.ccpServices)) {
      CcpService.ccpServices[plantId] = new CcpService(plantId);
    }

    return CcpService.ccpServices[plantId];
  }

  public static get defaultColor(): string {
    return "#cccccc";
  }
}