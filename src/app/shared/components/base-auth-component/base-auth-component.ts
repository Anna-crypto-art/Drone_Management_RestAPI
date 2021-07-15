import Vue from "vue";

export abstract class BaseAuthComponent extends Vue {
    isCreated = false;

    async created(): Promise<void> {
        this.isCreated = true;
    }

    get isSuperAdmin(): boolean {
        return this.$store.getters["auth/isSuperAdmin"];
    }

    get isCustomerAdmin(): boolean {
        return this.$store.getters["auth/isCustomerAdmin"];
    }
}
