<template>
  <div class="app-settings-users">
    <app-table :columns="columns" :rows="rows"></app-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppTable from "../../shared/components/app-table/app-table.vue";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import { UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { AppTableRows, AppTableColumns } from "@/app/shared/components/app-table/types";

@Component({
  name: "app-users",
  components: {
    AppTable
  }
})
export default class AppUsers extends Vue {
  rows: AppTableRows = [];
  columns: AppTableColumns = [];

  async created() {
    this.columns = [
      { name: this.$t("name").toString() },
      { name: this.$t("state").toString() },
      { name: this.$t("role").toString() }
    ];

    const users = await volateqApi.users();

    this.rows = users.map((user: UserSchema) => {
      return {
        id: user.id,
        cells: [
          { value: user.email },
          { value: user.state },
          { value: user.role.name }
        ]
      };
    });
  }

}
</script>

<style>

</style>
