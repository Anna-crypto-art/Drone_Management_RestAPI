import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { baseUrl } from '@/environment/environment';
import store from '@/app/app-state';
import { ApiErrors } from './api-errors';

export class HttpClientBase {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = Axios.create({
      baseURL: baseUrl + 'api'
    });
    this.httpClient.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      if (store.getters.auth.isAuthenticated) {
        config.headers = { 'Authorization': `Bearer ${store.state.auth.token}`};
      }
      
      return config;
    });
    this.httpClient.interceptors.response.use((response: AxiosResponse) => {
        return response.data;
      }, (error: AxiosError) => {
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error === ApiErrors.INVALID_TOKEN || error.response.data.error === ApiErrors.TOKEN_EXPIRED) {
            store.dispatch.auth.updateToken({ token: '' });
          }

          return Promise.reject(error.response.data);
        }
    
        console.error('FATAL');
        console.error(error);
        
        return Promise.reject({
          error: 'FATAL',
          message: 'Ooops! Something went horribly wrong!'
        });
      }
    );
  }

  private getQueryParams(params: any): string {
    return '?' + Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
  }

  protected async post(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return this.httpClient.post(url, data, config);
  }

  protected async get(url: string, params?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return this.httpClient.get(url + (params && this.getQueryParams(params) || ''), config);
  }
}