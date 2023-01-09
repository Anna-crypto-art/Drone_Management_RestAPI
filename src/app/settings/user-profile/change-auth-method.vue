<template>
  <app-box :title="$t('change-authentication-method')" :subtitle="$t('change-authentication-method_descr')">
    <b-form @submit.prevent="onSubmit">
      <app-select-auth-method v-model="authMethod" @input="onAuthMethodChanged" />
      <app-button type="submit" :loading="loading" :disabled="submitDisabled">{{ $t("apply") }}</app-button>
    </b-form>

    <app-modal-form 
      id="prepAuthChangeModal"
      ref="prepAuthChangeModal"
      :title="$t('enter-password')"
      :okTitle="$t('apply')"
      :modalLoading="loading"
      @submit="onPrepareAuthMethodChange"
    >
      <b-form-group :label="$t('password')" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          :placeholder="$t('password')"
          required
        ></b-form-input>
      </b-form-group>
    </app-modal-form>

    <app-modal-form 
      id="changeAuthMethodModal"
      ref="changeAuthMethodModal"
      :title="$t('mfa')"
      :subtitle="mfaSubtitle"
      :modalLoading="loading"
      :okTitle="$t('apply')"
      @submit="onChangeAuthMethod"
    >
      <app-security-code v-if="confirmationKey" v-model="oldSecurityCode" :authMethod="user.auth_method" />
    </app-modal-form>

    <app-modal-form 
      id="setupEmailModal"
      ref="setupEmailModal"
      :title="$t('mfa')"
      :subtitle="$t('mfa-email_descr')"
      :modalLoading="loading"
      :okTitle="$t('apply')"
      @submit="onSubmitSetupEmail"
    >
      <app-security-code v-if="mailConfirmationKey" v-model="emailSecurityCode" :authMethod="0" />
    </app-modal-form>

    <app-modal-form
      id="setupTotpModal"
      ref="setupTotpModal"
      :okTitle="$t('done')"
      :showCancelButton="false"
      @submit="onSubmitSetupTotp"
    >
      <app-setup-totp v-if="totpConfirmationKey" :confirmationKey="totpConfirmationKey" v-model="totpSecurityCode" />
    </app-modal-form>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppBox from "@/app/shared/components/app-box/app-box.vue"
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSelectAuthMethod from "@/app/shared/components/app-select-auth-method/app-select-auth-method.vue";
import { UserAuthMethod, UserSchema, UserStateSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppSetupTotp from "@/app/shared/components/app-setup-totp/app-setup-totp.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppSecurityCode from "@/app/shared/components/app-security-code/app-security-code.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { UserEvent, UserEventService } from "./user-event-service";

@Component({
  name: "app-change-auth-method",
  components: {
    AppBox,
    AppButton,
    AppSelectAuthMethod,
    AppModalForm,
    AppSetupTotp,
    AppSecurityCode,
  },
})
export default class AppChangeAuthMethod extends BaseAuthComponent {
  @Prop({ required: true }) user!: UserSchema;
  
  @Ref() prepAuthChangeModal!: IAppModalForm;
  @Ref() changeAuthMethodModal!: IAppModalForm;
  @Ref() setupEmailModal!: IAppModalForm;
  @Ref() setupTotpModal!: IAppModalForm;

  authMethod: UserAuthMethod | null = null;
  changeAuthMethod: UserAuthMethod | null = null;

  submitDisabled = true;
  loading = false;

  password: string | null = null;

  confirmationKey: string | null = null;
  mailConfirmationKey: string | null = null;
  totpConfirmationKey: string | null = null;

  oldSecurityCode: string | null = null;
  emailSecurityCode: string | null = null;
  totpSecurityCode: string | null = null;

  @CatchError()
  async created() {
    this.authMethod = this.user.auth_method;
  }

  @CatchError('loading')
  onAuthMethodChanged() {
    this.changeSubmitDisabled();
  }

  @Watch('user') onUserChanged() {
    this.changeSubmitDisabled();

    this.authMethod = this.user.auth_method;
  }

  @CatchError()
  async onSubmit() {
    if (this.submitDisabled) {
      return;
    }

    this.prepAuthChangeModal.show();
  }

  @CatchError('loading')
  async onPrepareAuthMethodChange() {
    const confirmKey = await volateqApi.prepareUserChangeAuthMethod(this.authMethod!, this.password!);
    this.confirmationKey = confirmKey.confirmation_key;
    this.password = null;

    this.prepAuthChangeModal.hide();

    this.changeAuthMethod = this.user.auth_method;

    this.changeAuthMethodModal.show();
  }

  get mfaSubtitle(): string {
    switch (this.user.auth_method) {
      case UserAuthMethod.EMAIL:
        return this.$t('mfa-email_descr').toString();

      case UserAuthMethod.TOTP:
        return this.$t('mfa-totp_descr').toString();
    }

    return "";
  }

  @CatchError()
  onChangeAuthMethod() {
    this.validateSecurityCode(this.oldSecurityCode);

    this.changeAuthMethodModal.hide();

    if (this.authMethod === UserAuthMethod.EMAIL) {
      this.mailConfirmationKey = this.confirmationKey;
      this.setupEmailModal.show();
    } else if (this.authMethod === UserAuthMethod.TOTP) {
      this.totpConfirmationKey = this.confirmationKey;
      this.setupTotpModal.show();
    }
  }

  @CatchError('loading')
  async onSubmitSetupEmail() {
    this.validateSecurityCode(this.emailSecurityCode);

    await volateqApi.changeUserAuthMethod(this.authMethod!, this.mailConfirmationKey!, this.oldSecurityCode!, this.emailSecurityCode!);

    this.setupEmailModal.hide();

    this.finishChangeAuthMethod();
  }

  @CatchError('loading')
  async onSubmitSetupTotp() {
    this.validateSecurityCode(this.totpSecurityCode);

    await volateqApi.changeUserAuthMethod(this.authMethod!, this.totpConfirmationKey!, this.oldSecurityCode!, this.totpSecurityCode!);

    this.setupTotpModal.hide();

    this.finishChangeAuthMethod();
  }

  private validateSecurityCode(securityCode: string | null) {
    if (!securityCode || securityCode.length !== 6) {
      throw { error: 'INVALID_SECURITY_CODE', message: 'Please type a valid security code' } as ApiException;
    }
  }

  private finishChangeAuthMethod() {
    this.password = null;
    this.oldSecurityCode = null;
    this.emailSecurityCode = null;
    this.totpSecurityCode = null;
    this.confirmationKey = null;
    this.mailConfirmationKey = null;
    this.totpConfirmationKey = null;
    this.totpConfirmationKey = null;

    this.showSuccess(this.$t('auth-method-changed-success').toString());

    UserEventService.emit(this.user.id, UserEvent.CHANGED);
  }

  private changeSubmitDisabled() {
    this.submitDisabled = this.user.auth_method === this.authMethod;
  }
}
</script>

<style></style>
