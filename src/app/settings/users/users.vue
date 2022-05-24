<template>
  <div class="app-settings-users">
    <div class="app-settings-users-table-toolbar">
      <b-button variant="primary" class="btn-invite" @click="showInviteUserModal()" v-b-modal.invite-modal>
        {{ $t("invite") }}
      </b-button>
      <b-form-select
        id="customers"
        class="app-settings-users-table-toolbar-select-customer"
        v-model="selectedCustomerId"
        :options="customers"
        @change="onCustomerSelectionChanged"
      />
      <label class="app-settings-users-table-toolbar-select-customer-label" for="customers">{{ $t("customer") }}</label>
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
          {{ row.item.role }}
          <span v-if="row.item.customer.id"
            ><br /><small class="grayed">{{ row.item.customer.name }}</small></span
          >
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
        <h4>{{ $t("assign-plants-to-user", { user: editUser.name.email}) }}</h4>
      </template>
      <b-row>
        <b-col>
          <div><b>{{ $t("plants") }}</b></div>
          <div v-for="customerPlant in editUserCustomerPlants" :key="customerPlant.plant.id">
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
import { BvTableFieldArray } from "bootstrap-vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { UserItem, UserPlant } from "@/app/settings/users/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

@Component({
  name: "app-settings-users",
  components: {
    AppTableContainer,
    AppModalForm,
  },
})
export default class AppSettingsUsers extends Vue {
  columns: BvTableFieldArray = [];
  rows: UserItem[] = [];

  plants!: PlantSchema[];

  @Ref() appInviteModal!: IAppModalForm;
  loading = false;
  inviteLoading = false;
  customers: any[] = [];
  roles = [
    { value: ApiRoles.CUSTOMER_ADMIN, text: ApiRoles.CUSTOMER_ADMIN },
  ];
  newUser: InviteUser = this.initialInviteUser();
  selectedCustomerId: string | null = null;
  inviteUserCustomerPlants: UserPlant[] = [];

  @Ref() appEditUserModal!: IAppModalForm;
  editUserLoading = false;
  editUser: UserItem | null = null;
  editUserCustomerPlants: UserPlant[] = [];

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "state", label: this.$t("state").toString() },
      { key: "role", label: this.$t("role").toString() },
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

      this.plants = await volateqApi.getPlants();
    } catch (e) {
      this.appInviteModal.alertError((e as ApiException).error);
    }
  }

  async updateUserRows() {
    let users: UserSchema[] = [];
    this.loading = true;
    try {
      users = await volateqApi.getUsers(this.selectedCustomerId || undefined);

      this.rows = users.map((user: UserSchema) => {
        let stateDate = "";
        let userState = user.state.toLowerCase() as any;
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
          customer: {
            name: user.customer ? user.customer.name : null,
            id: user.customer ? user.customer.id : null,
          },
          role: user.role.name.toString(),
          plants: user.plants || [],
        };
      }).sort((a, b) => {
        // SUPER_ADMINS at first
        if (a.role === ApiRoles.SUPER_ADMIN && b.role !== ApiRoles.SUPER_ADMIN) {
          return -1;
        }
        if (b.role === ApiRoles.SUPER_ADMIN && a.role !== ApiRoles.SUPER_ADMIN) {
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
      appContentEventBus.showError(e as ApiException);
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
      this.appInviteModal.alertError(errMsg);
      this.inviteLoading = false;

      return;
    }

    this.appInviteModal.hideAlert();

    this.inviteLoading = true;
    try {
      this.newUser.plant_ids = this.inviteUserCustomerPlants.filter(customerPlant => customerPlant.selected)
        .map(customerPlant => customerPlant.plant.id);

      await volateqApi.inviteUser(this.newUser);

      this.appInviteModal.hide();
      appContentEventBus.showSuccessAlert(this.$t("user-invited-successfully").toString());

      await this.updateUserRows();
    } catch (e) {
      this.appInviteModal.alertError((e as ApiException).error);
    } finally {
      this.inviteLoading = false;
    }
  }

  initialInviteUser(): InviteUser {
    if (this.selectedCustomerId) {
      return {
        email: "",
        role: ApiRoles.CUSTOMER_ADMIN,
        customer_id: this.selectedCustomerId,
      }
    }

    return {
      email: "",
      role: "",
    };
  }

  onRoleSelectionChanged() {
    if (this.newUser.role !== ApiRoles.CUSTOMER_ADMIN) {
      this.newUser.customer_id = undefined;
    }
  }

  async onResendInvitationClick(user: { id: string }) {
    try {
      await volateqApi.resendUserInvitation(user.id);

      appContentEventBus.showSuccessAlert(this.$t("user-invitation-sent-successfully").toString());
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
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

      appContentEventBus.showSuccessAlert(
        this.$t(lock ? "user-locked-successfully" : "user-unlocked-successfully").toString()
      );

      await this.updateUserRows();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onCustomerSelectionChanged() {
    await this.updateUserRows();
  }

  async onDeleteUserClick(user: UserItem) {
    this.loading = true;
    try {
      const confirmText = this.$t("sure-delete-user", { user: user.name.email }).toString();
      if (!confirm(confirmText)) {
        return;
      }

      await volateqApi.deleteUser(user.id);

      appContentEventBus.showSuccessAlert(this.$t("user-deleted-successfully", { user: user.name.email }).toString());

      await this.updateUserRows();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }

  onCustomerChanged() {
    this.setInviteUserCustomerPlants();
  }

  onEditUserClick(user: UserItem) {
    this.editUser = user;
    this.setEditUserCustomerPlants();

    this.appEditUserModal.hideAlert();
    this.appEditUserModal.show();
  }

  setInviteUserCustomerPlants() {
    if (this.newUser?.customer_id) {
      this.inviteUserCustomerPlants = this.plants
        .filter(plant => plant.customers.find(customer => customer.id === this.newUser.customer_id))
        .map(plant => ({ 
          plant,
          selected: false,
          otherCustomers: plant.customers.filter(customer => customer.id !== this.newUser.customer_id)
            .map(customer => customer.name).join(', ')
        }));
    } else {
      this.inviteUserCustomerPlants = [];
    }
  }

  async updateUser() {
    this.appEditUserModal.hideAlert();

    this.editUserLoading = true;
    try {
      const plantIds = this.editUserCustomerPlants.filter(userPlant => userPlant.selected)
        .map(userPlant => userPlant.plant.id);

      await volateqApi.assignPlantsToUser(this.editUser!.id, plantIds);

      this.appEditUserModal.hide();

      appContentEventBus.showSuccessAlert(this.$t("user-edited-successfully").toString());

      await this.updateUserRows();
    } catch (e) {
      this.appInviteModal.alertError((e as ApiException).error);
    } finally {
      this.editUserLoading = false;
    }
  }

  setEditUserCustomerPlants() {
    if (this.editUser?.customer.id) {
      this.editUserCustomerPlants = this.plants
          .filter(plant => plant.customers.find(customer => customer.id === this.editUser!.customer.id))
          .map(plant => ({
            plant,
            selected: !!this.editUser!.plants.find(userPlant => userPlant.id === plant.id),
            otherCustomers: plant.customers.filter(customer => customer.id !== this.editUser!.customer.id)
              .map(customer => customer.name).join(', ')
          }));
    } else {
      this.editUserCustomerPlants = [];
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
