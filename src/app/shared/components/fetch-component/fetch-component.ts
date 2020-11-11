import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { Component } from "vue-property-decorator";

@Component({
  beforeRouteLeave(to, from, next) {
    (this as any).onBeforeRouteLeave();

    next();
  }
})
/**
 * Actually this should be an abstract class, but decorator @Component does not work with abstract classes...
 */
export class FetchComponent<T> extends BaseAuthComponent {
  protected storageKey = "";
  /**
   * if returns true storage data will be cleared after fetching
   * @param data 
   */
  protected onFetchData(data: T | undefined): void | Promise<void> { /* abstract */ }
  protected onStoreData(): T | undefined { return undefined }

  created() {
    this.fetchData();
  }

  onBeforeRouteLeave() {
    this.storeData();
  }

  private fetchData() {
    this.onFetchData(appLocalStorage.getItem(this.storageKey));
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
