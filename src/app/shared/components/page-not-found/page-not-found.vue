<template>
  <div class="page-not-found">
    <h2>Page not found</h2>
    <img src="@/assets/brdrone.png" alt="page not found" />
  </div>
</template>

<script lang="ts">
export default {
  name: "app-page-not-found"
};
</script>

<style lang="scss">
.page-not-found > h2 {
  text-align: center;
  margin-top: 24px;
  font-weight: 500;
  color: #888888;
}
.page-not-found > img {
  width: 500px;
  margin: auto;
  display: block;
  margin-top: 50px;
}
</style>

