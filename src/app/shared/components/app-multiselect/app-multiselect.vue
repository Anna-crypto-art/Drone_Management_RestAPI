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
      :multiple="true"
      :disabled="disabled"
    />
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
  @Prop({ default: null }) value!: string[] | null;
  @Prop({ default: [] }) options!: MultiselectOption[];
  @Prop({ default: false }) disabled!: boolean;

  innerValue: MultiselectOption[] | null = null;

  created() {
    this.onValueChanged();
  }

  @Watch('value') onValueChanged() {
    if (this.value) {
      this.innerValue = this.options.filter(option => this.value!.includes(option.id))
    }
  }

  onInput(value: MultiselectOption[]) {
    this.innerValue = value;

    if (Array.isArray(this.innerValue)) {
      this.$emit("input", this.innerValue.map(val => val.id));
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-multiselect {
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
}
</style>
