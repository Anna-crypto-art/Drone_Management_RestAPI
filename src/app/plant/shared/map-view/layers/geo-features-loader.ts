import { GeoJSON } from "@/app/shared/components/app-map/types";
import { findSortIndex } from "@/app/shared/services/helper/sort-helper";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { PropsFeature } from "../types";

class GeoFeature {
  private geoJson: any | null = null;

  constructor(
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly pcs: string,
    public readonly featureType: string,
    public readonly coordinates: string,
    public readonly componentId: ApiComponent,
  ) {}

  public toGeoJson(): any {
    if (!this.geoJson) {
      this.geoJson = {
        type: "Feature",
        geometry: {
          type: this.featureType,
          coordinates: this.getCoordinates(),
        },
        properties: {
          name: this.pcs
        }
      };
    }
    
    return this.geoJson;
  }

  private getCoordinates(): any {
    const coordinates = JSON.parse(this.coordinates);

    switch (this.componentId) {
      case ApiComponent.CSP_PTC_MIRROR:
        return [[...coordinates, coordinates[0]]];

      case ApiComponent.PV_MODULE:
        return [[coordinates[0], coordinates[2], coordinates[3], coordinates[1], coordinates[0]]];
    }

    return coordinates;
  }

  public get loaded(): boolean {
    return this.geoJson !== null;
  }
}

export interface GeoLatFeature {
  lat: number;
  geoFeatures: GeoFeature[];
}

export interface GeoLongFeatures {
  long: number;
  latFeatures: GeoLatFeature[];
}

export class GeoFeaturesLoader {
  private longs: GeoLongFeatures[] = [];

  constructor(
    private readonly plant: PlantSchema,
    private readonly componentId: ApiComponent
  ) {}

  async load() {
    const plainCsv = await volateqApi.getComponentsGeoVisualCsv(this.plant.id, [this.componentId])

    const precision = 100000; // GPS fifth decimal place. Has a precision worth up to 1.1m
    const longs: Record<number, { features: GeoLongFeatures, lats: Record<number, GeoLatFeature> }> = {};

    const rows = plainCsv.split("\n");
    rows.splice(0, 1); // Skip header

    for (const row of rows) {
      if (!row.trim()) {
        continue;
      }

      const geoFeature = this.createGeoFeatureByCSVRow(row);

      // Performance has the price of complexity...
      // Building up a 2D (Longitude, Latitude) sorted matrix

      const long = Math.floor(geoFeature.longitude * precision) / precision;
      if (!(long in longs)) {
        longs[long] = { features: { long, latFeatures: [] }, lats: {}};

        const longSortIndex = findSortIndex(this.longs, long, (e) => e.long);
        this.longs.splice(longSortIndex, 0, longs[long].features);
      }

      const lat = Math.floor(geoFeature.latitude * precision) / precision;
      if (!(lat in longs[long].lats)) {
        longs[long].lats[lat] = { geoFeatures: [], lat };

        const latSortIndex = findSortIndex(longs[long].features.latFeatures, lat, (e) => e.lat);
        longs[long].features.latFeatures.splice(latSortIndex, 0, longs[long].lats[lat])
      }
      
      longs[long].lats[lat].geoFeatures.push(geoFeature);
    }
  }

  public findFeatures(minLong: number, maxLong: number, minLat: number, maxLat: number): GeoJSON<PropsFeature> {
    const features: any[] = [];

    const minLongIndex = findSortIndex(this.longs, minLong, (e) => e.long);
    const maxLongIndex = findSortIndex(this.longs, maxLong, (e) => e.long);

    for (let i = minLongIndex; i < maxLongIndex; i++) {
      const minLatIndex = findSortIndex(this.longs[i].latFeatures, minLat, (e) => e.lat);
      const maxLatIndex = findSortIndex(this.longs[i].latFeatures, maxLat, (e) => e.lat);

      for (let j = minLatIndex; j < maxLatIndex; j++) {
        for (const geoFeature of this.longs[i].latFeatures[j].geoFeatures) {
          if (!geoFeature.loaded) {
            features.push(geoFeature.toGeoJson());
          }
        }
      }
    }

    return { type: "FeatureCollection", features };
  }

  private createGeoFeatureByCSVRow(row: string): GeoFeature {
    const cols = row.split(";");

    const pcs = cols[0];
    const positionsLongLat: [number, number] = JSON.parse(cols[1]);
    const featureType = cols[2];
    const coordinations = cols[3];

    return new GeoFeature(positionsLongLat[0], positionsLongLat[1], pcs, featureType, coordinations, this.componentId);
  }
}