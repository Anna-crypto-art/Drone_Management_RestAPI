<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite">{{ $t("invite") }}</b-button>
    </div>
    <app-table :columns="columns" :rows="rows"></app-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppTable from "../../shared/components/app-table/app-table.vue";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import { UserSchema, UserStateSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
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
      { name: this.$t("role").toString() },
      { name: '' }
    ];

    const users = await volateqApi.users();

    this.rows = users.map((user: UserSchema) => {
      return {
        id: user.id,
        cells: [
          { value: this.getUserDisplayName(user) },
          { value: this.getUserStateDisplayName(user) },
          { value: user.role.name }, 
          { value: '' }
        ]
      };
    });
  }

  getUserDisplayName(user: UserSchema): string {
    const userName = ((user.first_name || '') + ' ' + (user.last_name || '')).trim();

    return userName && `${userName}<br><small class="grayed">${user.email}</small>` || user.email;
  }

  getUserStateDisplayName(user: UserSchema): string {
    let stateDate = ""; 
    if (user.state === UserStateSchema.REGISTERED) {
      stateDate = this.$t("registered-at").toString() + ' ' + new Date(Date.parse(user.registered_at)).toLocaleString();
    } else if (user.state === UserStateSchema.PENDING) {
      stateDate = this.$t("invited-at").toString() + ' ' + new Date(Date.parse(user.invited_at)).toLocaleString();
    }

    return this.$t(user.state.toLowerCase()) + (stateDate && `<br><small class="grayed">${stateDate}</small>` || '');
  }

}
</script>

<style lang="scss">
.app-settings-users {
  &-table-toolbar {
    margin-top: -50px;
    bottom: -50px;
    position: relative;

    .btn-invite {
      float: right;
      margin-right: 5px;

      &::after {
        clear: both;
      }
    }
  }
}
</style>
