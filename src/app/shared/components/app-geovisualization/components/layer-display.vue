<template>
  <div class="layer-display-tabs">
    <div v-if="isRoot">
      <b-tabs>
        <b-tab v-for="(childLayer, layerIndex) in layer.getVisibleChildLayers()" :key="layerIndex">
          <template #title>
            <app-icon :icon="childLayer.icon" :title="childLayer.name" />
            <span class="pad-left layer-tab-name">{{ childLayer.name }}</span>
          </template>
          <slot v-if="childLayer.customSlot" :name="childLayer.customSlot" />
          <app-geovisual-layer-display
            :level="isRoot ? 'subroot' : 'other'"
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
      :class="
        'layer-display' +
        (layer.isGroup ? ' layer-display-group' : '') +
        (level === 'subroot' ? ' layer-display-subroot ' : ' pad-left') +
        layer.styleClass
      "
    >
      <b-form-checkbox v-if="!layer.isGroup" :checked="selected" @change="onChange">
        <slot :name="layer.name">
          {{ layer.name }}
          <app-explanation v-if="layer.description"><span v-html="layer.description"></span></app-explanation>
        </slot>
      </b-form-checkbox>
      <h3 v-if="level !== 'subroot' && layer.isGroup && layer.name" :class="'layer-display-group-level-' + layerGroupLevel">
        <div @click="onCollapse(layer)" class="layer-collapse" :class="{ open: collapsed }">
          <slot :name="layer.name">
            {{ layer.name }}
            <app-explanation v-if="layer.description"><span v-html="layer.description"></span></app-explanation>
          </slot>
          <small v-if="layer.collapse" class="font-xs pad-left-half">
            <app-icon :icon="collapsed ? 'chevron-up' : 'chevron-down'" />
          </small>
        </div>
      </h3>
      <div v-if="layer.hasChildrens" class="layer-sublayers">
        <b-collapse v-if="layer.collapse" v-model="collapsed" :id="layer.id">
          <app-geovisual-layer-display
            v-for="(childLayer, layerIndex) in layer.getChildLayers()"
            :level="level === 'root' ? 'subroot' : 'other'"
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
        <div v-if="!layer.collapse">
          <app-geovisual-layer-display
            v-for="(childLayer, layerIndex) in layer.getChildLayers()"
            :level="level === 'root' ? 'subroot' : 'other'"
            :layer="childLayer"
            :key="layerIndex"
            :initCollapsed="layerIndex === 0"
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
  @Prop({ default: false }) initCollapsed!: boolean;

  selectedTab = 0;

  selected = false;

  collapsed = false;

  created() {
    if (this.initCollapsed || this.layer.hasSelectedChildLayer()) {
      this.collapsed = true;
    }

    this.selected = this.layer.selected;

    this.layer.on("setSelected", (selected) => {
      this.selected = selected;

      // Special case: Selected programmatically, does not select layerType...
      if (this.layer.selected !== selected) {
        if (this.layer.layerLoader) {
          this.layer.layerLoader.layerType.selected = selected;
        }
      }

      if (this.selected) {
        let layer = this.layer;
        while (layer.parentLayer && !layer.collapse) {
          layer = layer.parentLayer;
        }
        if (layer) {
          layer.emit("collapse");

          for (const sibling of layer.parentLayer!.getChildLayers()) {
            if (layer.id !== sibling.id) {
              sibling.emit("uncollapse")
            }
          }
        }
      }
    });

    this.layer.on("collapse", () => {
      this.collapsed = true;
    })
    this.layer.on("uncollapse", () => {
      if (!this.layer.hasSelectedChildLayer()) {
        this.collapsed = false;
      }
    })
  }

  onChange(e: boolean): void {
    this.layer.selected = e;
  }

  get visible(): boolean {
    return this.layer.visible;
  }

  @Watch("visible")
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

  get isRoot(): boolean {
    return this.level === 'root'
  }

  onCollapse(layer: LayerStructure) {
    if (layer.collapse) {
      this.collapsed = !this.collapsed;
    }
  }
}
</script>

<style lang="scss">
.layer-display {
  // .layer-display {
  //   padding-left: 20px;

  //   &-subroot {
  //     padding-left: 0;
  //   }
  // }

  &-group-level-2 {
    margin-top: 1em;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  &-group-level-3 {
    margin-top: 15px !important;
    font-size: 1.1rem;
    margin-top: 10px;
  }

  &.margin-top {
    margin-top: 30px;
  }

  .layer-collapse {
    cursor: pointer;
  }
}

.layer-display-tabs {
  .tabs .nav-link:not(.active) .layer-tab-name {
    display: none;
  }

  .tab-content {
    padding-top: 1em;
  }
}

.tab-content > .tab-pane > .layer-display-tabs > .layer-display-group > .layer-sublayers > div > .layer-display-tabs:first-child > .layer-display-group > .layer-display-group-level-2 {
  margin-top: 0;
}

</style>
