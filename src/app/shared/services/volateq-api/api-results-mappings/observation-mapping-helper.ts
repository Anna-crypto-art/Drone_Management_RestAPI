import { FeatureInfo, FeatureInfos } from "@/app/plant/shared/map-view/types";
import { ObservationColumn, ObservationSchema } from "../api-schemas/observation-schema";
import { i18n } from "@/main";
import dateHelper from "../../helper/date-helper";
import { getUserName } from "../../helper/user-helper";

export class ObservationMappingHelper {
  constructor(
    private readonly columns: ObservationColumn[],
  ) {}

  public toFeatureInfos(observation: ObservationSchema, ccpIds?: string[]): FeatureInfos {
    const featureInfos: FeatureInfo[] = [];
    
    for (const columnId in observation.column_values) {
      const ccpColumn = this.columns.find(c => c.id === columnId);
      if (ccpColumn) {
        const visible = ccpIds && ccpIds.includes(ccpColumn.ccp_column.custom_component_property.id) || false
        featureInfos.push({
          name: ccpColumn.ccp_column.custom_component_property.name,
          value: observation.column_values[columnId].toString(),
          descr: ccpColumn.ccp_column.custom_component_property.description,
          bold: visible,
          hidden: !visible,
          _visible: visible,
        });
      }
    }

    if (observation.notes) {
      featureInfos.push({
        name: i18n.t("notes").toString(),
        value: observation.notes,
        hidden: true,
        _visible: false,
      });
    }
    if (observation.external_id) {
      featureInfos.push({
        name: i18n.t("external-id").toString(),
        value: observation.external_id,
        hidden: true,
        _visible: false,
      });
    }

    featureInfos.push(...[
      {
        name: i18n.t("observed-at").toString(),
        value: dateHelper.toDateTime(observation.observed_at),
        hidden: true,
        _visible: false,
      },
      {
        name: i18n.t("created-by").toString(),
        value: getUserName(observation.created_by_user),
        hidden: true,
        _visible: false,
      },
    ]);

    return {
      infos: featureInfos,
    };
  }
}