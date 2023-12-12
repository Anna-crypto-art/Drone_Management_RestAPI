import { FeatureLike } from "ol/Feature";
import { Extent } from "ol/extent";
import { Map } from "ol";
import { Style, Stroke, Text } from "ol/style";
import { asArray, asString } from "ol/color";
import { Legend, PropsFeature } from "../types";
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
import { GeoFeaturesLoader } from "./geo-features-loader";

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
  // Overwrite getGeoFeaturesLoader is required for minZoomLevel
  public readonly minZoomLevel: number | undefined = undefined;
  public description: string | undefined = undefined;
  public reloadLayerOnNextSelection = false;
  public loadedLayer: VectorGeoLayer | undefined;
  public appLayerCheckbox: IAppGeoJsonLayerCheckbox & BaseAuthComponent | undefined;

  public readonly events = new SequentialEventEmitter();

  protected showPcsZoomLevel = 15;
  
  protected geoFeaturesLoader: GeoFeaturesLoader | undefined = undefined;

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
        await this.loadAndAddExtend();
      }
    }

    this.initiallyLoadedBeforeSelected = false;

    await this.emitOnSelected();
  }

  protected async emitOnSelected() {
    await this.events.emit(LayerEvent.ON_SELECTED, this);
  }

  protected async getGeoFeaturesLoader(): Promise<GeoFeaturesLoader | undefined> {
    return undefined;
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
      if (this.geoFeaturesLoader === undefined) {
        this.geoFeaturesLoader = await this.getGeoFeaturesLoader();
        if (this.geoFeaturesLoader !== undefined) {
          const onLoadExtend = debounce(async () => {
            if (this.selected) {
              await this.loadAndAddExtend();
            }
          }, 100);
          
          this.getMap()!.getView().on("change:center", onLoadExtend);
          this.getMap()!.getView().on("change:resolution", onLoadExtend);
        } else {
          throw new Error("Layer \"" + this.name + "\" with \"minZoomLevel\" but without geoFeaturesLoader");
        }
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

  protected async loadAndAddExtend() {
    try {
      await this.setLoading(false);
      await this.appLayerCheckbox?.$nextTick()

      const geoJson = await this.loadExtent();
      if (geoJson) {
        this.addLoadedFeatures(geoJson);
      }
    } finally {
      await this.setLoading(false);
    }
  }

  protected async loadExtent(): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      await this.setLoading(true);

      const map = this.getMap()!;
      const view = map.getView();
      const zoomLevel = view.getZoom();

      if (zoomLevel! >= this.minZoomLevel!) {
        if (this.geoFeaturesLoader === undefined) {
          throw new Error("Cannot load extent. geoFeaturesLoader is undefined...");
        }

        const extent = transformExtent(
          view.calculateExtent(map.getSize()),
          GEO_JSON_OPTIONS.featureProjection,
          GEO_JSON_OPTIONS.dataProjection
        );

        const minLong = extent[0];
        const minLat = extent[1];
        const maxLong = extent[2];
        const maxLat = extent[3];

        return this.geoFeaturesLoader.findFeatures(minLong, maxLong, minLat, maxLat);
      }

      return undefined;
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    } finally {
      await this.setLoading(false);
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

  public async reselect() {
    if (this.loadedLayer) {
      this.reloadLayer();
      
      if (this.selected) {
        await this.setSelected(false);
        await this.setSelected(true);
      }
    }
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
