import { KeyFigureLayer } from "@/app/plant/shared/map-view/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualPvQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class PvKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T, GeoVisualPvQuery> {}
