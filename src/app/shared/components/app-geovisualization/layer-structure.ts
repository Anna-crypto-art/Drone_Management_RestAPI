import { BaseLayerType, GroupLayer } from "./types/layers";
import { EventEmitter } from "events";
import { Layer } from "ol/layer";
import Source from "ol/source/Source";
import { VNode } from "vue/types/umd";
import { Watch } from "vue-property-decorator";
import LayerLoader from "./loader/layer-loader";
import LayerRenderer from "ol/renderer/Layer";

export class LayerStructure extends EventEmitter {
  private readonly childLayers: LayerStructure[];

  public parentLayer?: LayerStructure;

  public ignoreSelectedWatcher = false;

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
    this.layerLoader?.layerType.events?.on("setSelected", (selected) => { this.emit("setSelected", selected); });
    this.on("setSelected", async (selected) => { await this.selectLayer(selected) });
  }

  private async selectLayer(selected: boolean): Promise<void> {
    if (selected) {
      this.unselectParentLayers();
    }

    await this.layerLoader?.setVisible(selected);

    this.layerLoader?.layerType.onSelected && this.layerLoader?.layerType.onSelected(selected);

    if (selected || (!selected && this.isGroup)) {
      for (const childLayer of this.childLayers) {
        childLayer.selected = selected;
      }
    }
  }

  private getLayerType(): BaseLayerType | undefined {
    return this.layerLoader?.layerType || this.layerType;
  }

  private unselectParentLayers() {
    if (this.parentLayer) {
      if (this.parentLayer.singleSelection) {
        this.parentLayer.getChildLayers().forEach(sibling => {
          console.log("unselectParentLayers: " + sibling.name + " " + sibling.selected)

          if (sibling.id !== this.id && (sibling.selected || sibling.isGroup)) {
            sibling.selected = false;
          }
        });
      }

      this.parentLayer.unselectParentLayers();
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

  public set selected(newVal: boolean) {
    if (this.layerLoader) {
      this.layerLoader.layerType.selected = newVal;
    }

    this.emit("setSelected", newVal);
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

  public hasChildLayer(id: string): boolean {
    return !!this.getChildLayer(id);
  }

  public getChildLayer(id: string): LayerStructure | undefined {
    return this.getChildLayers().find(childLayer => childLayer.id === id);
  }
}
