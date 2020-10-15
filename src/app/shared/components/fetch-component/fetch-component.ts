import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { Component } from "vue-property-decorator";

@Component({
  beforeRouteLeave(to, from, next) {
    (this as any).onBeforeRouteLeave();

    next();
  }
})
export class FetchComponent<T> extends BaseAuthComponent {
  protected storageKey = "";
  protected onFetchData(data: T | undefined): void { /* override me */ }
  protected onStoreData(): T | undefined { return undefined }

  created() {
    this.fetchData();
  }

  onBeforeRouteLeave() {
    this.storeData();
  }

  private fetchData() {
    this.onFetchData(appLocalStorage.getItem(this.storageKey));
    this.clearStorageData();
  }

  protected storeData() {
    const data = this.onStoreData();
    if (data) {
      appLocalStorage.setItem(this.storageKey, data);
    } else {
      this.clearStorageData();
    }
  }

  protected clearStorageData() {
    appLocalStorage.removeItem(this.storageKey);
  }
}
