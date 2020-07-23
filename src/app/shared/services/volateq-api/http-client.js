import axios from 'axios';

import store from '@/app/app-state';

import { baseUrl } from '@/environment/environment';

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 * */
const config = {
  baseURL: baseUrl + 'api'
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 **/
const httpClient = axios.create(config);

/**
 * Auth interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * Currenlty it is just doing nothing but idea to to show the capability of axios and its interceptors
 * In future, interceptors can be created into separate files and consumed into multiple http clients
 * @param {*} config
 */
const authInterceptor = config => {
  if (store.state.auth.token) {
    config.headers = { 'Authorization': `Bearer ${store.state.auth.token}`};
  }
  
  return config;
};

const loggerInterceptor = config => {
  /** Add logging here */
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => {
    const time = response.headers['x-volateq-auth-time'];
    const token = response.headers['x-volateq-auth-token'];

    store.dispatch('auth/updateToken', { token, time });
    
    return response.data;
  },
  error => {
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

export { httpClient };
