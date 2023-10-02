import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { KeyFigureLayerOptions } from "../layers/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { KeyFigureLayer } from "../layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export interface GroupKeyFigureLayer {
  keyFigureId: ApiKeyFigure;
  layerOptions?: KeyFigureLayerOptions;
  childLayers: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[];
  visible: boolean;
}

export interface ComponentGroupKeyFigureLayer {
  componentId: ApiComponent;
  name: string;
  childLayers: (GroupKeyFigureLayer | KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>)[];
  visible: boolean;
  collapsed: boolean;
}