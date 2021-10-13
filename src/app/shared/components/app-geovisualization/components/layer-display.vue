<template>
  <div v-show="visible" :class="'layer-display ' + layer.styleClass">
    <b-form-checkbox v-if="layer.isGroup" :checked="layer.selected" @change="onChange">
      {{ layer.name }}
    </b-form-checkbox>
    <h2 v-if="layer.isGroup && layer.name && !(layer.parentLayer && layer.parentLayer.parentLayer)" class="layer-display-group">{{ layer.name }}</h2>
    <h3 v-if="layer.isGroup && layer.name && (layer.parentLayer && layer.parentLayer.parentLayer)" class="layer-display-group-sub">{{ layer.name }}</h3>
    <div v-if="layer.hasChildrens" class="layer-sublayers">
      <app-geovisual-layer-display v-for="childLayer in layer.getChildLayers()" :layer="childLayer" :key="childLayer.name"></app-geovisual-layer-display>
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
export default class LayerDisplay extends Vue {
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
}
</script>

<style lang="scss">
.layer-display {
  padding-left: 20px;
  &-group {
    font-size: 1.5rem;
    margin-top: 20px;
  
    &-sub {
      font-size: 1.3rem;
      margin-top: 20px;
    }
  }
  .layer-switcher.open &.to-bottom {
    position: absolute;
  }
  &.to-bottom:nth-child(1) {
    bottom: 20px;
  }
  &.to-bottom:nth-child(2) {
    bottom: 45px;
  }
}
</style>