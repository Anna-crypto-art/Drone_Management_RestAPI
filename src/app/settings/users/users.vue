<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite" @click="showInviteUserModal()" v-b-modal.invite-modal>{{
        $t("invite")
      }}</b-button>
    </div>
    <div class="clearfix"></div>
    <app-table-container>
      <b-table :fields="columns" :items="rows" head-variant="light" hover>
        <template #cell(name)="row">
          <span v-if="row.item.name.userName">
            {{ row.item.name.userName }}<br />
            <small class="grayed">{{ row.item.name.email }}</small>
          </span>
          <span v-else>{{ row.item.name.email }}</span>
        </template>
        <template #cell(state)="row">
          {{ $t(row.item.state.userState) }}
          <span v-if="row.item.state.date"
            ><br /><small class="grayed">{{ row.item.state.date }}</small></span
          >
        </template>
        <template #cell(role)="row">
          {{ row.item.role.userRole }}
          <span v-if="row.item.role.customer"
            ><br /><small class="grayed">{{ row.item.role.customer }}</small></span
          >
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <b-button
              v-show="row.item.state.userState == 'pending'"
              @click="onResendInvitationClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('resend-invitation')"
            >
              <b-icon icon="envelope"></b-icon>
            </b-button>
            <b-button
              @click="onUnLockClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t(row.item.state.userState === 'locked' ? 'unlock' : 'lock')"
            >
              <b-icon :icon="row.item.state.userState === 'locked' ? 'unlock' : 'lock'"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>
    <app-modal-form
      id="inivite-modal"
      ref="appInviteModal"
      :title="$t('invite-new-user')"
      :subtitle="$t('invite-new-user_descr')"
      :ok-title="$t('invite')"
      @submit="inviteUser"
    >
      <b-form-group :label="$t('email')" label-for="email">
        <b-form-input
          id="email"
          v-model="newUser.email"
          type="email"
          :placeholder="$t('email')"
          required
        ></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-form-group :label="$t('role')" label-for="role">
            <b-form-select
              id="role"
              v-model="newUser.role"
              :options="roles"
              @change="onRoleSelectionChanged"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('customer')" label-for="customer">
            <b-form-select
              id="customer"
              v-model="newUser.customer_id"
              :options="customers"
              :disabled="customerSelectionDisabled"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { UserSchema, UserStateSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { InviteUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import { BvTableFieldArray } from "bootstrap-vue";

@Component({
  name: "app-settings-users",
  components: {
    AppTableContainer,
    AppModalForm,
  },
})
export default class AppSettingsUsers extends Vue {
  columns: BvTableFieldArray = [];
  rows: Array<any> = [];

  @Ref() appInviteModal!: IAppModalForm;
  customers: any[] = [];
  roles = [
    { value: ApiRoles.SUPER_ADMIN, text: ApiRoles.SUPER_ADMIN },
    { value: ApiRoles.CUSTOMER_ADMIN, text: ApiRoles.CUSTOMER_ADMIN },
  ];
  newUser: InviteUser = this.initialInviteUser();
  customerSelectionDisabled = true;

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "state", label: this.$t("state").toString() },
      { key: "role", label: this.$t("role").toString() },
      { key: "actions", label: "" },
    ];

    await this.updateUserRows();
  }

  async updateUserRows() {
    let users: UserSchema[] = [];
    try {
      users = await volateqApi.getUsers();
    } catch (e) {
      appContentEventBus.showError(e);
    }

    this.rows = users.map((user: UserSchema) => {
      let stateDate = "";
      let userState = user.state.toLowerCase();
      if (user.is_locked) {
        userState = "locked";
      } else {
        if (user.state === UserStateSchema.REGISTERED) {
          stateDate =
            this.$t("registered-at").toString() + " " + new Date(Date.parse(user.registered_at)).toLocaleString();
        } else if (user.state === UserStateSchema.PENDING) {
          stateDate = this.$t("invited-at").toString() + " " + new Date(Date.parse(user.invited_at)).toLocaleString();
        }
      }

      return {
        id: user.id,
        name: {
          userName: ((user.first_name || "") + " " + (user.last_name || "")).trim(),
          email: user.email,
        },
        state: {
          date: stateDate,
          userState: userState,
        },
        role: {
          userRole: user.role.name.toString(),
          customer: user.role.name === ApiRoles.CUSTOMER_ADMIN && user.customer ? user.customer.name : null,
        },
      };
    });
  }

  async showInviteUserModal() {
    this.newUser = this.initialInviteUser();
    this.customerSelectionDisabled = true;
    this.appInviteModal.show();

    try {
      this.customers = (await volateqApi.getCustomers()).map(customer => ({
        value: customer.id,
        text: customer.name,
      }));
    } catch (e) {
      this.appInviteModal.alertError(e.error);
    }
  }

  async inviteUser() {
    const errMsg = this.getErrorInviteUserForm();
    if (errMsg) {
      this.appInviteModal.alertError(errMsg);
      appButtonEventBus.stopLoading();

      return;
    }

    this.appInviteModal.hideAlert();

    try {
      appButtonEventBus.startLoading();
      await volateqApi.inviteUser(this.newUser);

      this.appInviteModal.hide();
      appContentEventBus.showSuccessAlert(this.$t("user-invited-successfully").toString());

      await this.updateUserRows();
    } catch (e) {
      this.appInviteModal.alertError(e.error);
    } finally {
      appButtonEventBus.stopLoading();
    }
  }

  initialInviteUser(): InviteUser {
    return {
      email: "",
      role: "",
    };
  }

  onRoleSelectionChanged() {
    if (this.newUser.role !== ApiRoles.CUSTOMER_ADMIN) {
      this.customerSelectionDisabled = true;
      this.newUser.customer_id = undefined;
    } else {
      this.customerSelectionDisabled = false;
    }
  }

  async onResendInvitationClick(user: { id: string }) {
    try {
      await volateqApi.resendUserInvitation(user.id);

      appContentEventBus.showSuccessAlert(this.$t("user-invitation-sent-successfully").toString());
    } catch (e) {
      appContentEventBus.showError(e);
    }
  }

  async onUnLockClick(user: { id: string; state: { userState: "locked" | "registered" | "pending" } }) {
    try {
      const lock = user.state.userState !== "locked";

      await volateqApi.unLockUser(user.id, lock);

      appContentEventBus.showSuccessAlert(
        this.$t(lock ? "user-locked-successfully" : "user-unlocked-successfully").toString()
      );

      await this.updateUserRows();
    } catch (e) {
      appContentEventBus.showError(e);
    }
  }

  getErrorInviteUserForm(): string {
    if (!/^\S+@\S+$/.test(this.newUser.email.trim())) {
      return "INVALID_OR_MISSING_EMAIL";
    }
    if (Object.keys(ApiRoles).indexOf(this.newUser.role) === -1) {
      return "INVALID_OR_MISSING_ROLE";
    }
    if (this.newUser.role === ApiRoles.CUSTOMER_ADMIN && !this.newUser.customer_id) {
      return "CUSOMTER_REQUIRED_FOR_CUSTOMER_ADMIN";
    }

    return "";
  }
}
</script>

<style lang="scss"></style>
