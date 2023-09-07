<template>
  <b-row class="app-ccp-data-type-info">
    <b-col class="app-ccp-data-type-info-col" cols="3">
      <slot />
    </b-col>
    <b-col class="app-ccp-data-type-info-col" cols="3">
      <b-form-group :label="$t('label')">
        <b-form-input type="text" v-model="valueInfo.label" @change="onChange" />
      </b-form-group>
    </b-col>
    <b-col class="app-ccp-data-type-info-col" cols="3">
      <b-form-group :label="$t('description')">
        <b-form-textarea v-model="valueInfo.description" @change="onChange" rows="1" style="height: 38px" />
      </b-form-group>
    </b-col>
    <b-col class="app-ccp-data-type-info-col" cols="3">
      <b-form-group :label="$t('color')">
        <app-colorpicker v-model="valueInfo.color" @change="onChange" style="width: 66%; padding-right: 15px; float: left" />
        <app-button variant="outline-danger" icon="trash" @click="onDeleteClicked" size="sm" cls="pull-right" style="margin-right: 15px" />
        <div class="clear"></div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import { DataTypeOptionInfo } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppColorpicker from '@/app/shared/components/app-colorpicker/app-colorpicker.vue';
import AppButton from '@/app/shared/components/app-button/app-button.vue';

@Component({
  name: "app-ccp-data-type-info",
  components: {
    AppColorpicker,
    AppButton
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

  onDeleteClicked() {
    this.$emit("delete", this.index);
  }
}
</script>
<style lang="scss">
.app-ccp-data-type-info {
  &-col {
    padding-right: 0 !important;
  }
  &-col.del-btn {
    padding-top: 30px;
  }
}
</style>