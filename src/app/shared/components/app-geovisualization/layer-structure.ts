import { BaseLayerType, GroupLayer, GeoJSONLayer } from "./types/layers";
import { Layer } from "ol/layer";
import Source from "ol/source/Source";
import { VNode } from "vue/types/umd";
import LayerLoader from "./loader/layer-loader";
import LayerRenderer from "ol/renderer/Layer";
import { SequentialEventEmitter } from "../../services/app-event-service/sequential-event-emitter";
import { LayerEvent } from "./types/events";

export class LayerStructure extends SequentialEventEmitter {
  private readonly childLayers: LayerStructure[];

  public parentLayer?: LayerStructure;

  public ignoreSelectedWatcher = false;

  public collapsed = false;

  constructor(
    public readonly layerLoader?: LayerLoader<Layer<Source, LayerRenderer<any>> | undefined>,
    private readonly _name: string | (() => VNode[]) = "",
    private readonly layerType?: BaseLayerType
  ) {
    super();

    this.childLayers = [];

    this.initializeEvents();
  }

  private initializeEvents(): void {
    this.layerLoader?.layerType.events?.on(LayerEvent.SET_SELECTED, async (selected: boolean) => {
      await this.emit(LayerEvent.SET_SELECTED, selected);
    });
    this.on(LayerEvent.SET_SELECTED, async (selected: boolean) => {
      await this.selectLayer(selected) 
    });

    this.getLayerType()?.events?.on(LayerEvent.COLLAPSE, async (collapse: boolean) => {
      await this.emit(LayerEvent.COLLAPSE, collapse);
    });
  }

  private async selectLayer(selected: boolean) {
    if (selected) {
      await this.unselectParentLayers();
    }

    await this.layerLoader?.setVisible(selected);

    this.layerLoader?.layerType.onSelected && this.layerLoader?.layerType.onSelected(selected);

    if (selected || (!selected && this.isGroup)) {
      for (const childLayer of this.childLayers) {
        await childLayer.setSelected(selected);
      }
    }
  }

  private getLayerType(): BaseLayerType | undefined {
    return this.layerLoader?.layerType || this.layerType;
  }

  private async unselectParentLayers() {
    if (this.parentLayer) {
      if (this.parentLayer.singleSelection) {
        for (const sibling of this.parentLayer.getChildLayers()) {
          if (sibling.id !== this.id && (sibling.selected || sibling.isGroup)) {
            await sibling.setSelected(false);
          }
        }
      }

      await this.parentLayer.unselectParentLayers();
    }
  }

  /**
   * LayerStructure without layerLoader is a Layer group
   */
  public get isGroup(): boolean {
    return !this.layerLoader;
  }

  public get name(): string | (() => VNode[]) {
    return this._name || this.getLayerType()?.name || "";
  }

  public get id(): string | (() => VNode[]) {
    return this.getLayerType()?.id || this.name;
  }

  public get description(): string | undefined {
    return this.getLayerType()?.description;
  }

  public addChildLayer(childLayer: LayerStructure): void {
    this.childLayers.push(childLayer);

    childLayer.parentLayer = this;
  }

  public getChildLayers(): LayerStructure[] {
    return this.childLayers;
  }

  public get hasChildrens(): boolean {
    return this.childLayers.length > 0;
  }

  public get selected(): boolean {
    return this.layerLoader?.layerType.selected || false;
  }

  public async setSelected(selected: boolean) {
    if (this.layerLoader) {
      this.layerLoader.layerType.selected = selected;
    }

    await this.emit(LayerEvent.SET_SELECTED, selected);
  }

  public get visible(): boolean {
    // Not allowed to use getLayerType(), because then the vue computation does not work anymore...

    if (this.layerLoader?.layerType?.visible !== undefined) {
      return this.layerLoader.layerType.visible;
    }
    if (this.layerType?.visible !== undefined) {
      return this.layerType.visible;
    }
    return true;
  }

  public get singleSelection(): boolean {
    return (this.layerType as GroupLayer)?.singleSelection || false;
  }

  public get styleClass(): string {
    return this.getLayerType()?.styleClass || "";
  }

  public get icon(): string {
    return (this.layerType as GroupLayer)?.icon || "";
  }

  public get customSlot(): string {
    return (this.layerType as GroupLayer)?.customSlot || "";
  }

  public get collapsable(): boolean {
    return (this.layerType as GroupLayer)?.collapsable || false;
  }

  public hasChildLayer(id: string): boolean {
    return !!this.getChildLayer(id);
  }

  public getChildLayer(id: string): LayerStructure | undefined {
    return this.getChildLayers().find(childLayer => childLayer.id === id);
  }

  public getVisibleChildLayers(): LayerStructure[] {
    return this.getChildLayers().filter(childLayer => childLayer.visible);
  }

  public hasSelectedChildLayer(): boolean {
    for (const childLayer of this.getChildLayers()) {
      if (childLayer.hasChildrens) {
        if (childLayer.hasSelectedChildLayer()) {
          return true;
        }
      }
      if (childLayer.selected) {
        return true;
      }
    }
    
    return false;
  }
}
