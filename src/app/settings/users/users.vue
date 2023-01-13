<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite" @click="showInviteUserModal()" v-b-modal.invite-modal>
        {{ $t("invite") }}
      </b-button>
    </div>
    <div class="clearfix"></div>
    <app-table-container>
      <b-table :fields="columns" :items="rows" head-variant="light" hover :busy="loading">
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
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
          {{ row.item.role.name }}
          <span v-if="row.item.customer.id"
            ><br /><small class="grayed">{{ row.item.customer.name }}</small></span
          >
        </template>
        <template #cell(authMethod)="row">
          <app-icon :icon="getAuthMethodIcon(row.item.authMethod)" />
        </template>
        <template #cell(plants)="row">
          <div v-for="plant in row.item.plants" :key="plant.id">
            {{ plant.name }}
          </div>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <b-button
              v-show="row.item.role !== 'SUPER_ADMIN'"
              @click="onEditUserClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('edit-user')"
            >
              <b-icon icon="wrench" />
            </b-button>
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
            <b-button
              @click="onDeleteUserClick(row.item)"
              variant="outline-danger"
              size="sm"
              :title="$t('delete-user')"
            >
              <b-icon icon="trash"></b-icon>
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
      :modalLoading="inviteLoading"
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
              v-model="newUser.role_id"
              :options="roles"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('customer')" label-for="customer">
            <b-form-select
              id="customer"
              v-model="newUser.customer_id"
              :options="customers"
              @change="onCustomerChanged"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-show="newUser.customer_id">
          <div><b>{{ $t("plants") }}</b></div>
          <div v-for="customerPlant in inviteUserCustomerPlants" :key="customerPlant.plant.id">
            <b-checkbox 
              v-model="customerPlant.selected"
            >
              {{ customerPlant.plant.name }}
              <small class="grayed" v-if="customerPlant.otherCustomers">{{ customerPlant.otherCustomers }}</small>
            </b-checkbox>
          </div>
        </b-col>
      </b-row>
    </app-modal-form>
    <app-modal-form
      id="edit-user-modal"
      ref="appEditUserModal"
      :ok-title="$t('apply')"
      :modalLoading="editUserLoading"
      @submit="updateUser"
    >
      <template #modal-title>
        <h4>{{ $t("update-user", { user: editUser && editUser.email || "" }) }}</h4>
      </template>
      <b-row v-if="editUser">
        <b-col>
          <b-form-group :label="$t('role')" label-for="role">
            <b-form-select
              id="role"
              v-model="editUser.roleId"
              :options="roles"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <div><b>{{ $t("plants") }}</b></div>
          <div v-for="customerPlant in editUser.customerPlants" :key="customerPlant.plant.id">
            <b-checkbox 
              v-model="customerPlant.selected"
            >
              {{ customerPlant.plant.name }}
              <small class="grayed" v-if="customerPlant.otherCustomers">{{ customerPlant.otherCustomers }}</small>
            </b-checkbox>
          </div>
        </b-col>
      </b-row>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { UserAuthMethod, UserSchema, UserStateSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { InviteUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { apiRoleNames, ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import { BvTableFieldArray } from "bootstrap-vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { EditUser, UserItem } from "@/app/settings/users/types";
import { SelectPlant } from "@/app/settings/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import dateHelper from "@/app/shared/services/helper/date-helper";


const MAX_USERS_PER_CUSTOMER = 10;


@Component({
  name: "app-settings-users",
  components: {
    AppTableContainer,
    AppModalForm,
    AppIcon,
  },
})
export default class AppSettingsUsers extends BaseAuthComponent {
  columns: BvTableFieldArray = [];
  rows: UserItem[] = [];

  plants!: PlantSchema[];

  @Ref() appInviteModal!: IAppModalForm;
  loading = false;
  inviteLoading = false;
  customers: any[] = [];
  roles = [
    { value: ApiRoles.CUSTOMER_ADMIN, text: apiRoleNames[ApiRoles.CUSTOMER_ADMIN] },
    { value: ApiRoles.PILOT, text: apiRoleNames[ApiRoles.PILOT] },
    { value: ApiRoles.ASSISTANT, text: apiRoleNames[ApiRoles.ASSISTANT] },
  ];
  newUser: InviteUser = this.initialInviteUser();
  inviteUserCustomerPlants: SelectPlant[] = [];

  @Ref() appEditUserModal!: IAppModalForm;
  editUserLoading = false;
  editUser: EditUser | null = null;

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "state", label: this.$t("state").toString() },
      { key: "role", label: this.$t("role").toString() },
      { key: "authMethod", label: this.$t("mfa-method").toString() },
      { key: "plants", label: this.$t("plants").toString() },
      { key: "actions", label: "" },
    ];

    await this.updateUserRows();

    try {
      this.customers = (await volateqApi.getCustomers()).map(customer => ({
        value: customer.id,
        text: customer.name,
      }));
      this.customers.unshift({ value: null, text: '' })

      this.plants = await volateqApi.getAllPlants();
    } catch (e) {
      this.showError(e);
    }
  }

  async updateUserRows() {
    let users: UserSchema[] = [];
    this.loading = true;
    try {
      users = await volateqApi.getUsers(this.selectedCustomer?.id);

      this.rows = users.map((user: UserSchema) => {
        let stateDate = "";
        let userState = user.state.toLowerCase() as any;
        if (user.is_locked) {
          userState = "locked";
        } else {
          if (user.state === UserStateSchema.REGISTERED) {
            stateDate =
              this.$t("registered-at").toString() + " " + dateHelper.toDateTime(user.registered_at);
          } else if (user.state === UserStateSchema.PENDING) {
            stateDate = this.$t("invited-at").toString() + " " + dateHelper.toDateTime(user.invited_at);
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
          customer: {
            name: user.customer ? user.customer.name : null,
            id: user.customer ? user.customer.id : null,
          },
          role: user.role,
          plants: user.plants || [],
          authMethod: user.auth_method
        };
      }).sort((a, b) => {
        // SUPER_ADMINS at first
        if (a.role.id === ApiRoles.SUPER_ADMIN && b.role.id !== ApiRoles.SUPER_ADMIN) {
          return -1;
        }
        if (b.role.id === ApiRoles.SUPER_ADMIN && a.role.id !== ApiRoles.SUPER_ADMIN) {
          return 1;
        }

        const aEmail = a.name.email.toLowerCase();
        const bEmail = b.name.email.toLowerCase();
        
        if (aEmail < bEmail) {
          return -1;
        }
        if (aEmail > bEmail) {
          return 1;
        }

        return 0;
      });
    } catch (e) {
      this.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }

  async showInviteUserModal() {
    this.newUser = this.initialInviteUser();
    this.setInviteUserCustomerPlants();
    this.appInviteModal.show();
  }

  async inviteUser() {
    const errMsg = this.getErrorInviteUserForm();
    if (errMsg) {
      this.showError(errMsg);
      this.inviteLoading = false;

      return;
    }

    this.inviteLoading = true;
    try {
      this.newUser.plant_ids = this.inviteUserCustomerPlants.filter(customerPlant => customerPlant.selected)
        .map(customerPlant => customerPlant.plant.id);

      await volateqApi.inviteUser(this.newUser);

      this.appInviteModal.hide();

      this.showSuccess(this.$t("user-invited-successfully").toString());

      await this.updateUserRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.inviteLoading = false;
    }
  }

  initialInviteUser(): InviteUser {
    return {
      email: "",
      role_id: null,
      customer_id: this.selectedCustomer?.id || null,
    };
  }

  async onResendInvitationClick(user: { id: string }) {
    try {
      await volateqApi.resendUserInvitation(user.id);

      this.showSuccess(this.$t("user-invitation-sent-successfully").toString());
    } catch (e) {
      this.showError(e as ApiException);
    }
  }

  async onUnLockClick(user: UserItem) {
    try {
      const lock = user.state.userState !== "locked";

      const confirmText = this.$t("sure-un-lock-user", { lock: lock ? "Lock" : "Unlock", user: user.name.email }).toString();
      if (!confirm(confirmText)) {
        return;
      }

      await volateqApi.unLockUser(user.id, lock);

      this.showSuccess(
        this.$t(lock ? "user-locked-successfully" : "user-unlocked-successfully").toString()
      );

      await this.updateUserRows();
    } catch (e) {
      this.showError(e as ApiException);
    }
  }

  async onDeleteUserClick(user: UserItem) {
    this.loading = true;
    try {
      const confirmText = this.$t("sure-delete-user", { user: user.name.email }).toString();
      if (!confirm(confirmText)) {
        return;
      }

      await volateqApi.deleteUser(user.id);

      this.showSuccess(this.$t("user-deleted-successfully", { user: user.name.email }).toString());

      await this.updateUserRows();
    } catch (e) {
      this.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }

  onCustomerChanged() {
    if (this.newUser.customer_id) {
      const userCount = this.rows.filter(user => user.customer.id === this.newUser.customer_id).length;
      if (userCount >= MAX_USERS_PER_CUSTOMER) {
        this.appInviteModal.alertInfo(this.$t("user-limit-for-customer-reached").toString());
      }
    }

    this.setInviteUserCustomerPlants();
  }

  onEditUserClick(user: UserItem) {
    this.editUser = {
      id: user.id,
      email: user.name.email,
      roleId: user.role.id,
      customerPlants: this.getEditUserCustomerPlants(user),
    };

    this.appEditUserModal.hideAlert();
    this.appEditUserModal.show();
  }

  setInviteUserCustomerPlants() {
    if (this.newUser?.customer_id) {
      this.inviteUserCustomerPlants = this.plants
        .filter(plant => plant.customers!.find(customer => customer.id === this.newUser.customer_id))
        .map(plant => ({ 
          plant,
          selected: false,
          otherCustomers: plant.customers!.filter(customer => customer.id !== this.newUser.customer_id)
            .map(customer => customer.name).join(', ')
        }));
    } else {
      this.inviteUserCustomerPlants = [];
    }
  }

  async updateUser() {
    this.editUserLoading = true;
    try {
      const plantIds = this.editUser!.customerPlants.filter(userPlant => userPlant.selected)
        .map(userPlant => userPlant.plant.id);

      await volateqApi.assignPlantsToUser(this.editUser!.id, plantIds);
      await volateqApi.changeUserRole(this.editUser!.id, this.editUser!.roleId);

      this.appEditUserModal.hide();

      this.showSuccess(this.$t("user-edited-successfully").toString());

      await this.updateUserRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.editUserLoading = false;
    }
  }

  getAuthMethodIcon(authMethod: UserAuthMethod): string {
    switch (authMethod) {
      case UserAuthMethod.EMAIL:
        return "envelope";
      case UserAuthMethod.TOTP:
        return "phone-fill";
    }
    return ""
  }

  private getEditUserCustomerPlants(user: UserItem) {
    if (user?.customer.id) {
      return this.plants
          .filter(plant => plant.customers!.find(customer => customer.id === user!.customer.id))
          .map(plant => ({
            plant,
            selected: !!user!.plants.find(userPlant => userPlant.id === plant.id),
            otherCustomers: plant.customers!.filter(customer => customer.id !== user!.customer.id)
              .map(customer => customer.name).join(', ')
          }));
    } 

    return [];
  }

  getErrorInviteUserForm(): string {
    if (!/^\S+@\S+$/.test(this.newUser.email.trim())) {
      return "INVALID_OR_MISSING_EMAIL";
    }
    if (this.newUser.role_id === null || !Object.values(ApiRoles).includes(this.newUser.role_id)) {
      return "INVALID_OR_MISSING_ROLE";
    }
    if (!this.newUser.customer_id) {
      return "MISSING_CUSTOMER";
    }

    return "";
  }
}
</script>

<style lang="scss">
.app-settings-users-table-toolbar-select-customer {
  width: 200px !important;
  float: right;
  &-label {
    float: right;
    margin-top: 5px;
    padding-right: 1em;
  }
}
</style>
