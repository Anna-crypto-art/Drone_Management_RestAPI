<template>
  <div v-show="visible" :class="'layer-display ' + layer.styleClass">
    <b-form-checkbox v-if="!layer.isGroup" :checked="layer.selected" @change="onChange">
      <slot :name="layer.name">{{ layer.name }}</slot>
    </b-form-checkbox>
    <h3 v-if="layer.isGroup && layer.name" :class="'layer-display-group-level-' + layerGroupLevel">
      <slot :name="layer.name">{{ layer.name }}</slot>
    </h3>
    <div v-if="layer.hasChildrens" class="layer-sublayers">
      <app-geovisual-layer-display v-for="(childLayer, layerIndex) in layer.getChildLayers()" :layer="childLayer" :key="layerIndex">
        <!-- Pass slots through -->
        <template v-for="(_, slot) in $slots">
          <template :slot="slot">
            <slot :name="slot"></slot>
          </template>
        </template>
      </app-geovisual-layer-display>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import { LayerStructure } from "../layer-structure";

@Component({
  name: "app-geovisual-layer-display",
})
export default class AppGeovisualLayerDisplay extends Vue {
  @Prop() layer!: LayerStructure;

  onChange(e: boolean): void {
    // groupSelection: If set to true all other groups on same level (siblings) will be unselected
    let groupSelectionLayer = this.layer.parentLayer;
    while (groupSelectionLayer && !groupSelectionLayer.groupSelection) {
      groupSelectionLayer = groupSelectionLayer?.parentLayer;
    }
    if (groupSelectionLayer && groupSelectionLayer.parentLayer) {
      for (const childLayer of groupSelectionLayer.parentLayer.getChildLayers()) {
        if (childLayer.name !== groupSelectionLayer.name) {
          childLayer.selected = false;
        }
      }
    }

    if (this.layer.parentLayer?.singleSelection) {
      this.layer.parentLayer?.getChildLayers().forEach(sibling => {
        if (sibling.selected) {
          sibling.selected = false;
        }
      });
    }

    this.layer.selected = e;
  }

  get visible(): boolean {
    return this.layer.visible;
  }

  @Watch('visible')
  onVisibleChanged(): void {
    if (!this.visible) {
      this.onChange(false);
    }
  }

  get layerGroupLevel(): number {
    let level = 0;
    let parentLayer: LayerStructure | undefined = this.layer.parentLayer;
    while (parentLayer && level < 3) {
      level++;
      parentLayer = parentLayer.parentLayer;
    }

    return level;
  }

}
</script>

<style lang="scss">
.layer-display {
  padding-left: 20px;
  &-group-level-1 {
    font-size: 1.5rem;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  &-group-level-2 {
    margin-top: 0;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
  &-group-level-3 {
    margin-top: 0;
    font-size: 1.1rem;
    margin-top: 10px;
  }
  &.margin-top {
    margin-top: 30px;
  }
}
</style>