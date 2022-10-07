import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import Vue from "vue";
import { RawLocation } from "vue-router";
import { PlantRouteQuery } from "../types";
import { EventEmitter } from "events";

export class RouteQueryHelper {
  private static event = new EventEmitter();

  public static emitQueryChanged() {
    RouteQueryHelper.event.emit("queryChanged");
  }

  constructor(private readonly vueComponent: Vue & { plant: PlantSchema }) {}

  public queryChanged(onQueryChanged: () => Promise<void>) {
    window.addEventListener('popstate', async (event) => {
      await onQueryChanged();
    });

    RouteQueryHelper.event.on("queryChanged", async () => await onQueryChanged());
  }

  public async pushRoute(query: PlantRouteQuery) {
    if (this.hasQueryChanged(query)) {
      await this.vueComponent.$router.push(this.getRoute(query));
    }
  }

  public async replaceRoute(query: PlantRouteQuery) {
    if (this.hasQueryChanged(query)) {
      await this.vueComponent.$router.replace(this.getRoute(query));
    }
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