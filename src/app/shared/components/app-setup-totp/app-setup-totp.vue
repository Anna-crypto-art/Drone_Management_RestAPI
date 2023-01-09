<template>
  <div class="app-setup-totp">
    <h3>{{ $t('mfa-totp-setup') }}</h3>
    <span v-html="$t('mfa-totp-setup-instructions')"></span>
    <ul>
      <li>FreeOTP Authenticator (<a href="https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp">Android</a> | <a href="https://apps.apple.com/de/app/freeotp-authenticator/id872559395">Apple</a>)</li>
      <li>Microsoft Authenticator (<a href="https://play.google.com/store/apps/details?id=com.azure.authenticator">Android</a> | <a href="https://apps.apple.com/de/app/microsoft-authenticator/id983156458">Apple</a>)</li>
      <li>Google Authenticator (<a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">Android</a> | <a href="https://apps.apple.com/de/app/google-authenticator/id388497605">Apple</a>)</li>
    </ul>
    <div class="mar-top">
      <b-spinner v-show="loadingQRCode" class="align-middle" />
      <div v-show="totpSecret">
        <b-row>
          <b-col>
            <canvas ref="qrCodeCanvas"></canvas>
          </b-col>
          <b-col>
            <b-form-group class="mar-top-half" :label="$t('secret-token')">
              <b-form-input readonly v-model="totpSecret" size="sm" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="mar-top">
      <app-security-code v-model="securityCode" :authMethod="1" @input="onChangeSecurityCode" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import QRCode from "qrcode";

import { CatchError } from "../../services/helper/catch-helper";
import AppSecurityCode from "@/app/shared/components/app-security-code/app-security-code.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "../../services/volateq-api/volateq-api";
import { BaseComponent } from "../base-component/base-component";

@Component({
  name: "app-setup-totp",
  components: {
    AppSecurityCode,
    AppButton,
  }
})
export default class AppSetupTotp extends BaseComponent {
  @Prop({ default: null }) value!: string | null;
  @Prop({ required: true }) confirmationKey!: string;

  @Ref() qrCodeCanvas!: HTMLCanvasElement;

  loadingQRCode = true;

  totpSecret: string | null = null;

  securityCode: string | null = null;

  @CatchError('loadingQRCode')
  async created() {
    const totpSecrets = await volateqApi.getTotpSecrets(this.confirmationKey);
    
    await this.loadQRCode(totpSecrets.url);

    this.totpSecret = totpSecrets.secret;

    this.securityCode = this.value;
  }

  onChangeSecurityCode() {
    this.$emit("input", this.securityCode);
  }

  private async loadQRCode(url: string) {
    await new Promise<void>((resolve, reject) => {
      QRCode.toCanvas(this.qrCodeCanvas, url, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }
}
</script>

<style lang="scss">
.app-setup-totp {
  ul {
    margin-left: 2em;
    margin-top: 0.5em;
  }
}
</style>
