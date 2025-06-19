import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true; // Ensure cookies are sent

// Add request interceptor to set Cookie header and debug
axios.interceptors.request.use(
  (config) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    // Set Cookie header with XSRF-TOKEN
    if (xsrfToken) {
      config.headers['X-CSRF-TOKEN'] = `${encodeURIComponent(xsrfToken)}`;
    } else {
      console.warn('XSRF-TOKEN cookie not found');
    }

    console.log('Axios Request:', {
      url: config.url,
      headers: config.headers,
      params: config.params,
      withCredentials: config.withCredentials,
    });

    return config;
  },
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Fetch CSRF token for Sanctum
export const initializeAxios = async (): Promise<void> => {
  try {
    const response = await axios.get('/sanctum/csrf-cookie');
    console.log('CSRF Token Fetched:', {
      status: response.status,
      cookies: {
        xsrf_token: Cookies.get('XSRF-TOKEN'),
        laravel_session: Cookies.get('laravel_session'),
      },
    });
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Export Axios instance
export { axios };