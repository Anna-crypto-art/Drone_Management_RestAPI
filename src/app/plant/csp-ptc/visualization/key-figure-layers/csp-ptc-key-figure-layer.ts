import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualCspPtcQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class CspPtcKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T, GeoVisualCspPtcQuery> {}
