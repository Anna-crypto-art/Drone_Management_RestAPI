<template>
  <div class="app-map-controls">
    <!-- IDEA: Bootstrap thought it was a good idea to use a transparent
          background for hovered buttons, in this case not, use a white
          or gray one instead -->

    <b-button size="sm" @click="showMyLocation">
      <b-icon-geo-alt />
    </b-button>

    <b-button size="sm" @click="goHome">
      <b-icon-house />
    </b-button>

    <b-button-group vertical>
      <b-button size="sm" @click="() => handleZoom('in')">
        <b-icon-plus />
      </b-button>
      <b-button size="sm" @click="() => handleZoom('out')">
        <b-icon-dash />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Feature, Map, Geolocation } from "ol";
import { Zoom } from "ol/control";
import { easeOut } from "ol/easing";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { Component, Prop } from "vue-property-decorator";
import { CatchError } from "../../services/helper/catch-helper";
import { BaseComponent } from "../base-component/base-component";
import { EVENT_ZOOM_TO_HOME } from "./events";

@Component({
  name: "app-map-controls",
  components: {},
})
export default class AppMapControls extends BaseComponent {
  @Prop({ required: true }) map!: Map;

  private readonly zoomDelta = 1;
  private readonly animationDuration = 200;

  private geolocation: Geolocation | undefined = undefined;
  private geolocationLayer: VectorLayer<VectorSource> | undefined = undefined;
  private accuracyFeature: Feature | undefined = undefined;
  private positionFeature: Feature | undefined = undefined;

  async mounted() {
    this.map.getControls().forEach(control => {
      if (control instanceof Zoom) {
        this.map.removeControl(control);
      }
    });
  }

  @CatchError()
  handleZoom(direction: "out" | "in") {
    const view = this.map.getView();
    const zoom = view.getZoom();

    if (zoom !== undefined) {
      const nextZoom = view.getConstrainedZoom(zoom + (direction === "out" ? -this.zoomDelta : this.zoomDelta));

      if (view.getAnimating()) view.cancelAnimations();

      view.animate({
        zoom: nextZoom,
        duration: this.animationDuration,
        easing: easeOut,
      });
    }
  }

  goHome() {
    window.dispatchEvent(new CustomEvent(EVENT_ZOOM_TO_HOME));
  }

  @CatchError()
  async showMyLocation() {
    try {
      this.$emit("loading", true);

      if (!this.geolocation) {
        await this.addGeolocationFeature();
      }

      const position = this.geolocation!.getPosition();
      if (position) {
        this.map.getView().setCenter(position);
        this.map.getView().setZoom(18);
      }

    } finally {
      this.$emit("loading", false);
    }
  }

  private async addGeolocationFeature() {
    return new Promise<void>((resolve, reject) => {
      if (this.geolocation) {
        resolve();

        return;
      }

      // Code stolen and adapted from https://openlayers.org/en/latest/examples/geolocation.html

      this.geolocation = new Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.map.getView().getProjection(),
      });
      
      this.geolocation.on('error', function (error) {
        console.error("Geolocation error...");
        console.error(error);
        
        reject(error);
      });
      
      this.accuracyFeature = new Feature();
      this.geolocation.on('change:accuracyGeometry', () => {
        this.accuracyFeature!.setGeometry(this.geolocation!.getAccuracyGeometry() || undefined);
      });
      
      this.positionFeature = new Feature();
      this.positionFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        })
      );
      
      this.geolocation.on('change:position', () => {
        const coordinates = this.geolocation!.getPosition();
        this.positionFeature!.setGeometry(coordinates ? new Point(coordinates) : undefined);

        resolve();
      });
      
      if (this.geolocationLayer === undefined) {
        this.geolocationLayer = new VectorLayer({
          map: this.map,
          source: new VectorSource(),
          zIndex: 2, // keep the position layer behind the SCA/Tracker layer
        });
      }
      this.geolocationLayer.getSource()!.addFeatures([this.accuracyFeature, this.positionFeature])

      this.geolocation.setTracking(true);
    });
  }

  // Yeah... I know.. it is unused... but keep it anyway, please
  private removeGeolocationFeature(): void {
    if (this.geolocation) {
      this.geolocation!.setTracking(false);
      this.geolocation = undefined;
    }

    if (this.positionFeature) {
      this.geolocationLayer!.getSource()!.removeFeature(this.positionFeature);
      this.positionFeature = undefined;
    }

    if (this.accuracyFeature) {
      this.geolocationLayer!.getSource()!.removeFeature(this.accuracyFeature);
      this.accuracyFeature = undefined;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-map-controls {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-right: 0.5em;
  padding-bottom: 2em; // leave space for openlayers (c)

  button {
    height: 35px;
    width: 35px;
    padding: 0;
  }

  button:hover {
    background: $hover-light-blue;
  }
}
</style>
