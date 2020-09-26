// import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiBaseUrl } from "@/environment/environment";
import store from "@/app/app-state";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";

export class HttpClientBase {
  // private readonly httpClient: AxiosInstance;

  constructor() {
    // this.httpClient = Axios.create({
    //   baseURL: apiBaseUrl
    // });
    // this.httpClient.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    //   if (store.getters.auth.isAuthenticated) {
    //     config.headers = { "Authorization": `Bearer ${store.state.auth.token}`};
    //   }
      
    //   return config;
    // });
    // this.httpClient.interceptors.response.use((response: AxiosResponse) => {
    //     return response.data;
    //   }, (error: AxiosError) => {
    //     if (error.response && error.response.data && error.response.data.error) {
    //       if (error.response.data.error === ApiErrors.INVALID_TOKEN || error.response.data.error === ApiErrors.TOKEN_EXPIRED) {
    //         store.dispatch.auth.updateToken({ token: "", role: "" });
    //       }

    //       return Promise.reject(error.response.data);
    //     }
    
    //     console.error("FATAL");
    //     console.error(error);
        
    //     return Promise.reject({
    //       error: ApiErrors.SOMETHING_WENT_WRONG,
    //       message: "Ooops! Something went horribly wrong!"
    //     });
    //   }
    // );
  }

  protected async request(method: "GET" | "POST" | "PATCH" | "DELETE", url: string, data?: any, headers?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const fallbackError = {
        error: ApiErrors.SOMETHING_WENT_WRONG,
        message: "Ooops! Something went horribly wrong!"
      };

      const xhr = new XMLHttpRequest();
      xhr.open(method, apiBaseUrl + url);
      xhr.withCredentials = true;
      
      xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
      xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
      
      if (store.getters.auth.isAuthenticated) {
        xhr.setRequestHeader("Authorization", `Bearer ${store.state.auth.token}`);
      }
      
      if (headers) {
        for (const headerKey of Object.keys(headers)) {
          xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
      }

      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if ([200, 201, 202].indexOf(this.status) !== -1) {
            try {
              resolve(JSON.parse(this.responseText));
            } catch (e) {
              console.error(e);

              reject(fallbackError);
            }
          } else if (this.status === 204) {
            resolve(undefined);
          } else {
            try {
              const errorData: any = JSON.parse(this.responseText);
              if (errorData && [ApiErrors.INVALID_TOKEN, ApiErrors.TOKEN_EXPIRED].indexOf(errorData.error) !== -1) {
                store.dispatch.auth.updateToken({ token: "", role: "" });
              }

              reject(errorData);
            } catch (e) {
              console.error(e);
  
              reject(fallbackError);
            }
          }
        }
      }
      
      try {
        xhr.send(data && JSON.stringify(data) || undefined);
      } catch (e) {
        console.error(e);

        reject(fallbackError);
      }      
    });
  }

  protected async authRequest(url: string, username: string, password: string): Promise<any> {
    return this.request("POST", url, undefined, {
      Authorization: "Basic " + btoa(username + ":" + password)
    });
  }

  // protected async post(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
  //   return this.httpClient.post(url, data, config);
  // }
  protected async post(url: string, data?: any): Promise<any> {
    return this.request("POST", url, data);
  }

  // protected async get(url: string, params?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
  //   return this.httpClient.get(url + (params && this.getQueryParams(params) || ""), config);
  // }
  protected async get(url: string, params?: any): Promise<any> {
    return this.request("GET", url + (params && this.getQueryParams(params) || ""));
  }

  private getQueryParams(params: any): string {
    return "?" + Object.keys(params).map(key => key + "=" + encodeURIComponent(params[key])).join("&");
  }
}