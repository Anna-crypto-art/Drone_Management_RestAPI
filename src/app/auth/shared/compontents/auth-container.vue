<template>
  <div class="app-auth-container">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <h1>{{title}}</h1>
          <div class="app-auth-box">
            <slot></slot>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "app-auth-container",
  props: ['title']
};
</script>

<style lang="scss" scoped>
.app-auth-box {
  max-width: 500px;
  width: 100%;
  border: 1px solid lightgray;
  padding: 20px;
  background-color: lightgray;
}

</style>


