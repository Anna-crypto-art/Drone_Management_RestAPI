const { APP_BASE_URL, API_BASE_URL, NODE_ENV = '' } = process.env;

const environment = NODE_ENV.toLowerCase();
const appBaseUrl = APP_BASE_URL;
const apiBaseUrl = API_BASE_URL;

export { environment, apiBaseUrl, appBaseUrl };
