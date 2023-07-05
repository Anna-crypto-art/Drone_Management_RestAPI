import { GroupLayer, LayerType } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColorScheme, KeyFigureInfo, OrthoImage } from "./layers/types";
import { GroupKPILayer, InvisibleAutoSelectionLayer, KeyFigureTypeMap } from "./types";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { LayerEvent } from "@/app/shared/components/app-geovisualization/types/events";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

/**
 * Component -> PIGroup -> PICheckbox
 * Component -> PICheckbox
 */
export class PILayersHierarchy {
  private readonly parentComponentKpiLayers: GroupKPILayer[];
  // Each groupLayer refs to the groupLayer object in parentComponentKpiLayers
  public readonly groupLayers: LayerType[];
  private readonly analysisResultIds: string[];
  private selectedAnalysisResultId: string | undefined;
  private compareAnylysisResultId: string | undefined;

  private raiseOnLayerSelected = true;

  constructor(
    private readonly vueComponent: Vue,
    private readonly analysisResults: AnalysisResultDetailedSchema[],
    private readonly keyFigureLayers: KeyFigureTypeMap<GeoVisualQuery>[],
    private showUndefined: boolean,
    private multiSelection: boolean,
  ) {
    this.parentComponentKpiLayers = [];
    this.groupLayers = [];
    this.analysisResultIds = [];

    this.createParentComponentKpiLayers();
  }

  public addAndSelectAnalysisResult(analysisResultId: string | undefined): boolean {
    this.selectedAnalysisResultId = analysisResultId
    
    if (analysisResultId && !this.analysisResultIds.find(id => id === analysisResultId)) {
      this.analysisResultIds.push(analysisResultId);

      this.updateGroupedKPILayers();

      return true;
    }

    return false;
  }

  public getAllChildLayers(): KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[] {
    const allChildLayers: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[] = [];

    function getAllChildLayersRec(groupKpiLayers: GroupKPILayer[]) {
      for (const groupKpiLayer of groupKpiLayers) {
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          allChildLayers.push(keyFigureLayer);
        }

        groupKpiLayer.subGroupLayers && getAllChildLayersRec(groupKpiLayer.subGroupLayers);
      }
    }

    getAllChildLayersRec(this.parentComponentKpiLayers);

