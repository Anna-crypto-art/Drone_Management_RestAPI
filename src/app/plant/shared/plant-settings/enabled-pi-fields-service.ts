import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { EnabledPiFieldSchema } from "@/app/shared/services/volateq-api/api-schemas/enabled-pi-field-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

export class EnabledPiFieldsService {
  private static readonly enabledPiFieldsServices: Record<string, EnabledPiFieldsService> = {};

  public static get(plantId: string): EnabledPiFieldsService {
    if (!(plantId in this.enabledPiFieldsServices)) {
      this.enabledPiFieldsServices[plantId] = new EnabledPiFieldsService(plantId);
    }

    return this.enabledPiFieldsServices[plantId];
  }

  private enabledPiFields: EnabledPiFieldSchema[] | null = null;

  constructor(private readonly plantId: string) {}

  public async getEnabledPiFields(): Promise<EnabledPiFieldSchema[]> {
    if (!this.enabledPiFields) {
      this.enabledPiFields = await volateqApi.getEnabledPiFields(this.plantId);
    }

    return this.enabledPiFields;
  }
}