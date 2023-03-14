import { FeatureLike } from "ol/Feature";
import { Extent } from "ol/extent";
import { Map } from "ol";
import { Style, Stroke, Text, Fill } from "ol/style";
import { asArray, asString } from "ol/color";
import { FeatureInfoGroup, FeatureInfos, FeatureInfosMeta, IPlantVisualization, Legend, PropsFeature } from "../types";
import { GeoJSON, GeoJSONLayer, VectorGeoLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import GeoJSONFeatures from "ol/format/GeoJSON";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { Geolocation, Feature, View } from "ol";
import CircleStyle from "ol/style/Circle";
import { Point } from "ol/geom";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { LayerEvent } from "@/app/shared/components/app-geovisualization/types/events";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { ReferenceMeasurementEntriesSchema, RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { SimpleAnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { transformExtent } from "ol/proj";
import { debounce } from "@/app/shared/services/helper/debounce-helper";

export const GEO_JSON_OPTIONS = { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" };

/**
 * Represents a geojson layer
 */
export abstract class LayerBase {
  private _showPCS = false;

  private accuracyFeature?: Feature;
  private positionFeature?: Feature;
  private geolocation?: Geolocation;

  protected geoLayerObject?: GeoJSONLayer;

  protected abstract readonly name: string;
  protected selected = false;
  protected readonly autoZoom: boolean = false;
  protected visible = true;
  protected zIndex?: number;
  protected showPcsZoomLevel = 15;
  protected refreshLayer = false;
  protected readonly events = new SequentialEventEmitter();

  protected readonly minZoomLevel: number | undefined = undefined;
  protected zoomLoadedPcsCodes: Record<string, true> | undefined = undefined;
  protected loadedExtent: Extent | undefined = undefined;

  public invisibleAutoSelection?: boolean;

  constructor(public readonly vueComponent: BaseAuthComponent & IPlantVisualization) {}

  protected abstract getPcs(feature: FeatureLike): string | undefined;
  protected abstract load(extent?: Extent): Promise<GeoJSON<PropsFeature> | undefined>;
  public abstract get id(): string | undefined;

  protected getAddStyles(feature: FeatureLike): Style[] | undefined {
    return undefined;
  }

  protected getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  private style(feature: FeatureLike): Style | Style[] {
    const addStyles = this.getAddStyles(feature);
    if (addStyles) {
      return [...addStyles, this.getStyle(feature)];
    }

    return this.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    return undefined;
  }

  protected onSelected(selected: boolean): void { 
    this.selected = selected;
  }

  protected onZoom(onZoomCallback: (zoomLevel: number | undefined) => void): void {
    const map = this.vueComponent.openLayers?.getMap();
    if (map) {
      const view = map.getView();
      view.on("change:resolution", (e) => {
        const zoom = view.getZoom(); 

        onZoomCallback(zoom);
      });
    }
  }

  private async doLoad(): Promise<GeoJSON<PropsFeature> | undefined> {
    if (this.minZoomLevel) {
      if (this.zoomLoadedPcsCodes === undefined) { // is "change:center" event is already registered
        this.zoomLoadedPcsCodes = {};
        
        this.getMap()!.getView().on("change:center", debounce(async () => { 
          const geoJson = await this.loadExtent();
          if (geoJson) {
            this.addLoadedFeatures(geoJson);
          }
        }, 100));
      }

      const geoJson = await this.loadExtent();
      if (geoJson) {
        return geoJson;
      }

      this.vueComponent.showInfo(
        this.vueComponent.$t(
          "zoom-in-to-see-features", 
          { features: this.vueComponent.$t("absorber-tubes").toString() },
        ).toString(),
      );

      return { type: "FeatureCollection", features: [] }; // Empty layer
    }

    return this.load();
  }

  protected async addLoadedFeatures(geoJson: GeoJSON<PropsFeature>) {
    const source = this.getVectorGeoLayer()?.getSource();
    if (!source) {
      throw Error("Missing layer source for loading geo data within extent")
    }

    const geometryFeatures = new GeoJSONFeatures(GEO_JSON_OPTIONS).readFeatures(geoJson);
    source.addFeatures(geometryFeatures);
  }

  protected async loadExtent(): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      this.vueComponent.setLoading(true);
      
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
      this.vueComponent.showError(e);
    } finally {
      this.vueComponent.setLoading(false);
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

  protected getMap(): Map | undefined {
    return this.vueComponent.openLayers?.getMap();
  }

  protected getName(): string {
    return this.name;
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
    this.refreshLayer = true;
    if (this.geoLayerObject) {
      this.geoLayerObject.reloadLayer = this.refreshLayer;
    }
  }

  public toGeoLayer(): GeoJSONLayer {
    if (!this.geoLayerObject) {
      this.geoLayerObject = {
        type: "geojson",
        name: this.getName(),
        description: this.getDescription(),
        selected: this.selected,
        autoZoom: this.autoZoom,
        geoJSONLoader: () => this.doLoad(),
        geoJSONOptions: GEO_JSON_OPTIONS,
        style: (feature: FeatureLike) => this.style(feature),
        onSelected: (selected: boolean) => this.onSelected(selected),
        visible: this.visible && !this.invisibleAutoSelection,
        zIndex: this.zIndex,
        layerType: "VectorImageLayer",
        reloadLayer: this.refreshLayer,
        id: this.id,
        events: this.events,
        minZoom: this.minZoomLevel,
      };
    }

    return this.geoLayerObject;
  }

  public async setSelected(selected: boolean) {
    await this.events.emit(LayerEvent.SET_SELECTED, selected);
  }

  public getSelected(): boolean {
    return this.selected;
  }

  public setVisible(visible: boolean) {
    if (!this.invisibleAutoSelection) {
      this.visible = visible;
      if (this.geoLayerObject) {
        this.geoLayerObject.visible = this.visible;
      }
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
    return (this.vueComponent.openLayers!.getMap().getView().getZoom() || 0) >= this.showPcsZoomLevel;
  }

  protected getComplementColor(color: string): string {
    return "#" + (0xffffff ^ parseInt(color.replace("#", "0x"))).toString(16);
  }

  public getColorWithAlpha(color: string, alpha: number): string {
    const [r, g, b] = Array.from(asArray(color));
    return asString([r, g, b, alpha]);
  }

  public getVectorGeoLayer(): VectorGeoLayer | undefined {
    return this.vueComponent.openLayers!.getMap().getAllLayers().find(layer => layer.getProperties()['id'] === this.id) as VectorGeoLayer;
  }

  public addGeolocationFeature(): void {
    // Code stolen and adapted from https://openlayers.org/en/latest/examples/geolocation.html

    this.geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.vueComponent.openLayers!.getMap().getView().getProjection(),
    });
    
    this.geolocation.on('error', function (error) {
      console.error("Geolocation error...");
      console.error(error);
    });
    
    this.accuracyFeature = new Feature();
    this.geolocation.on('change:accuracyGeometry', () => {
      this.accuracyFeature!.setGeometry(this.geolocation!.getAccuracyGeometry() || undefined);
    });
    
    this.positionFeature = new Feature();
    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    
    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation!.getPosition();
      this.positionFeature!.setGeometry(coordinates ? new Point(coordinates) : undefined);
    });
    
    this.getVectorGeoLayer()?.getSource()?.addFeatures([this.accuracyFeature, this.positionFeature]);

    this.geolocation.setTracking(true);
  }

  public removeGeolocationFeature(): void {
    if (this.geolocation) {
      this.geolocation!.setTracking(false);
      this.geolocation = undefined;
    }

    if (this.positionFeature) {
      this.getVectorGeoLayer()?.getSource()?.removeFeature(this.positionFeature);
      this.positionFeature = undefined;
    }

    if (this.accuracyFeature) {
      this.getVectorGeoLayer()?.getSource()?.removeFeature(this.accuracyFeature);
      this.accuracyFeature = undefined;
    }
  }

  public async rerender() {
    if (this.selected) {
      await this.setSelected(false);
    }
    await this.setSelected(true);

    this.rerenderMap();
  }

  public rerenderMap() {
    this.getVectorGeoLayer()?.changed();
  }

  public async onClick(
    feature: FeatureLike,
    featureInfosMeta: FeatureInfosMeta,
  ): Promise<FeatureInfos | undefined> { 
    return undefined;
  }

  protected async getRefMeasureFeatureInfos(
    featureInfosMeta: FeatureInfosMeta,
    analysisId: string | null,
  ): Promise<FeatureInfos | undefined> {
    if (featureInfosMeta.refMeasureEntries) { // add ref measure action has been added, already
      return undefined
    }

    const featureInfoGroups: FeatureInfoGroup[] = [];
    const mappings = AnalysisResultMappingHelper.getMappingsByComponentId(featureInfosMeta.fieldgeoComponent!.component_id);

    let myRefMeasureEntry: RefMeasureEntry | null = null;
    let myRefMeasureEntryKeyFigures: RefMeasureEntryKeyFigureSchema[] | null = null;

    if (analysisId && mappings && this.vueComponent.refMeasuredPcsCodes.includes(featureInfosMeta.fieldgeoComponent!.kks)) {
      const mappingHelper = new AnalysisResultMappingHelper(mappings)
      
      const refMeasureEntries = await volateqApi.getReferenceMeasurementEntries(
        analysisId, 
        { pcs: featureInfosMeta.fieldgeoComponent!.kks }
      );
      featureInfosMeta.refMeasureEntries = refMeasureEntries;

      for (const refMeasureEntry of refMeasureEntries.entries) {
        const featureInfoGroup: FeatureInfoGroup = {
          title: this.vueComponent.$t("reference-measurement-of", { user: refMeasureEntry.user.name }).toString(),
          records: [
            { 
              name: this.vueComponent.$t("measure-timestamp").toString(), 
              value: dateHelper.toDateTime(refMeasureEntry.measure_time),
            }
          ],
        };

        if (refMeasureEntry.notes) {
          featureInfoGroup.records.push({
            name: this.vueComponent.$t("notes").toString(),
            value: refMeasureEntry.notes,
          });
        }

        const rmMappingEntries = mappingHelper.getRefMeasureEntries(refMeasureEntry, refMeasureEntries.key_figures)
        for (const rmMappingEntry of rmMappingEntries) {
          featureInfoGroup.records.push(
            mappingHelper.toFeatureInfo(
              rmMappingEntry.entry,
              rmMappingEntry.value.toString(),
            )
          );
        }

        featureInfoGroups.push(featureInfoGroup);

        if (refMeasureEntry.editable) {
          myRefMeasureEntry = refMeasureEntry;
          myRefMeasureEntryKeyFigures = refMeasureEntries.key_figures;
        }
      }
    }

    const actionName = myRefMeasureEntry ? "edit-reference-measurement" : "add-reference-measurement";

    return {
      title: featureInfosMeta.fieldgeoComponent!.kks,
      groups: featureInfoGroups,
      actionsSummaries: [
        { 
          buttonVariant: "secondary",
          name: this.vueComponent.$t(actionName).toString(),
          actions: [
            {
              name: this.vueComponent.$t(actionName).toString(),
              action: async () => {
                this.vueComponent.showRefMeasureModal(featureInfosMeta.fieldgeoComponent!, myRefMeasureEntry, myRefMeasureEntryKeyFigures);
              }
            }
          ]
        }
      ]
    }
  }
}
