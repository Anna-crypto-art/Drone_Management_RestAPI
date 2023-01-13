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
      id="changeAuthMethodMail2TotpModal"
      ref="changeAuthMethodMail2TotpModal"
      :title="$t('mfa')"
      :subtitle="$t('mfa-email_descr')"
      :modalLoading="loading"
      :okTitle="$t('apply')"
      @submit="onChangeAuthMethodMail2Totp"
    >
      <app-modal-form-info-area>
        <app-security-code v-if="confirmationKey" v-model="emailSecurityCode" :authMethod="user.auth_method" />
      </app-modal-form-info-area>
      <app-modal-form-info-area cls="no-mar-bottom">
        <app-setup-totp v-if="confirmationKey && authMethod === 1" :confirmationKey="confirmationKey" v-model="totpSecurityCode" />
      </app-modal-form-info-area>
    </app-modal-form>

    <app-modal-form 
      id="changeAuthMethodTotp2MailModal"
      ref="changeAuthMethodTotp2MailModal"
      :title="$t('mfa')"
      :subtitle="$t('mfa-totp_descr')"
      :modalLoading="loading"
      :okTitle="$t('apply')"
      @submit="onChangeAuthMethodTotp2Mail"
    >
      <app-modal-form-info-area>
        <app-security-code v-if="confirmationKey" v-model="totpSecurityCode" :authMethod="user.auth_method" />
      </app-modal-form-info-area>
      <app-modal-form-info-area cls="no-mar-bottom">
        <app-security-code v-if="confirmationKey" v-model="emailSecurityCode" :authMethod="authMethod" />
      </app-modal-form-info-area>
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
import AppModalFormInfoArea from "@/app/shared/components/app-modal/app-modal-form-info-area.vue";
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
    AppModalFormInfoArea,
  },
})
export default class AppChangeAuthMethod extends BaseAuthComponent {
  @Prop({ required: true }) user!: UserSchema;
  
  @Ref() prepAuthChangeModal!: IAppModalForm;
  @Ref() changeAuthMethodMail2TotpModal!: IAppModalForm;
  @Ref() changeAuthMethodTotp2MailModal!: IAppModalForm;

  authMethod: UserAuthMethod | null = null;
  changeAuthMethod: UserAuthMethod | null = null;

  submitDisabled = true;
  loading = false;

  password: string | null = null;

  confirmationKey: string | null = null;

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

    if (this.user.auth_method === UserAuthMethod.EMAIL && this.authMethod === UserAuthMethod.TOTP) {
      this.changeAuthMethodMail2TotpModal.show();
    } else if (this.user.auth_method === UserAuthMethod.TOTP && this.authMethod === UserAuthMethod.EMAIL) {
      this.changeAuthMethodTotp2MailModal.show();
    } else {
      throw new Error("Unsupported auth method")
    }
  }

  @CatchError("loading")
  async onChangeAuthMethodMail2Totp() {
    this.validateSecurityCode(this.emailSecurityCode);
    this.validateSecurityCode(this.totpSecurityCode);

    await volateqApi.changeUserAuthMethod(this.authMethod!, this.confirmationKey!, this.emailSecurityCode!, this.totpSecurityCode!);

    this.changeAuthMethodMail2TotpModal.hide();

    this.finishChangeAuthMethod();
  }

  @CatchError("loading")
  async onChangeAuthMethodTotp2Mail() {
    this.validateSecurityCode(this.totpSecurityCode);
    this.validateSecurityCode(this.emailSecurityCode);

    await volateqApi.changeUserAuthMethod(this.authMethod!, this.confirmationKey!, this.totpSecurityCode!, this.emailSecurityCode!);

    this.changeAuthMethodTotp2MailModal.hide();

    this.finishChangeAuthMethod();
  }

  private validateSecurityCode(securityCode: string | null) {
    if (!securityCode || securityCode.length !== 6) {
      throw { error: 'INVALID_SECURITY_CODE', message: 'Please type a valid security code' } as ApiException;
    }
  }

  private finishChangeAuthMethod() {
    this.password = null;
    this.emailSecurityCode = null;
    this.totpSecurityCode = null;
    this.confirmationKey = null;

    this.showSuccess(this.$t('auth-method-changed-success').toString());

    UserEventService.emit(this.user.id, UserEvent.CHANGED);
  }

  private changeSubmitDisabled() {
    this.submitDisabled = this.user.auth_method === this.authMethod;
  }
}
</script>

<style></style>
