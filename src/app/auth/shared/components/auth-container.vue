<template>
  <div class="app-auth-container">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <img src="@/assets/logos/logo_2x.jpg" alt="Volateq" class="logo-img">          
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
  props: ['title']
};
</script>

<style lang="scss" scoped>
@import '@/scss/_colors.scss';

.app-auth-box {
  width: 100%;
  padding: 20px;
  background-color: $grey;
  &-title {
    margin-bottom: 1em;
  }
}
.logo-img {
  max-width: 100%;
}
@media (min-width(var(--breakpoint-sm))) {
  .app-auth-box {
    min-width: 0;
  }
}

</style>


