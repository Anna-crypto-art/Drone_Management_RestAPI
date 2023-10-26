import { FeatureInfo, FeatureInfoType, FeatureInfos, ObservFeatureInfo } from "@/app/plant/shared/map-view/map-view-popup/types";
import { ObservationColumn, ObservationSchema } from "../api-schemas/observation-schema";
import { i18n } from "@/main";
import dateHelper from "../../helper/date-helper";
import { getUserName } from "../../helper/user-helper";

export class ObservationMappingHelper {
  constructor(
    private readonly columns: ObservationColumn[],
  ) {}

  public toFeatureInfos(observation: ObservationSchema, ccpIds?: string[]): FeatureInfos<ObservFeatureInfo> {
    const featureInfos: ObservFeatureInfo[] = [];
    
    for (const columnId in observation.column_values) {
      const ccpColumn = this.columns.find(c => c.id === columnId);
      if (ccpColumn) {
        const hasSelectedCcp = ccpIds && ccpIds.includes(ccpColumn.ccp_column.custom_component_property.id) || false
        featureInfos.push({
          type: FeatureInfoType.OBSERVATION,
          id: ccpColumn.id,
          name: ccpColumn.ccp_column.custom_component_property.name,
          value: observation.column_values[columnId].toString(),
          descr: ccpColumn.ccp_column.custom_component_property.description,
          bold: hasSelectedCcp,
          collapsable: hasSelectedCcp,
          hidden: !hasSelectedCcp,
          observation,
        });
      }
    }

    if (observation.notes) {
      featureInfos.push({
        type: FeatureInfoType.OBSERVATION,
        id: observation.id + "__notes",
        name: i18n.t("notes").toString(),
        value: observation.notes,
        hidden: true,
        observation,
      });
    }
    if (observation.external_id) {
      featureInfos.push({
        type: FeatureInfoType.OBSERVATION,
        id: observation.id + "__external_id",
        name: i18n.t("external-id").toString(),
        value: observation.external_id,
        hidden: true,
        observation,
      });
    }

    featureInfos.push({
      type: FeatureInfoType.OBSERVATION,
      id: observation.id + "__observed_at",
      name: i18n.t("observed-at").toString(),
      value: dateHelper.toDateTime(observation.observed_at),
      hidden: true,
      observation,
    });
    featureInfos.push({
        type: FeatureInfoType.OBSERVATION,
        id: observation.id + "_created_by_user",
        name: i18n.t("created-by").toString(),
        value: getUserName(observation.created_by_user),
        hidden: true,
        observation,
    });

    return {
      infos: featureInfos,
    };
  }
}