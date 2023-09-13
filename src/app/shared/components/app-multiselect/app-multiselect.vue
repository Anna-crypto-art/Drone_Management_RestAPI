<template>
  <div class="app-multiselect">
    <multiselect 
      label="label"
      track-by="id"
      placeholder=""
      select-label=""
      deselect-label=""
      :options="options"
      :value="innerValue" 
      @input="onInput"
      :multiple="!singleSelect"
      :disabled="disabled"
    >
      <!-- Pass scoped slots through -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </multiselect>
    <div v-show="readonly" class="app-multiselect-readonly"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Multiselect from "vue-multiselect";
import { MultiselectOption } from "./types";

@Component({
  name: "app-multiselect",
  components: {
    Multiselect,
  }
})
export default class AppMultiselect extends Vue {
  @Prop({ default: null }) value!: string | string[] | null;
  @Prop({ default: [] }) options!: MultiselectOption[];
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ default: false }) singleSelect!: boolean;

  innerValue: MultiselectOption | MultiselectOption[] | null = null;

  created() {
    this.onValueChanged();
  }

  @Watch('value') onValueChanged() {
    if (this.value) {
      this.innerValue = this.options.filter(option => this.value!.includes(option.id))
    }
  }

  @Watch('options') onOptionsChanged() {
    this.onValueChanged();
  }

  onInput(value: MultiselectOption | MultiselectOption[]) {
    this.innerValue = value;

    if (Array.isArray(this.innerValue)) {
      this.$emit("input", this.innerValue.map(val => val.id));
    } else {
      this.$emit("input", this.innerValue.id);
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-multiselect {
  position: relative;

  .multiselect__tags {
    border-radius: 0;
    border-color: $blue-60pc;

    .multiselect__tag {
      border-radius: 10px;
      background: $hover-blue;
      
      &-icon {
        border-radius: 0;

        &:hover {
          background: $hover-blue;
        }
        &:hover:after {
          color: $grey;
        }
        &:after {
          color: $dark;
        }
      }
    }
  }
  .multiselect__option--highlight {
    background: $hover-blue;
  }

  &-readonly {
    position: absolute;
    opacity: 0.1;
    background-color: $black;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
