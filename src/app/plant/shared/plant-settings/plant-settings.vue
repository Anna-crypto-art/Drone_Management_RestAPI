<template>
  <app-content :title="$t('plant-settings')" :navback="true" navbackPath="/plants">
    <app-custom-component-properties v-if="plant" :plant="plant" />
  </app-content>
</template>


<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue"
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import AppCustomComponentProperties from "./custom-component-properties.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-plant-settings",
  components: {
    AppContent,
    AppButton,
    AppPlantSettings,
    AppCustomComponentProperties,
  },
})
export default class AppPlantSettings extends BaseAuthComponent {
  plant: PlantSchema | null = null;
  @Prop({ default: true }) navback: boolean | undefined;

  @CatchError("loading")
  async created() {
    this.plant = await volateqApi.getPlant(this.$route.params.id);
  }

}

</script>
<style lang="scss">
@import "@/scss/_colors.scss";

.app-content {
  &-navback {
    margin-top: 50px;
  }
  &-title {
    margin: 50px 0;

    h1 {
      font-size: 4rem;
      margin-bottom: 10px;
    }
  }
  &-subtitle {
    font-size: 1.5rem;
  }
  &-content-alert {
    .alert {
      margin-bottom: 50px;
    }
  }
}
</style>