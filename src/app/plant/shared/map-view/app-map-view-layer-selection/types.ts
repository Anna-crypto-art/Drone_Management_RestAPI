import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { KeyFigureBaseLayer, KeyFigureLayerOptions } from "../layers/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { KeyFigureLayer } from "../layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ObservationCcpLayer } from "../layers/observation-ccp-layer";
import { ComponentLayer } from "../layers/component-layer";

export interface ComponentGroupBaseLayer<T> {
  componentId: ApiComponent;
  name: string;
  childLayers: T[];
  visible: boolean;
  collapsed: boolean;
}

export interface GroupKeyFigureLayer {
  keyFigureId: ApiKeyFigure;
  layerOptions?: KeyFigureLayerOptions;
  childLayers: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[];
  visible: boolean;
}

export type ComponentGroupKeyFigureLayer = ComponentGroupBaseLayer<GroupKeyFigureLayer | KeyFigureBaseLayer>;


export interface ValueRangeGroupObservLayer {
  ccp: CustomComponentPropertySchema;
  childLayers: ObservationCcpLayer[];
}

export interface ComponentGroupObservationLayer extends ComponentGroupBaseLayer<ValueRangeGroupObservLayer | ObservationCcpLayer> {
  componentLayer: ComponentLayer;
}