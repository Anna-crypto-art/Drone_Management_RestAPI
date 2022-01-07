<template>
  <app-content
    title="Page not found"
    subtitle="Where am I?"
    :showHeader="isAuthenticated"
  >
    <div class="page-not-found">
      <img
        src="/images/brdrone.png"
        srcset="/images/brdrone.webp, /images/brdrone.png"
        alt="page not found"
      />
    </div>
  </app-content>
</template>

<script lang="ts">
import store from "@/app/app-state";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";

@Component({
  name: "app-page-not-found",
  components: {
    AppContent,
  },
})
export default class AppPageNotFound extends Vue {
  get isAuthenticated() {
    return store.getters.auth.isAuthenticated;
  }
}
</script>

<style lang="scss">
.page-not-found > img {
  width: 300px;
  margin: auto;
  display: block;
  margin-top: 50px;
}
</style>
