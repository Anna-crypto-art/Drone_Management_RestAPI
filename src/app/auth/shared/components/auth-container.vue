<template>
  <div class="app-auth-container">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <img src="@/assets/logos/logo_default.jpg" alt="Volateq" class="logo-img">
          <div class="app-auth-box">
            <h1 v-if="title" class="app-auth-box-title">{{title}}</h1>
            <slot></slot>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "app-auth-container",
  props: ["title"]
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import '~bootstrap/scss/_functions';
@import '~bootstrap/scss/_variables';
@import '~bootstrap/scss/mixins/_breakpoints';

.app-auth-container {
  .app-auth-box {
    width: 100%;
    padding: 20px;
    box-shadow: 0px 0px 30px $grey;
    position: relative;
    z-index: 1;
    min-width: 400px;

    &-title {
      margin-bottom: 1em;
    }
  }
  .logo-img {
    max-width: 100%;
    position: relative;
    z-index: 0;
    width: 234px;
    display: block;
    margin: 40px auto;
  }
}

@include media-breakpoint-down(sm) {
  .app-auth-container {
    .app-auth-box {
      min-width: 0;
    }
  }
}

</style>


