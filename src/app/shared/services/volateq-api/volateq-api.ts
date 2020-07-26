import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { baseUrl } from '@/environment/environment';
import store from '@/app/app-state';

export class VolateqAPI {
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
        const time = response.headers['x-volateq-auth-time'];
        const token = response.headers['x-volateq-auth-token'];
    
        store.dispatch.auth.updateToken({ token, time });
        
        return response.data;
      }, (error: AxiosError) => {
        if (error.response && error.response.data && error.response.data.error) {
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

  public async login(email: string, password: string): Promise<void> {
    await this.httpClient.post('/auth/login', {}, {
      auth: {
        username: email,
        password: password
      }
    });
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;