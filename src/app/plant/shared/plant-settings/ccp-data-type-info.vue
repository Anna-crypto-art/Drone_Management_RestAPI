<template>
  <b-row class="app-ccp-data-type-info">
    <b-col>
      <slot />
    </b-col>
    <b-col>
      <b-form-group :label="$t('label')">
        <input type="text" v-model="valueInfo.label" @change="onChange" />
      </b-form-group>
    </b-col>
      <b-form-group :label="$t('color')">
        <app-colorpicker v-model="valueInfo.color" @change="onChange" />
      </b-form-group>
    <b-col>
      <b-form-group :label="$t('description')">
        <textarea v-model="valueInfo.description" @change="onChange" />
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import { DataTypeOptionInfo } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppColorpicker from '@/app/shared/components/app-colorpicker/app-colorpicker.vue';

@Component({
  name: "app-ccp-data-type-info",
  components: {
    AppColorpicker
  }
})
export default class AppCcpDataTypeInfo extends Vue {
  @Prop({ required: true }) index!: number;
  @Prop({ required: true }) value!: DataTypeOptionInfo;

  valueInfo: DataTypeOptionInfo = {};

  created() {
    this.valueInfo = this.value;
  }

  @Watch("value") onValueChanged() {
    this.valueInfo = this.value;
  }

  onChange() {
    this.$emit("input", this.valueInfo, this.index);
  }
}
</script>