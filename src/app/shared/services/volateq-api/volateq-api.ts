import { httpClient } from '@/app/shared/services/volateq-api/http-client';

export class VolateqAPI {
  public async login(email: string, password: string): Promise<void> {
    await httpClient.post('/auth/login', {}, {
      auth: {
        username: email,
        password: password
      }
    });
  }
}

const volateqApi = new VolateqAPI();

export { volateqApi };