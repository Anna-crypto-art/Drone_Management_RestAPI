import { FeatureInfo, FeatureInfoType, FeatureInfos, ObservFeatureInfo } from "@/app/plant/shared/map-view/map-view-popup/types";
import { ObservationColumn, ObservationSchema } from "../api-schemas/observation-schema";
import { i18n } from "@/main";
import dateHelper from "../../helper/date-helper";
import { getUserName } from "../../helper/user-helper";
import { AnalysisResultMappingHelper } from "./analysis-result-mapping-helper";

export class ObservationMappingHelper {
  constructor(
    private readonly columns: ObservationColumn[],
  ) {}

  public toFeatureInfos(observation: ObservationSchema, ccpIds?: string[], piIds?: string[]): FeatureInfos<ObservFeatureInfo> {
    const featureInfos: ObservFeatureInfo[] = [];
    
    for (const columnId in observation.column_values) {
      const observColumn = this.columns.find(c => c.id === columnId);
      if (observColumn) {
        if (observColumn.ccp_column) {
          const ccpColumn = observColumn.ccp_column;
          const hasSelectedCcp = ccpIds && ccpIds.includes(ccpColumn.custom_component_property.id) || false
          
          featureInfos.push({
            type: FeatureInfoType.OBSERVATION,
            id: observColumn.id,
            name: ccpColumn.custom_component_property.name,
            value: observation.column_values[columnId].toString(),
            descr: ccpColumn.custom_component_property.description,
            bold: hasSelectedCcp,
            collapsable: hasSelectedCcp,
            hidden: !hasSelectedCcp,
            observation,
          });
        } else if (observColumn.pi_column) {
          const piColumn = observColumn.pi_column;
          const resultMappings = AnalysisResultMappingHelper.getMappingsByComponentId(observation.fieldgeometry_component.component_id)!;
          const mappingHelper = new AnalysisResultMappingHelper(resultMappings);
          const mappingEntry = mappingHelper.findEntry(piColumn.pi_field_name, piColumn.key_figure_id);
          
          if (mappingEntry) {
            const hasSelectedPi = piIds?.includes(mappingHelper.getEntryId(mappingEntry)) || false;

            featureInfos.push({
              ...mappingHelper.toFeatureInfo(
                mappingEntry,
                observation.column_values[columnId].toString(),
                FeatureInfoType.OBSERVATION, 
              ),
              type: FeatureInfoType.OBSERVATION,
              bold: hasSelectedPi,
              collapsable: hasSelectedPi,
              hidden: !hasSelectedPi,
              observation,
            });
          }
        }
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