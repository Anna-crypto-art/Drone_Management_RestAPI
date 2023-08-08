<template>
  <div class="app-volafly-download">
    <app-auth-container :title="$t('download-volafly-drone-app')" size="large">
      <div>{{ $t('choose-drone-model') }}</div><br>
      <div class="buttons">
        <div>
          <app-button variant="secondary" icon="download" cls="width-50pc" :loading="loading" @click="downloadVolaFlyApp('sdk4')">{{ $t("for dji-mavic-2") }}</app-button>
          <div class="button-expl">{{ $t('download-button_mavic2_expl') }}</div>
        </div> 
        <div>  
          <app-button icon="download" cls="width-50pc" :loading="loading" @click="downloadVolaFlyApp('sdk5')">{{ $t("for dji-mavic-3") }}</app-button>
          <div class="button-expl">{{ $t('download-button_mavic3_expl') }}</div>
        </div>         
      </div> 
      <hr>
      <div class="guide">
        <div>1. {{ $t('download-apk') }}</div><br>
        <div>2. {{ $t('click-apk') }}</div><br>
        <div>3. {{ $t('install-app') }}</div><br>
        <div>4. {{ $t('login-app') }}</div><br>
      </div>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import AppAuthContainer from "@/app/shared/components/app-auth-container/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component } from "vue-property-decorator";
import { AppDownloader } from "../shared/services/app-downloader/app-downloader";
import { BaseComponent } from "../shared/components/base-component/base-component";
import { CatchError } from "@/app/shared/services/helper/catch-helper";


@Component({
  name: "app-volafly-download",
  components: {
    AppAuthContainer,
    AppButton,
  },
})
export default class AppVolaflyDownload extends BaseComponent {

  loading = false;

  @CatchError("loading")
  async downloadVolaFlyApp(sdkVersion: string) {
    const downloadUrl = await volateqApi.downloadVolaFlyAppUrl(sdkVersion)

    AppDownloader.download(downloadUrl.url);
  }
}
</script>

<style lang="scss">

.app-auth-container {
  .app-auth-box {
    position: relative;
    text-align: center;
  }
}

.buttons {
  display: flex;
  justify-content: center;
}

.app-button {
  margin: 10px;
}

.guide {
  text-align: left;
  display: inline-flex;
  flex-direction: column;
  margin: auto;
}

.button-expl {
  text-align: left;
  color: grey;
  font-size: 9pt;
  width: 160px;
  display: inline-flex;
  margin: auto;  
}
</style>

