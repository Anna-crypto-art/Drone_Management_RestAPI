import store from '@/app/app-state';
import router from '@/app/app-routes';
import { AuthResult } from './api-schemas/auth-schemas';
import { HttpClientBase } from './http-client-base';

export class VolateqAPI extends HttpClientBase {

  public async login(email: string, password: string): Promise<void> {
    const authResult: AuthResult = await this.post('/auth/login', {}, {
      auth: {
        username: email,
        password: password
      }
    });

    await store.dispatch.auth.updateToken({ token: authResult.token });    
  }

  public async logout(): Promise<void> {
    await this.post('/auth/logout');

    await store.dispatch.auth.updateToken({ token: '' });
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;