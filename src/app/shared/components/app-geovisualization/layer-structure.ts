import { BaseLayerType, GroupLayer } from "./types/layers";
import { EventEmitter } from "events";
import { Layer } from "ol/layer";
import Source from "ol/source/Source";
import { VNode } from "vue/types/umd";
import LayerLoader from "./loader/layer-loader";

export class LayerStructure extends EventEmitter {
  private _selected: boolean;
  private readonly childLayers: LayerStructure[];

  public parentLayer?: LayerStructure;

  constructor(
    private readonly layerLoader?: LayerLoader<Layer<Source> | undefined>,
    private readonly _name: string | (() => VNode[]) = "",
    private readonly layerType?: BaseLayerType
  ) {
    super();

    this._selected = this.layerLoader?.layerType.selected || false;
    this.childLayers = [];

    this.initializeEvents();
  }

  private initializeEvents(): void {
    this.on("setSelected", async (visible: boolean) => {
      // if layer is not loaded and visible is false than no need to load the layer
      if (visible || this.layerLoader?.loaded) {
        (await this.layerLoader?.load())?.setVisible(visible);
      }
      
      this.layerLoader?.layerType.onSelected &&
        this.layerLoader?.layerType.onSelected(visible);

      if (visible || (!visible && this.isGroup)) {
        for (const childLayer of this.childLayers) {
          childLayer.selected = visible;
        }
      }
    });
  }

  private getLayerType(): BaseLayerType | undefined {
    return this.layerLoader?.layerType || this.layerType;
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
    return this._selected;
  }

  public set selected(newVal: boolean) {
    this._selected = newVal;

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
}
