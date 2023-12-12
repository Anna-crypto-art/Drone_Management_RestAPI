<template>
  <div class="app-map">
    <div class="app-map-content" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Map from "ol/Map";
import Select, { SelectEvent } from "ol/interaction/Select";
import { click } from "ol/events/condition";
import "ol/ol.css";

@Component({
  name: "app-map",
  components: {},
})
export default class AppMap extends Vue {
  @Prop({ required: true }) map!: Map;

  created(): void {
    this.mapSetup();
  }

  mounted(): void {
    this.map?.setTarget(this.$el.firstChild as HTMLElement);
  }

  private mapSetup(): void {
    const selectClick = new Select({ condition: click });
    selectClick.on("select", (e: SelectEvent) => {
      this.$emit("click", e.selected);
    });
    
    this.map.addInteraction(selectClick);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-map {
  position: relative;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  overflow: hidden;

  &-content {
    width: 100%;
    height: 100%;
  }
}

// Style open layers buttons in volateq style
.ol-control.ol-zoom {
  border-radius: 0;
  padding: 0;
  background-color: transparent;
  top: auto;
  left: auto;
  right: 0.5em;
  bottom: calc(0.5em + 30px);

  button {
    color: $blue;
    background-color: $white;
    border: none; // 1px solid $blue;
    border-radius: 0;
    font-weight: normal;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: $background-grey;
    }
  }
}
</style>
