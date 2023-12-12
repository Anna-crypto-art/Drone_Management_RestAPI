const { VUE_APP_BASE_URL, VUE_APP_API_BASE_URL, NODE_ENV = "" } = process.env;

const environment = NODE_ENV.toLowerCase();
const baseUrl = VUE_APP_BASE_URL;
const apiBaseUrl = VUE_APP_API_BASE_URL;

export { environment, baseUrl, apiBaseUrl };
