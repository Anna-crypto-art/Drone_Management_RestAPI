import { FeatureLike } from "ol/Feature";
import { Extent } from "ol/extent";
import { Map } from "ol";
import { Style, Stroke, Text, Fill } from "ol/style";
import { asArray, asString } from "ol/color";
import { FeatureInfos, Legend, PropsFeature } from "../types";
import GeoJSONFeatures from "ol/format/GeoJSON";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { transformExtent } from "ol/proj";
import { debounce } from "@/app/shared/services/helper/debounce-helper";
import { isOnMobileDevice } from "@/app/shared/services/helper/mobile-helper";
import { IAppGeoJsonLayerCheckbox, IGeoLayer, VectorGeoLayer, GeoJSON } from "@/app/shared/components/app-map/types";
import { GEO_JSON_OPTIONS } from "@/app/shared/components/app-map/constants";
import { i18n } from "@/main";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { plantViewEventService } from "@/app/plant/plant-view-event-service";
import { PlantViewEvent } from "@/app/plant/types";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { LayerEvent } from "./types";
import { setOpacityForColor } from "@/app/shared/services/helper/color-helper";
import { asColorLike } from "ol/colorlike";

/**
 * Represents a geojson layer
 */
export abstract class BaseLayer implements IGeoLayer {
  private _showPCS = false;

  public abstract readonly name: string;
  public selected = false;
  public readonly autoZoom: boolean = false;
  public visible = true;
  public zIndex = 1;
  public readonly minZoomLevel: number | undefined = undefined;
  public description: string | undefined = undefined;
  public reloadLayerOnNextSelection = false;
  public loadedLayer: VectorGeoLayer | undefined;
  public appLayerCheckbox: IAppGeoJsonLayerCheckbox & BaseAuthComponent | undefined;

  public readonly events = new SequentialEventEmitter();

  protected showPcsZoomLevel = 15;
  
  protected zoomLoadedPcsCodes: Record<string, true> | undefined = undefined;
  protected loadedExtent: Extent | undefined = undefined;

  // zoomlevel: width
  protected readonly zoomWidths: Record<number, number | { width: number, mobileOnly: boolean }> | null = null;
  protected zoomWidth: number | null = null;

  public invisibleAutoSelection?: boolean;

  /**
   * Geo-visualization first loads the data (calls onLoad) and then fires the onSelected event
   * Because of this order we need this flag if we like to know
   * when the layer gets loaded the first time...
   */
  private initiallyLoadedBeforeSelected = false;

  protected opacity = 1;

  constructor(public readonly plant: PlantSchema) {}

  public abstract getPcs(feature: FeatureLike): string | undefined;
  public abstract load(extent?: Extent): Promise<GeoJSON<PropsFeature> | undefined>;
  public abstract get id(): string;

  public getDisplayName(): string {
    return i18n.t(this.name).toString();
  }

  public style(feature: FeatureLike): Style | Style[] {
    const addStyles = this.getAddStyles(feature);
    const styles = [...(addStyles || []), this.getStyle(feature)];

    for (const style of styles) {
      if (this.opacity < 1) {
        if (style && !Array.isArray(style)) {
          const fillColor = style.getFill()?.getColor();
          if (fillColor) {
            style.getFill().setColor(setOpacityForColor(asColorLike(fillColor).toString(), this.opacity));
          }
    
          const strokeColor = style.getStroke()?.getColor();
          if (strokeColor) {
            style.getStroke().setColor(setOpacityForColor(asColorLike(strokeColor).toString(), this.opacity));
          }
        }
      }
    }

    return styles;
  }

  protected getAddStyles(feature: FeatureLike): Style[] | undefined {
    return undefined;
  }

  protected getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  public getLegend(): Legend | undefined {
    return undefined;
  }

