// Avoid editor yelling by imports of *.vue

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}