import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import Vue from "vue";
import { Watch } from "vue-property-decorator";
import { RawLocation } from "vue-router";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import { PlantRouteQuery } from "../types";

export class RouteQueryHelper {
  constructor(private readonly vueComponent: Vue & { plant: PlantSchema }) {}

  public closedEyes = false;

  public async queryChanged(onQueryChanged: () => Promise<void>) {
    if (this.closedEyes) {
      return;
    }

    try {
      await onQueryChanged();
    } finally {
      this.closedEyes = false;
    }
  }

  public async pushRoute(query: PlantRouteQuery, watchChanges = false) {
    this.closedEyes = !watchChanges;

    if (this.hasQueryChanged(query)) {
      this.vueComponent.$router.push(this.getRoute(query));
    }

    await this.vueComponent.$nextTick();

    this.closedEyes = false;
  }

  public async replaceRoute(query: PlantRouteQuery, watchChanges = false) {
    this.closedEyes = !watchChanges;

    if (this.hasQueryChanged(query)) {
      this.vueComponent.$router.replace(this.getRoute(query));
    }

    await this.vueComponent.$nextTick();

    this.closedEyes = false;
  }

  private hasQueryChanged(query: PlantRouteQuery): boolean {
    for (const key of Object.keys(query)) {
      if (!this.isEqual(query[key], this.vueComponent.$route.query[key])) {
        return true;
      }
    }

    return false;
  }

  private createNewQuery(query: PlantRouteQuery): PlantRouteQuery {
    const newQuery: PlantRouteQuery = JSON.parse(JSON.stringify(this.vueComponent.$route.query));

    for (const key of Object.keys(query)) {
      newQuery[key] = query[key];
    }

    return newQuery;
  }

  private getRoute(query: PlantRouteQuery): RawLocation {
    return { 
      name: "Plant", 
      params: { id: this.vueComponent.plant.id },
      query: this.createNewQuery(query) as any,
    }
  }

  private isEqual(a: string | (string | null)[], b: string | (string | null)[]): boolean {
    if (!Array.isArray(a)) {
      a = [a];
    }
    if (!Array.isArray(b)) {
      b = [b];
    }

    a.sort();
    b.sort();

    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
}