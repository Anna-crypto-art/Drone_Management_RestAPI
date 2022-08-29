import { Watch } from "vue-property-decorator";
import { RawLocation } from "vue-router";
import { AnalysisSelectionBaseComponent } from "./analysis-selection-sidebar/analysis-selection-base-component";
import { PlantRouteQuery } from "./types";

export abstract class RouteQueryAnalysisSelectionBaseComponent 
extends AnalysisSelectionBaseComponent {
  protected closedEyes = false;

  @Watch("$route.query", { deep: true, immediate: true})
  async onRouteQueryChanged(newQuery: PlantRouteQuery, oldQuery: PlantRouteQuery) {
    if (this.closedEyes) {
      return;
    }

    if (newQuery.view && (!oldQuery || newQuery.view !== oldQuery.view)) {
      await this.onViewChanged(newQuery);
    }

    if (newQuery.result && (!oldQuery || newQuery.result !== oldQuery.result)) {
      await this.onResultChanged(newQuery);
    }

    if (newQuery.pi && (!oldQuery || newQuery.pi !== oldQuery.pi) ||
      newQuery.piclass && (!oldQuery || newQuery.piclass !== oldQuery.piclass)
    ) {
      await this.onPiChanged(newQuery);
    }

    if (newQuery.component && (!oldQuery || newQuery.component !== oldQuery.component)) {
      await this.onComponentChanged(newQuery);
    }
  }

  protected async onViewChanged(query: PlantRouteQuery) { /* overide me */ }
  protected async onResultChanged(query: PlantRouteQuery) { /* overide me */ }
  protected async onPiChanged(query: PlantRouteQuery) { /* overide me */ }
  protected async onComponentChanged(query: PlantRouteQuery) { /* overide me */ }

  protected pushRoute(query: PlantRouteQuery, watchChanges = false) {
    console.log("pushRoute")
    console.log(query)

    this.closedEyes = !watchChanges;
    try {
      if (this.hasQueryChanged(query)) {
        this.$router.push(this.getRoute(query));
      }
    } finally {
      this.closedEyes = false;
    }
  }

  protected updateRoute(query: PlantRouteQuery, watchChanges = false) {
    console.log(query);

    this.closedEyes = !watchChanges;
    try {
      if (this.hasQueryChanged(query)) {
        this.$route.query = this.createNewQuery(query) as any;
      }
    } finally {
      this.closedEyes = false;
    }
  }

  private hasQueryChanged(query: PlantRouteQuery): boolean {
    for (const key of Object.keys(query)) {
      if (query[key] !== this.$route.query[key]) {
        return true;
      }
    }

    return false;
  }

  private createNewQuery(query: PlantRouteQuery): PlantRouteQuery {
    const newQuery: PlantRouteQuery = JSON.parse(JSON.stringify(this.$route.query));

    for (const key of Object.keys(query)) {
      newQuery[key] = query[key];
    }

    return newQuery;
  }

  private getRoute(query: PlantRouteQuery): RawLocation {
    return { 
      name: "Plant", 
      params: { id: this.plant.id },
      query: this.createNewQuery(query) as any,
    }
  }
}