    return allChildLayers;
  }

  private getInvisibleAutoSelectionLayers(): InvisibleAutoSelectionLayer[] {
    const autoSelLayers: InvisibleAutoSelectionLayer[] = [];

    function findGroupKPILayersRec(groupKpiLayers: GroupKPILayer[]) {
      for (const groupKpiLayer of groupKpiLayers) {
        if (groupKpiLayer.keyFigureLayers.length > 0) {
          const invsibleAutoSelectionLayer = groupKpiLayer.keyFigureLayers.find(l => l.invisibleAutoSelection);
          if (invsibleAutoSelectionLayer) {
            const selectedLayers = groupKpiLayer.keyFigureLayers.filter(l => l.getSelected() && !l.invisibleAutoSelection);
            autoSelLayers.push({
              layer: invsibleAutoSelectionLayer,
              hasSelectedSiblings: selectedLayers.length > 0,
            });
          }
        }

        groupKpiLayer.subGroupLayers && findGroupKPILayersRec(groupKpiLayer.subGroupLayers);
      }
    }

    findGroupKPILayersRec(this.parentComponentKpiLayers);

    return autoSelLayers;
  }

  public toggleMultiSelectionDeep(multiSelection: boolean) {
    for (const componentId in this.parentComponentKpiLayers) {
      if (this.parentComponentKpiLayers[componentId].subGroupLayers) {
        for (const childLayer of this.parentComponentKpiLayers[componentId].groupLayer.childLayers) {
          (childLayer as GroupLayer).singleSelection = !multiSelection;
        }
      }
    }
  }

  public toggleMultiSelection(multiSelection: boolean): void {
    this.multiSelection = multiSelection;

    for (const componentId in this.parentComponentKpiLayers) {
      this.parentComponentKpiLayers[componentId].groupLayer.singleSelection = !multiSelection;
    }
  }

  public async reselectAllLayers(multiSelection: boolean) {
    const allChildLayers = this.getAllChildLayers();

    const selectedKeyFigureIds = allChildLayers.filter(childLayer => childLayer.getSelected())
    .map(childLayer => childLayer.keyFigureId);
        
    for (const childLayer of allChildLayers) {
      childLayer.setColorScheme(multiSelection ? KeyFigureColorScheme.RAINBOW : KeyFigureColorScheme.TRAFFIC_LIGHT);

      // continue here! Find a solution to not always reload
      childLayer.reloadLayer(); 
      await childLayer.setSelected(false);
    }

    const reselectOneLayerOnly = !multiSelection;
    for (const childLayer of allChildLayers) {
      
      if (selectedKeyFigureIds.includes(childLayer.keyFigureId) &&
        childLayer.analysisResult.id === this.selectedAnalysisResultId &&
        !childLayer.invisibleAutoSelection) // layers with "invisibleAutoSelection" gets reselected automatically.
      {
        await childLayer.setSelected(true);

        if (reselectOneLayerOnly) {
          break;
        }
      }
    }
  }

  public async rerenderSelectedLayers() {
    const selectedLayers = this.getAllChildLayers().filter(childLayer => childLayer.getSelected());
    for (const selectedLayer of selectedLayers) {
      await selectedLayer.rerender();
    }
  }

  public async toggleShowUndefined(showUndefined: boolean, reselectLayer = true): Promise<void> {
    this.showUndefined = showUndefined

    for (const childLayer of this.getAllChildLayers()) {
      if (childLayer.query?.undefined !== undefined && 
        !childLayer.invisibleAutoSelection && 
        childLayer.keyFigureInfo.displayName !== "not-measured"
      ) {
        childLayer.query.undefined = showUndefined ? 1 : 0;
        if (reselectLayer) {
          childLayer.reloadLayer();
        }

        if (reselectLayer && childLayer.getSelected()) {
          await childLayer.setSelected(false);
          await childLayer.setSelected(true);
        }
      }

      if (reselectLayer) {
        for (const invAutoSelLayer of this.getInvisibleAutoSelectionLayers()) {
          if (showUndefined && invAutoSelLayer.hasSelectedSiblings && !invAutoSelLayer.layer.getSelected()) {
            await invAutoSelLayer.layer.setSelected(true);
          }
          if (!showUndefined && invAutoSelLayer.layer.getSelected()) {
            await invAutoSelLayer.layer.setSelected(false);
          }
        }
      }
    }
  }

  public setCompareAnalysisResult(analysisResult: AnalysisResultDetailedSchema | null) {
    this.compareAnylysisResultId = analysisResult?.id;

    for (const childLayer of this.getAllChildLayers()) {
      childLayer.setCompareAnalysisResult(analysisResult);
      if (childLayer.isCompareEnabled) {
        childLayer.reloadLayer();
      }
    }
  }

  public async selectKeyFigureLayer(keyFigureId: ApiKeyFigure) {
    const keyFigureLayer = this.getAllChildLayers().find(keyFigureLayer => 
      keyFigureLayer.isVisible && keyFigureLayer.keyFigureId === keyFigureId);
    if (keyFigureLayer && !keyFigureLayer.getSelected()) {
      await keyFigureLayer.setSelected(true);
    }
  }

  public async selectLayers(layerNames: string[]) {
    const layers = this.getAllChildLayers().filter(keyFigureLayer => 
      keyFigureLayer.isVisible && layerNames.includes(keyFigureLayer.name) && !keyFigureLayer.getSelected())
    for (const layer of layers) {

      // continue here... select multiple layer if singleSelection is false!!
      this.getParentComponentLayer()


      layer.setSelected(true)
    }
  }

  private getParentGroupLayer(childLayerId: string): GroupLayer | undefined {
    function findParentGroupLayerRec(groupKpiLayers: GroupKPILayer[]): GroupLayer | undefined {
      for (const parentLayer of groupKpiLayers) {
        if (parentLayer.keyFigureLayers.find(l => l.id == childLayerId)) {
          return parentLayer.groupLayer;
        }

        if (parentLayer.subGroupLayers) {
          const groupLayer = findParentGroupLayerRec(parentLayer.subGroupLayers)
          if (groupLayer) {
            return groupLayer;
          }
        }
      }
    }

    return findParentGroupLayerRec(this.parentComponentKpiLayers);
  }

  private updateGroupedKPILayers() {
    const currentChildLayers = this.getAllChildLayers();

    for (const analysisResultIds of this.analysisResultIds) {
      const analysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultIds)!;
      for (const keyFigureTypeMap of this.keyFigureLayers) {
        const keyFigure: KeyFigureSchema | undefined = analysisResult.key_figures
          .find(keyFigure => keyFigure.id === keyFigureTypeMap.keyFigureId);
        const isNewAnalysisResult = !currentChildLayers
          .find(keyFigureLayer => keyFigureLayer.analysisResult.id === analysisResult.id);

        if (keyFigure && isNewAnalysisResult) {
          const parentComponentKpiLayer = this.getParentComponentLayer(keyFigure)

          const kpiLayer = this.createKPILayers(analysisResult, keyFigureTypeMap);
          if (kpiLayer) {
            if (kpiLayer instanceof KeyFigureLayer) {
              parentComponentKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
              parentComponentKpiLayer.keyFigureLayers.push(kpiLayer);
            } else {
              parentComponentKpiLayer.groupLayer.childLayers.push(kpiLayer.groupLayer);
              parentComponentKpiLayer.subGroupLayers!.push(kpiLayer);
            }
          }
        }
      }
    }
  }

  public updateVisibility(): void {
    const setVisibilityRec = (groupKpiLayers: GroupKPILayer[]) => {
      let allInvisble = true;
      for (const groupKpiLayer of groupKpiLayers) {
        let allKeyFiguresInvisible = true;
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          let visible = (this.selectedAnalysisResultId && keyFigureLayer.analysisResult.id == this.selectedAnalysisResultId) || false;
          if (visible && this.compareAnylysisResultId) {
            visible = keyFigureLayer.hasKeyFigureForCompareAnalysisResult();
          }

          console.log(`keyFigureLayer(${keyFigureLayer.id}).setVisible(${visible})`)

          keyFigureLayer.setVisible(visible);

          if (visible) {
            allKeyFiguresInvisible = false;
          }
        }

        if (groupKpiLayer.subGroupLayers && groupKpiLayer.subGroupLayers.length > 0) {
          const childLayersVisible = setVisibilityRec(groupKpiLayer.subGroupLayers);
          groupKpiLayer.groupLayer.visible = !allKeyFiguresInvisible || childLayersVisible;
        } else {
          groupKpiLayer.groupLayer.visible = !allKeyFiguresInvisible;
        }

        if (!allKeyFiguresInvisible) {
          allInvisble = false;
        }
      }

      return !allInvisble;
    }
    
    setVisibilityRec(this.parentComponentKpiLayers);
  }

  public clearOrthoImages(): void {
    for (const layer of this.getAllChildLayers()) {
      layer.removeOrthoImageFeatures();
    }
  }

  public getAvailableOrthoImages(): OrthoImage[] {
    for (const layer of this.getAllChildLayers()) {
      if (layer.isVisible) {
        const orthoImages = layer.orthoImages?.filter(orthoImage => orthoImage.available);
        if (orthoImages && orthoImages.length > 0) {
          return orthoImages;
        }
      }
    }

    return [];
  }

  public getSelectedAnalysisResultId(): string | undefined {
    return this.selectedAnalysisResultId;
  }

  public getCompareAnalysisResultId(): string | undefined {
    return this.compareAnylysisResultId;
  }

  public async onLayerSelected() {
    if (this.showUndefined && this.raiseOnLayerSelected) {
      this.raiseOnLayerSelected = false;

      for (const invAutoSelLayer of this.getInvisibleAutoSelectionLayers()) {
        if (!invAutoSelLayer.hasSelectedSiblings && invAutoSelLayer.layer.getSelected()) {
          await invAutoSelLayer.layer.setSelected(false);
        } else if (invAutoSelLayer.hasSelectedSiblings && !invAutoSelLayer.layer.getSelected()) {
          await invAutoSelLayer.layer.setSelected(true);
        }
      }

      this.raiseOnLayerSelected = true;
    }
  }

  public getSelectedLayers(): KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[] {
    return this.getAllChildLayers().filter(childLayer => childLayer.getSelected())
  }

  public async collapseFirstParentComponentLayer(): Promise<void> {
    if (this.getSelectedLayers().length === 0) {
      const parentComponentKpiLayer = this.parentComponentKpiLayers.find(p => p.groupLayer.collapsable && p.groupLayer.visible);
      if (parentComponentKpiLayer) {
        parentComponentKpiLayer.groupLayer.events!.emit(LayerEvent.COLLAPSE, true);
      }
    }
  }

  private getParentComponentLayer(keyFigure: KeyFigureSchema): GroupKPILayer {
    return this.parentComponentKpiLayers
      .find(parentComponentKpiLayer => parentComponentKpiLayer.componentId === keyFigure.component_id)!;
  }

  private createParentComponentKpiLayers() {
    for (const apiComponent in apiComponentNames) {
      const parentComponentKpiLayer: GroupKPILayer = {
        componentId: Number(apiComponent),
        groupLayer: {
          name: this.vueComponent.$t(apiComponentNames[apiComponent]).toString(),
          type: "group",
          childLayers: [],
          visible: false,
          singleSelection: true,
          collapsable: true,
          events: new SequentialEventEmitter(),
        },
        keyFigureLayers: [],
        subGroupLayers: [],
      };

      this.parentComponentKpiLayers.push(parentComponentKpiLayer);
      this.groupLayers.push(parentComponentKpiLayer.groupLayer);
    }
  }

  private createKPILayers(
    anaysisResult: AnalysisResultDetailedSchema,
    keyFigureLayer: KeyFigureTypeMap<GeoVisualQuery>
  ): KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery> | GroupKPILayer {
    if (!keyFigureLayer.subLayers) {
      return new keyFigureLayer.layerType(
        this.vueComponent,
        anaysisResult,
        keyFigureLayer.keyFigureId,
        keyFigureLayer.keyFigureInfo,
        keyFigureLayer.query,
        keyFigureLayer.color,
      );
    }

    const groupKpiLayer: GroupKPILayer = {
      groupLayer: {
        name:
          keyFigureLayer.keyFigureInfo?.templateName ||
          this.vueComponent.$t(keyFigureLayer.keyFigureInfo!.keyName!).toString(),
        type: "group",
        childLayers: [],
        visible: false,
        singleSelection: false,
        id: `group__${anaysisResult.id}__${
          keyFigureLayer.keyFigureInfo?.keyName || keyFigureLayer.keyFigureInfo?.templateName || ""
        }`,
        description: keyFigureLayer.keyFigureInfo?.description && 
          this.vueComponent.$t(keyFigureLayer.keyFigureInfo.description).toString(),
      },
      keyFigureLayers: [],
    };

    for (const childLayer of keyFigureLayer.subLayers) {
      if (!childLayer.displayCondition || childLayer.displayCondition(anaysisResult)) {
        const childKeyFigureInfo: KeyFigureInfo = childLayer.keyFigureInfo || {};
        childKeyFigureInfo.displayName =
          childLayer.keyFigureInfo!.displayName || keyFigureLayer.keyFigureInfo?.displayName;
        childKeyFigureInfo.keyName = keyFigureLayer.keyFigureInfo?.keyName;

        const kpiLayer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery> = new keyFigureLayer.layerType(
          this.vueComponent,
          anaysisResult,
          keyFigureLayer.keyFigureId,
          childKeyFigureInfo,
          childLayer.query,
          childLayer.color,
          childLayer.invisibleAutoSelection,
        );

        groupKpiLayer.keyFigureLayers.push(kpiLayer);
        groupKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
      }
    }

    return groupKpiLayer;
  }
}
