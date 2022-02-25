import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiBaseUrl } from "@/environment/environment";
import store from "@/app/app-state";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";

export class HttpClientBase {
  private readonly httpClient: AxiosInstance;

  protected readonly baseURL: string | undefined;

  static createAuthHttpClient(baseURL: string): AxiosInstance {
    const httpClient = Axios.create({ baseURL });
    httpClient.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      if (store.getters.auth.isAuthenticated) {
        config.headers = { Authorization: `Bearer ${store.state.auth.token}` };
      }

      return config;
    });

    return httpClient;
  }

  constructor() {
    this.baseURL = apiBaseUrl;
    this.httpClient = HttpClientBase.createAuthHttpClient(this.baseURL!);
    this.httpClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response && error.response.data && error.response.data.error) {
          if (
            error.response.data.error === ApiErrors.INVALID_TOKEN ||
            error.response.data.error === ApiErrors.TOKEN_EXPIRED
          ) {
            store.dispatch.auth.updateToken({ token: "", role: "", customer_id: undefined });

            location.reload();
          }

          return Promise.reject(error.response.data);
        }

        console.error("FATAL");
        console.error(error);

        return Promise.reject({
          error: ApiErrors.SOMETHING_WENT_WRONG,
          message: "Ooops! Something went horribly wrong!",
        });
      }
    );
  }

  protected async postForm(url: string, data: Record<string, string | File | File[]>): Promise<any> {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }

    return this.httpClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
  }

  protected async post(url: string, data?: any, config?: AxiosRequestConfig | undefined, params?: any): Promise<any> {
    return this.httpClient.post(this.getUrl(url, params), data, config);
  }

  protected async get(url: string, params?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return this.httpClient.get(this.getUrl(url, params), config);
  }

  protected async delete(url: string, config?: AxiosRequestConfig | undefined): Promise<any> {
    return this.httpClient.delete(url, config);
  }

  protected getUrl(url: string, params?: any) {
    return url + ((params && this.getQueryParams(params)) || "");
  }

  protected getQueryParams(params: any): string {
    return (
      "?" +
      Object.keys(params)
        .map(key => key + "=" + encodeURIComponent(params[key]))
        .join("&")
    );
  }
}
