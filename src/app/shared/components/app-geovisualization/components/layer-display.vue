<template>
  <div class="layer-display" :class="{ 'visible-layer': visible }">
    <div v-if="isRoot" class="layer-display-tabs">
      <b-tabs>
        <b-tab v-for="(childLayer, layerIndex) in layer.getVisibleChildLayers()" :key="layerIndex">
          <template #title>
            <app-icon :icon="childLayer.icon" :title="childLayer.name" />
            <span class="pad-left layer-tab-name">{{ childLayer.name }}</span>
          </template>
          <slot v-if="childLayer.customSlot" :name="childLayer.customSlot" />
          <app-geovisual-layer-display
            level="subroot"
            :layer="childLayer"
            :key="layerIndex"
          >
            <!-- Pass slots through -->
            <template v-for="(_, slot) in $slots">
              <template :slot="slot" v-if="slot !== 'default'">
                <slot :name="slot"></slot>
              </template>
            </template>
          </app-geovisual-layer-display>
        </b-tab>
      </b-tabs>
    </div>
    <div
      v-if="!isRoot"
      v-show="visible"
      :class="'layer-display-level-' + layerGroupLevel + 
        ' ' + layer.styleClass +
        (!isSubroot ? ' pad-left' : '') +
        (layer.isGroup ? ' layer-display-group' : '')
      "
    >
      <b-form-checkbox v-if="!layer.isGroup" :checked="selected" @change="onChange" :disabled="layer.disabled">
        <slot :name="layer.name">
          {{ layer.name }}
          <app-explanation v-if="layer.description"><span v-html="layer.description"></span></app-explanation>
        </slot>
      </b-form-checkbox>
      <h3 v-if="!isSubroot && layer.isGroup && layer.name" class="layer-display-group-title">
        <div @click="onCollapse(layer)" class="layer-collapse" :class="{ open: collapsed }">
          <slot :name="layer.name">
            {{ layer.name }}
            <app-explanation v-if="layer.description"><span v-html="layer.description"></span></app-explanation>
          </slot>
          <small v-if="layer.collapsable" class="font-xs pad-left-half">
            <app-icon :icon="collapsed ? 'chevron-up' : 'chevron-down'" :class="{ 'blue': collapsed }" />
          </small>
        </div>
      </h3>
      <div v-if="layer.hasChildrens" class="layer-sublayers">
        <b-collapse v-if="layer.collapsable" v-model="collapsed" :id="layer.id">
          <app-geovisual-layer-display
            v-for="(childLayer, layerIndex) in layer.getChildLayers()"
            level="other"
            :layer="childLayer"
            :key="layerIndex"
          >
            <!-- Pass slots through -->
            <template v-for="(_, slot) in $slots">
              <template :slot="slot" v-if="slot !== 'default'">
                <slot :name="slot"></slot>
              </template>
            </template>
          </app-geovisual-layer-display>
        </b-collapse>
        <div v-if="!layer.collapsable">
          <app-geovisual-layer-display
            v-for="childLayer in layer.getChildLayers()"
            level="other"
            :layer="childLayer"
            :key="childLayer.id"
          >
            <!-- Pass slots through -->
            <template v-for="(_, slot) in $slots">
              <template :slot="slot" v-if="slot !== 'default'">
                <slot :name="slot"></slot>
              </template>
            </template>
          </app-geovisual-layer-display>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { LayerStructure } from "../layer-structure";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue"
import { LayerEvent } from "../types/events";

@Component({
  name: "app-geovisual-layer-display",
  components: {
    AppExplanation,
    AppIcon,
  }
})
export default class AppGeovisualLayerDisplay extends Vue {
  @Prop() layer!: LayerStructure;
  @Prop({ default: "root" }) level!: "root" | "subroot" | "other";

  selectedTab = 0;

  selected = false;

  collapsed = false;

  @Watch("layer") async onLayerChanged() {
    await this.updateLayer();
  }

  async mounted() {
    await this.updateLayer();
  }

  unmounted() {
    this.layer.removeListenerById(LayerEvent.SET_SELECTED, this.layer.displayEventId);
    this.layer.removeListenerById(LayerEvent.COLLAPSE, this.layer.displayEventId);
  }

  async onChange(e: boolean) {
    await this.layer.setSelected(e);
  }

  get visible(): boolean {
    return this.layer.visible;
  }

  @Watch("collapsed") onCollapsedChanged() {
    this.layer.collapsed = this.collapsed;
  }

  @Watch("visible")
  async onVisibleChanged() {
    if (!this.visible) {
      await this.onChange(false);
    }
  }

  get layerGroupLevel(): number {
    let level = 0;
    let parentLayer: LayerStructure | undefined = this.layer.parentLayer;
    while (parentLayer && level < 4) {
      level++;
      parentLayer = parentLayer.parentLayer;
    }

    return level;
  }

  get isRoot(): boolean {
    return this.level === 'root';
  }

  get isSubroot(): boolean {
    return this.level === 'subroot';
  }

  onCollapse(layer: LayerStructure) {
    if (layer.collapsable) {
      this.collapsed = !this.collapsed;
    }
  }

  private async updateLayer() {
    if (this.layer.hasSelectedChildLayer()) {
      this.collapsed = true;
    }

    this.selected = this.layer.selected;

    this.layer.on(LayerEvent.SET_SELECTED, async (selected: boolean) => {
      this.selected = selected;
      
      // Special case: Selected programmatically, does not select layerType...
      if (this.layer.selected !== selected) {
        if (this.layer.layerLoader) {
          this.layer.layerLoader.layerType.selected = selected;
        }
      }

      if (this.selected) {
        let layer = this.layer;
        while (layer.parentLayer && !layer.collapsable) {
          layer = layer.parentLayer;
        }
        if (layer && layer.parentLayer) {
          await layer.emit(LayerEvent.COLLAPSE, true);
        }
      }
    }, this.layer.displayEventId);

    this.layer.on(LayerEvent.COLLAPSE, async (collapse: boolean) => {
      if (!collapse && this.layer.hasSelectedChildLayer()) {
        return;
      }

      this.collapsed = collapse;
    }, this.layer.displayEventId);

    if (this.selected) {
      await this.onChange(this.selected)
    }
  }
}
</script>

<style lang="scss">
.layer-display {
  &-tabs {
    .tabs .nav-link:not(.active) .layer-tab-name {
      display: none;
    }

    .tab-content {
      padding-top: 1em;
    }
  }

  &-level-2.layer-display-group {
    margin-bottom: 1em;

    .layer-display-group-title {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 0.5em;
    }
  }

  &-level-3.layer-display-group {
    margin-top: 0;

    .layer-display-group-title {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 0.5em;
    }

    .layer-collapse {
      cursor: default;
    }
  }

  .layer-collapse {
    cursor: pointer;
  }
}

.layer-display > .layer-display-group > .layer-sublayers > div > .layer-display.visible-layer ~ 
.layer-display.visible-layer > .layer-display-level-3.layer-display-group{
  margin-top: 1em;
}

</style>