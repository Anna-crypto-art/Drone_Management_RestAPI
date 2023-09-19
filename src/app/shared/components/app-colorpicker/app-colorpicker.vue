<template>
  <div class="app-colorpicker" ref="colorpicker">
    <input type="text" class="form-control" :value="colorValue" @input="onInputChanged" @focus="onInputFocus" />
    <div class="current-color">
      <chrome-picker ref="chromepicker" :value="colorValue" @input="onColorpickerChanged" v-show="displayPicker"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { Chrome } from 'vue-color';

@Component({
  name: 'app-colorpicker',
  components: {
    'chrome-picker': Chrome,
  }
})
export default class AppColorpicker extends Vue {
  @Prop({ default: null }) value!: string | null;
  
  @Ref() colorpicker!: HTMLElement;
  @Ref() chromepicker!: Chrome;

  colorValue: string | null = null;

  displayPicker = false;

  created() {
    this.colorValue = this.value || "#000000ff";
  }

  @Watch("value") onValueChanged() {
    this.colorValue = this.value || "#000000ff";
  }

  onInputChanged(val: string) {
    this.updateColorValue(val);

    this.$emit("change");
  }

  async onInputFocus() {
    this.showColorpicker();

    await this.$nextTick(); // wait for dom
    (this.chromepicker.$el.querySelector("input.vc-input__input") as HTMLInputElement).focus();
  }

  onDocumentClicked(e: Event) {
    if(this.colorpicker !== e.target && !this.colorpicker.contains(e.target as HTMLElement)) {
      this.hideColorpicker()
    }
  }

  onColorpickerChanged(color: any) {
    this.updateColorValue(color.hex8);
  }

  updateColorValue(newColorValue: string | null) {
    this.colorValue = newColorValue;
    this.$emit("input", this.colorValue);
  }

  showColorpicker() {
    document.addEventListener('click', this.onDocumentClicked);
    this.displayPicker = true;
  }

  hideColorpicker() {
    document.removeEventListener('click', this.onDocumentClicked);
    this.displayPicker = false;
  }
}
</script>
<style lang="scss">
.app-colorpicker {
  flex-direction: column;
}
</style>