  public async onSelectedChanged() { 
    if (this.minZoomLevel) {
      // geo-visualization loads the layer only once (calls onLoad) and keeps the geoJSON data.
      // But in this case we need to add features to the geoJSON data each time
      // the layer gets selected...
      if (this.selected && !this.initiallyLoadedBeforeSelected) {
        const geoJson = await this.loadExtent();
        if (geoJson) {
          this.addLoadedFeatures(geoJson);
        }
      }

      // Bug: 
      // 1. select component and load extent for top left corner
      // 2. unselect component
      // 3. select component and load extent for bottom right corner
      // -> Now whole plant is within extent and no further components get loaded...
      //
      // Fix: Reset extend each time component gets unselected
      if (this.loadedExtent && !this.selected) {
        this.loadedExtent = undefined;
      }
    }

    this.initiallyLoadedBeforeSelected = false;

    await this.emitOnSelected();
  }

  protected async emitOnSelected() {
    await this.events.emit(LayerEvent.ON_SELECTED, this);
  }

  protected onZoom(onZoomCallback: (zoomLevel: number | undefined) => void): void {
    const map = this.getMap();
    if (map) {
      const view = map.getView();
      view.on("change:resolution", (e) => {
        const zoom = view.getZoom(); 

        onZoomCallback(zoom);
      });
    }
  }

  public async loadGeoJSON(): Promise<GeoJSON<PropsFeature> | undefined> {
    this.initiallyLoadedBeforeSelected = !this.selected;

    if (this.zoomWidths) {
      this.onZoom((zoomlevel) => this.calculateZoomWidth(zoomlevel));
      this.calculateZoomWidth(this.getMap()?.getView().getZoom());
    }

    if (this.minZoomLevel) {
      if (this.zoomLoadedPcsCodes === undefined) { // is "change:center" event is already registered
        this.zoomLoadedPcsCodes = {};

        const onLoadExtend = debounce(async () => {
          if (this.selected) {
            const geoJson = await this.loadExtent();
            if (geoJson) {
              this.addLoadedFeatures(geoJson);
            }
          } 
        }, 100);
        
        this.getMap()!.getView().on("change:center", onLoadExtend);
        this.getMap()!.getView().on("change:resolution", onLoadExtend);
      }

      const geoJson = await this.loadExtent();
      if (geoJson) {
        return geoJson;
      }

      this.appLayerCheckbox?.showInfo(
        i18n.t(
          "zoom-in-to-see-features", 
          { features: i18n.t(this.name).toString() },
        ).toString(),
      );

      return { type: "FeatureCollection", features: [] }; // Empty layer
    }

    return this.load();
  }

  public async setLoading(loading: boolean, loadingStatus?: string) {
    await plantViewEventService.emit(this.plant.id, PlantViewEvent.TOGGLE_LOADING, loading, loadingStatus);
  }

  protected async addLoadedFeatures(geoJson: GeoJSON<PropsFeature>) {
    const source = this.loadedLayer?.getSource();
    if (!source) {
      throw Error("Missing layer source for loading geo data within extent")
    }

    const geometryFeatures = new GeoJSONFeatures(GEO_JSON_OPTIONS).readFeatures(geoJson);
    source.addFeatures(geometryFeatures);
  }

  protected async loadExtent(): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      await this.setLoading(true);

      const map = this.getMap()!;
      const view = map.getView();
      const zoomLevel = view.getZoom();

      if (zoomLevel! >= this.minZoomLevel!) {
        const extent = transformExtent(
          view.calculateExtent(map.getSize()),
          GEO_JSON_OPTIONS.featureProjection,
          GEO_JSON_OPTIONS.dataProjection
        );

        if (this.isOutsideOfLoadedExtent(extent)) {
          this.enlargeExtent(extent);

          const geoJson = await this.load(extent);
          if (geoJson) {
            const newFeatures: (FeatureLike & PropsFeature)[] = [];
            for (const feature of geoJson.features) {
              const pcs = feature.properties.name;
              if (pcs) {
                if (!(pcs in this.zoomLoadedPcsCodes!)) {
                  newFeatures.push(feature);
                  this.zoomLoadedPcsCodes![pcs] = true;
                }
              }
            }

            geoJson.features = newFeatures;

            return geoJson;
          }
        }
      }

