<template>
  <div class="app-header">
    <b-container>
      <img class="app-header-logo" src="@/assets/logos/logo_white.png" alt="volateq">
      <div class="app-header-menu float-right">
        <b-icon icon="gear-fill" font-scale="1.5"></b-icon>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "app-header"
};
</script>

<style lang="scss" scoped>
@import '@/scss/_colors.scss';

$header-height: 80px;

.app-header {
  display: flex;
  height: $header-height;
  line-height: $header-height;
  align-items: center;
  background-color: $blue;
  color: #ffffff;

  &-logo {
    max-height: $header-height;
    margin-left: -15px;
  }
  &-menu {
    height: 100%;

    .bi-gear {
      color: #ffffff;
      &:hover {
        transform: rotate(405deg);
	      transform-origin: center;
	      transition: 1s ease all;
      }
    }
  }
  &-menu:hover > {
    .bi-gear-fill {
      transform: rotate(225deg);
	      transform-origin: center;
	      transition: 1s ease all;
    }
  }
}

.header-title {
  margin: 0 16px;
  font-weight: 500;
}
</style>


