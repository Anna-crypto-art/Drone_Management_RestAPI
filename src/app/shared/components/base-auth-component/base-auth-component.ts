import Vue from "vue"
import Component from "vue-class-component"

@Component({
  computed: {
    isSuperAdmin(): boolean {
      return this.$store.getters['auth/isSuperAdmin'];
    },
    isCustomerAdmin(): boolean {
      return this.$store.getters['auth/isCustomerAdmin'];
    }
  }
})
export default class BaseAuthComponent extends Vue {

}
