<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite" @click="showInviteUserModal()" v-b-modal.invite-modal>{{ $t("invite") }}</b-button>
    </div>
    <app-table :columns="columns" :rows="rows"></app-table>
    <app-modal-form 
      id="inivite-modal" 
      ref="appInviteModal" 
      :title="$t('invite-new-user')" 
      :subtitle="$t('invite-new-user_descr')" 
      :ok-title="$t('invite')"
      @submit="inviteUser">
      <b-form-group :label="$t('email')" label-for="email">
        <b-form-input id="email" v-model="newUser.email" type="email" :placeholder="$t('email')" required></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-form-group :label="$t('role')" label-for="role">
            <b-form-select id="role" v-model="newUser.role" :options="roles" @change="onRoleSelectionChanged"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col >
          <b-form-group :label="$t('customer')" label-for="customer">
            <b-form-select id="customer" v-model="newUser.customer_id" :options="customers" :disabled="newUser.customerSelectionDisabled"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
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
import { InviteUser } from "./types";
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

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
  customers: any[] = [];
  roles = [
    { value: ApiRoles.SUPER_ADMIN, text: ApiRoles.SUPER_ADMIN }, 
    { value: ApiRoles.CUSTOMER_ADMIN, text: ApiRoles.CUSTOMER_ADMIN }
  ];
  newUser: InviteUser = this.initialInviteUser();

  async created() {
    this.columns = [
      { name: this.$t("name").toString() },
      { name: this.$t("state").toString() },
      { name: this.$t("role").toString() },
      { name: '' }
    ];

    await this.updateUserRows();
  }

  async updateUserRows() {
    let users: UserSchema[] = [];
    try {
      users = await volateqApi.getUsers();
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
    
    this.rows = users.map((user: UserSchema) => {
      let userName = ((user.first_name || "") + " " + (user.last_name || "")).trim();
      userName = userName && `${userName}<br><small class="grayed">${user.email}</small>` || user.email;

      let stateDate = ""; 
      if (user.state === UserStateSchema.REGISTERED) {
        stateDate = this.$t("registered-at").toString() + ' ' + new Date(Date.parse(user.registered_at)).toLocaleString();
      } else if (user.state === UserStateSchema.PENDING) {
        stateDate = this.$t("invited-at").toString() + ' ' + new Date(Date.parse(user.invited_at)).toLocaleString();
      }
      const userState = this.$t(user.state.toLowerCase()) + (stateDate && `<br><small class="grayed">${stateDate}</small>` || "");

      let userRole = user.role.name.toString();
      if (user.role.name === ApiRoles.CUSTOMER_ADMIN && user.customer) {
        userRole += `<br><small class="grayed">${user.customer.name}</small>`;
      }

      return {
        id: user.id,
        cells: [
          { value: userName },
          { value: userState },
          { value: userRole }, 
          { value: '' }
        ]
      };
    });
  }

  async showInviteUserModal() {
    this.newUser = this.initialInviteUser();
    this.appInviteModal && this.appInviteModal.show();

    try {
      this.customers = (await volateqApi.getCustomers()).map(customer => ({
        value: customer.id,
        text: customer.name
      }));
    } catch (e) {
      this.appInviteModal && this.appInviteModal.alertError(e.error);
    }
  }

  async inviteUser() {
    const errMsg = this.getErrorInviteUserForm();
    if (errMsg) {
      this.appInviteModal && this.appInviteModal.alertError(errMsg);
      this.appInviteModal && this.appInviteModal.stopLoading();

      return;
    }

    this.appInviteModal && this.appInviteModal.hideAlert();

    try {
      const confirmUrl = await volateqApi.inviteUser(this.newUser);
      
      this.appInviteModal && this.appInviteModal.hide();
      appContentEventBus.showSuccessAlert(confirmUrl);

      await this.updateUserRows();
    } catch (e) {
      this.appInviteModal && this.appInviteModal.alertError(e.error);
    } finally {
      this.appInviteModal && this.appInviteModal.stopLoading();
    }
  }

  initialInviteUser(): InviteUser {
    return {
      email: "",
      role: "",
      customerSelectionDisabled: true,
    };
  }

  onRoleSelectionChanged() {
    if (this.newUser.role !== ApiRoles.CUSTOMER_ADMIN) {
      this.newUser.customerSelectionDisabled = true;
      this.newUser.customer_id = undefined;  
    } else {
      this.newUser.customerSelectionDisabled = false;  
    }
  }

  getErrorInviteUserForm(): string {
    if (!/^\S+@\S+$/.test(this.newUser.email.trim())) {
      return 'INVALID_OR_MISSING_EMAIL';
    }
    if (Object.keys(ApiRoles).indexOf(this.newUser.role) === -1) {
      return 'INVALID_OR_MISSING_ROLE';
    }
    if (this.newUser.role === ApiRoles.CUSTOMER_ADMIN && !this.newUser.customer_id) {
      return 'CUSOMTER_REQUIRED_FOR_CUSTOMER_ADMIN';
    }

    return '';
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
