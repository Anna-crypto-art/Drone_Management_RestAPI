<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite" @click="$refs.appInviteModal.show()" v-b-modal.invite-modal>{{ $t("invite") }}</b-button>
    </div>
    <app-table :columns="columns" :rows="rows"></app-table>
    <app-modal-form 
      id="inivite-modal" 
      ref="appInviteModal" 
      :title="$t('invite-new-user')" 
      :subtitle="$t('invite-new-user_descr')" 
      :ok-title="$t('invite')"
      @submit="inviteUser">
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AppTable from "../../shared/components/app-table/app-table.vue";
import AppModalForm from "../../shared/components/app-modal/app-modal-form.vue";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import { UserSchema, UserStateSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { AppTableRows, AppTableColumns } from "@/app/shared/components/app-table/types";
import appContentEventBus from "../../shared/components/app-content/app-content-event-bus";
import { Component, Ref } from "vue-property-decorator";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";

@Component({
  name: "app-users",
  components: {
    AppTable,
    AppModalForm
  }
})
export default class AppUsers extends Vue {
  rows: AppTableRows = [];
  columns: AppTableColumns = [];

  @Ref() appInviteModal: IAppModalForm | undefined;

  async created() {
    this.columns = [
      { name: this.$t("name").toString() },
      { name: this.$t("state").toString() },
      { name: this.$t("role").toString() },
      { name: '' }
    ];

    this.rows = await this.getUsersAsRows();
  }

  async getUsersAsRows() {
    let users: UserSchema[] = [];
    try {
      users = await volateqApi.users();
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
    
    return users.map((user: UserSchema) => {
      let userName = ((user.first_name || "") + " " + (user.last_name || "")).trim();
      userName = userName && `${userName}<br><small class="grayed">${user.email}</small>` || user.email;

      let stateDate = ""; 
      if (user.state === UserStateSchema.REGISTERED) {
        stateDate = this.$t("registered-at").toString() + ' ' + new Date(Date.parse(user.registered_at)).toLocaleString();
      } else if (user.state === UserStateSchema.PENDING) {
        stateDate = this.$t("invited-at").toString() + ' ' + new Date(Date.parse(user.invited_at)).toLocaleString();
      }
      const userState = this.$t(user.state.toLowerCase()) + (stateDate && `<br><small class="grayed">${stateDate}</small>` || "");

      return {
        id: user.id,
        cells: [
          { value: userName },
          { value: userState },
          { value: user.role.name }, 
          { value: '' }
        ]
      };
    });
  }

  async inviteUser() {
    await new Promise(resolve => {
      setTimeout(() => {
        this.appInviteModal && this.appInviteModal.stopLoading();
        resolve();
      }, 3000);
    });
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
