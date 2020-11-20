export interface IFetchComponent<T> {
  storageKey: string;
  fetchData(): T | undefined;
  storeData(): void;
  getStorageData(): T | undefined;
}
