import { httpClient } from '@/app/shared/services/volateq-api/http-client';

const volateqApi = {
  login(email, password) {
    return httpClient.post('/auth/login', {}, {
      auth: {
        username: email,
        password: password
      }
    });
  },

};

export { volateqApi };