      return undefined;
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    } finally {
      await this.setLoading(false);
    }
  }

  private isOutsideOfLoadedExtent(extent: Extent): boolean {
    const min_long = extent[0];
    const min_lat = extent[1];
    const max_long = extent[2];
    const max_lat = extent[3];

    return this.loadedExtent === undefined || 
      this.loadedExtent[0] > min_long ||
      this.loadedExtent[1] > min_lat ||
      this.loadedExtent[2] < max_long ||
      this.loadedExtent[3] < max_lat;
  }
  
  private enlargeExtent(extent: Extent) {
    const min_long = extent[0];
    const min_lat = extent[1];
    const max_long = extent[2];
    const max_lat = extent[3];

    if (this.loadedExtent === undefined) {
      this.loadedExtent = extent;
    } else {
      if (this.loadedExtent[0] > min_long) {
        this.loadedExtent[0] = min_long
      }
      if (this.loadedExtent[1] > min_lat) {
        this.loadedExtent[1] = min_lat
      }
      if (this.loadedExtent[2] < max_long) {
        this.loadedExtent[2] = max_long
      }
      if (this.loadedExtent[3] < max_lat) {
        this.loadedExtent[3] = max_lat
      }
    }
  }

  protected calculateZoomWidth(zoomlevel: number | undefined) {
    if (zoomlevel) {
      let matchingZoomLevel: string | null = null;

      const zoomWidthLevels = Object.keys(this.zoomWidths!);
      for (let i = 0; i < zoomWidthLevels.length; i++) {
        const zoomWidthLevel = +zoomWidthLevels[i];
        if (zoomWidthLevel > zoomlevel) {
          if ((i + 1) === zoomWidthLevels.length) {
            matchingZoomLevel = zoomWidthLevels[i];
          }

          break;
        }

        matchingZoomLevel = zoomWidthLevels[i];
      }

      if (matchingZoomLevel !== null) {
        const zoomWidth = this.zoomWidths![matchingZoomLevel];
        if (zoomWidth instanceof Object) {
          if (zoomWidth.mobileOnly && !isOnMobileDevice()) {
            this.zoomWidth = null;
          } else {
            this.zoomWidth = zoomWidth.width
          }
        } else {
          this.zoomWidth = zoomWidth
        }
      } else {
        this.zoomWidth = null;
      }
    }
  }

  protected getMap(): Map | undefined {
    return this.appLayerCheckbox?.map;
  }

  protected getDescription(): string | undefined {
    return undefined;
  }

  public showPCS(show: boolean): void {
    this._showPCS = show;
  }

  public get isVisible(): boolean {
    return this.visible && !this.invisibleAutoSelection;
  }

  public reloadLayer(): void {
    this.reloadLayerOnNextSelection = true;
  }

  public async setSelected(selected: boolean) {
    await this.appLayerCheckbox?.setSelected(selected);
  }

  public async selectSilent() {
    this.selected = true;
  }

  public setVisible(visible: boolean) {
    if (!this.invisibleAutoSelection) {
      this.visible = visible;
    }
  }

  protected showText(feature: FeatureLike, props: Record<string, unknown> = {}): Text | undefined {
    return new Text({
      text: (this._showPCS && this.hasZoomLevelForPcs() && this.getPcs(feature)) || "",
      overflow: true,
      rotation: (props.rotation as number) || -(Math.PI / 2.3),
      stroke: new Stroke({
        color: "#fff",
        width: 2,
      }),
      font: "bold 14px Arial, Verdana, Helvetica, sans-serif",

      ...props,
    });
  }

  private hasZoomLevelForPcs(): boolean {
    return (this.getMap()?.getView().getZoom() || 0) >= this.showPcsZoomLevel;
  }

  protected getComplementColor(color: string): string {
    return "#" + (0xffffff ^ parseInt(color.replace("#", "0x"))).toString(16);
  }

  public getColorWithAlpha(color: string, alpha: number): string {
    const [r, g, b] = Array.from(asArray(color));
    return asString([r, g, b, alpha]);
  }

  public rerender() {
    this.loadedLayer?.changed();
  }

  public setOpacity(opacity: number) {
    this.opacity = opacity;

    if (this.loadedLayer) {
      this.rerender();
    }
  }
}
