<template>
  <div class="app-multiselect" :class="{ small }">
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
  @Prop({ default: false }) allowEmpty!: boolean;
  @Prop({ default: false }) small!: boolean

  innerValue: MultiselectOption | MultiselectOption[] | null = null;

  private readonly emptyOptionId = "-<empty option>-";

  created() {
    this.onValueChanged();
  }

  @Watch('value') onValueChanged() {
    this.addEmptyOption();

    if (this.value) {
      this.innerValue = this.options.filter(option => this.value!.includes(option.id));
    }
  }

  @Watch('options') onOptionsChanged() {
    this.onValueChanged();
  }

  onInput(value: MultiselectOption | MultiselectOption[]) {
    this.innerValue = value;

    this.removeEmptyOption();

    this.emitValue();
  }
  
  private emitValue() {
    const val = Array.isArray(this.innerValue) ? this.innerValue.map(val => val.id) : this.innerValue?.id;
    this.$emit("input", val);
    this.$emit("change", val);
  }

  private addEmptyOption() {
    if (!this.allowEmpty) {
      return;
    }

    const emptyOption = this.options.find(o => o.id === this.emptyOptionId);
    if (!emptyOption) {
      this.options.unshift({
        id: this.emptyOptionId,
        label: " ",
      })
    }
  }

  private removeEmptyOption() {
    if (!this.allowEmpty) {
      return;
    }

    if (Array.isArray(this.innerValue)) {
      const emptyOptionIndex = this.innerValue.findIndex(val => val.id === this.emptyOptionId);
      if (emptyOptionIndex !== -1) {
        this.innerValue.splice(emptyOptionIndex, 1);
      }
    } else {
      if (this.innerValue?.id === this.emptyOptionId) {
        this.innerValue = null;
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-multiselect {
  position: relative;

  &.small {
    .multiselect {
      min-height: 30px;
    }
    .multiselect__select {
      height: 28px;
      top: 3px;
      width: 30px;
    }
    .multiselect__tags {
      min-height: 30px;
      padding-top: 4px;
      padding-left: 3px;

      .multiselect__single {
        margin-bottom: 0;
        font-size: 0.875rem;
      }
    }
  }

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
