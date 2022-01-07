<template>
  <b-input-group class="app-search-input">
    <b-form-input :placeholder="placeholder" type="search" @keyup="onKeyUp" @keydown="onKeyDown" v-model="searchText"></b-form-input>
    <b-input-group-append>
      <b-icon @click="search" icon="search"></b-icon>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { debounce } from "@/app/shared/services/helper/debounce-helper";

@Component({
  name: "app-search-input",
})
export default class AppSearchInput extends Vue {
  @Prop({ default: "" }) placeholder!: string;

  searchText = "";

  onKeyUp = debounce(() => this.search());

  onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.$emit("search", this.searchText.trim());
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-search-input {
  max-width: 300px;
  margin-right: 10px;

  input {
    border-right: none;
  }
  .input-group-append {
    margin-left: 0;
    border: 1px solid $blue-60pc;
    border-left: none;
    background-color: $white;
    padding: 10px;
    color: $blue;
  }
}
</style>
