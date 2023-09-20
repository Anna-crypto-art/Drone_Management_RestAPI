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
            const selectedLayers = groupKpiLayer.keyFigureLayers
              .filter(l => l.getSelected() && !l.invisibleAutoSelection && l.analysisResult.id === invsibleAutoSelectionLayer.analysisResult.id);
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

  public async reselectAllLayers(reload = false, slientSelection = false) {
    const allChildLayers = this.getAllChildLayers();

    const selectedLayerNames = allChildLayers.filter(childLayer => childLayer.getSelected())
      .map(childLayer => childLayer.noTransName);
        
    for (const childLayer of allChildLayers) {
      childLayer.setColorScheme(this.multiSelection ? KeyFigureColorScheme.RAINBOW : KeyFigureColorScheme.TRAFFIC_LIGHT);

      if (reload) {
        childLayer.reloadLayer(); 
      }

      if (childLayer.getSelected()) {
        await childLayer.setSelected(false);
      }
    }

    this.selectLayers(
      allChildLayers.filter(l => selectedLayerNames.includes(l.noTransName) &&
        l.analysisResult.id === this.selectedAnalysisResultId &&
        !l.invisibleAutoSelection // layers with "invisibleAutoSelection" gets reselected automatically.
      ),
      slientSelection // Selects the layers silent, if true. Because "IOpenLayersComponent.updateLayers" will selected them later
    )
  }

  public async rerenderSelectedLayers() {
    const selectedLayers = this.getAllChildLayers().filter(childLayer => childLayer.getSelected());
    for (const selectedLayer of selectedLayers) {
      await selectedLayer.rerender();
    }
  }

  public async toggleShowUndefined(showUndefined: boolean, reselectLayer = true, silentSelection = false): Promise<void> {
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
          silentSelection ? childLayer.selectSilent() : await childLayer.setSelected(true);
        }
      }

      if (reselectLayer) {
        for (const invAutoSelLayer of this.getInvisibleAutoSelectionLayers()) {
          if (showUndefined && invAutoSelLayer.hasSelectedSiblings && !invAutoSelLayer.layer.getSelected()) {
            silentSelection ? invAutoSelLayer.layer.selectSilent() : await invAutoSelLayer.layer.setSelected(true);
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

  /**
   * 
   * @param layersOrLayerNames 
   * @param silent silent selection sets "selected" to true but does not raise the LayerEvent.SET_SELECTED event.
   * This is necessary for the case geo-visualiazion.updateLayers gets called afterwards. 
   * Because geo-visualiazion.updateLayers recreates all layers and does select the layer then if true. 
   */
  public async selectLayers(
    layersOrLayerNames: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[] | string[],
    silent = false, 
  ) {
    if (layersOrLayerNames.length === 0) {
      return;
    }

    const layers: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[] = typeof layersOrLayerNames[0] === "string" ? 
      this.getAllChildLayers().filter(keyFigureLayer => 
        keyFigureLayer.isVisible && (layersOrLayerNames as string[]).includes(keyFigureLayer.noTransName) && !keyFigureLayer.getSelected())
      :
      layersOrLayerNames as KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[];

    let parentGroupLayer: GroupLayer | undefined = undefined
    for (const layer of layers) {
      if (this.multiSelection) {
        silent ? layer.selectSilent() : layer.setSelected(true);
      } else {
        // Only allow to select multiple layers when they are in the same group 
        // with singleSelection === false

        const currentParentGroupLayer = this.getParentGroupLayer(layer.id);

        if (parentGroupLayer === undefined || (
          currentParentGroupLayer && currentParentGroupLayer.id === parentGroupLayer!.id &&
          !parentGroupLayer!.singleSelection)
        ) {
          silent ? layer.selectSilent() : layer.setSelected(true);

          parentGroupLayer = currentParentGroupLayer;
        }
      }
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

      return undefined
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
        const orthoImages = layer.orthoImages?.filter(orthoImage => layer.isOrthoImageAvailable(orthoImage));
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
