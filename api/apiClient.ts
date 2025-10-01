import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // for ios
  // baseURL: "http://10.0.2.2:3000", // for android
  timeout: 10000,
});


let accessToken: string | null = null;
let refreshToken: string | null = null;

// Set tokens 
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
};

// Clear tokens 
export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};

// Request interceptor - adds auth header
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor - handles token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      
      try {
        const response = await axios.post('http://localhost:3000/refresh', {
          refreshToken: refreshToken
        });
        
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        accessToken = newAccessToken;
        refreshToken = newRefreshToken;
        
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
