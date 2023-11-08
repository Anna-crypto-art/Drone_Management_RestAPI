import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { BaseLayer } from "./base-layer";
import { AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { KeyFigureBaseLayer, LayerEvent, LayerSettings } from "./types";
import { KeyFigureLayer } from "./key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { ObservationCcpLayer } from "./observation-ccp-layer";
import { ObservationLayer } from "./observation-layer";

export class LayersService extends AppSeqEventService<LayerEvent> {
  private static readonly layersServices: Record<string, LayersService> = {};

  public static get(plantId: string): LayersService {
    if (!(plantId in this.layersServices)) {
      this.layersServices[plantId] = new LayersService(plantId);
    }

    return this.layersServices[plantId];
  }

  public readonly settings: LayerSettings = {
    multiSelection: false,
    showCouldNotBeMeasured: false,
  };

  private constructor(private readonly plantId: string) {
    super();
  }

  public readonly layers: BaseLayer[] = [];

  public addLayers(layer: BaseLayer | BaseLayer[]) {
    const layers = Array.isArray(layer) ? layer : [layer];

    for (const l of layers) {
      l.events.on(LayerEvent.ON_SELECTED, async (layer: BaseLayer) => {
        await this.emit(this.plantId, LayerEvent.ON_SELECTED, layer);

        if (l instanceof KeyFigureLayer) {
          await this.emit(this.plantId, LayerEvent.ON_KEY_FIGURE_SELECTED, layer);
        }

        if (l instanceof ObservationLayer) {
          await this.emit(this.plantId, LayerEvent.ON_OBSERV_SELECTED, layer);
        }
      });

      l.events.on(LayerEvent.ON_INV_AUTO_SELECT_SELECTED, async (layer: KeyFigureBaseLayer) => {
        await this.emit(this.plantId, LayerEvent.ON_INV_AUTO_SELECT_SELECTED, layer);
      });
    }

    this.layers.push(...layers);
  }

  public get keyFigureLayers(): KeyFigureBaseLayer[] {
    return this.layers.filter(l => l instanceof KeyFigureLayer) as KeyFigureBaseLayer[];
  }

  public get observationLayers(): ObservationLayer[] {
    return this.layers.filter(l => l instanceof ObservationLayer) as ObservationLayer[];
  }

  public rerenderLoadedLayers() {
    this.layers.filter(l => l.loadedLayer).forEach(l => l.rerender());
  }

  public removeLayer(layerId: string) {
    const layerIndex = this.layers.findIndex(l => l.id === layerId);
    if (layerIndex >= 0) {
      this.layers.splice(layerIndex, 1);
    }
  }
}