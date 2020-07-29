/**
 * App Storage class
 * @description This will be responsible for storing data into the application.
 * Commonly, people use LocalStorage or SessionStorage. This is just a wrapper over them
 * because to restrict the usage of Global window storage throughtout the application
 * Default, this is just using the LocalStorage
 */
export class AppStorage {
  storage: Storage

  constructor(storage?: Storage) {
    this.storage = storage || window.localStorage;

    /** Is storage is supported or not */
    if (!this.isSupported()) {
      throw new Error('Storage is not supported by browser!');
    }
  }

  public setItem(key: string, value: any) {
    console.log('setItem: ' + key + '=' + JSON.stringify(value));

    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const item = this.storage.getItem(key);

    console.log('getItem: ' + key + '=' + item);
    
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }

  /**
   * @description Check for storage support
   * @returns {boolean} supported
   * */
  private isSupported() {
    let supported = true;

    if (!this.storage) {
      supported = false;
    }

    return supported;
  }
}

/**
 * Creating the instance of storage. Default will be localStorage
 * but if you want to create instance for session storage then pass window.sessionStorage as parameter
 */
const appLocalStorage = new AppStorage();
const appSessionStorage = new AppStorage(window.sessionStorage);

export { appLocalStorage, appSessionStorage };
