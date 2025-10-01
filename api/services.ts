import apiClient from './apiClient';

export const apiUrl = "http://localhost:3000";

export interface User {
    phone: string;
    userId: number;
    username: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    accessTokenExp: number;
    refreshToken: string;
    refreshTokenExp: number;
}

export const apiLogin = async (username: string, password: string): Promise<LoginResponse | null> => {
    try {
        const loginRequest: LoginRequest = { username, password };
        const response = await apiClient.post('/login', loginRequest);
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        return null;
    };
};

export const apiGetUserData = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get('/account');
        console.log('GET /account response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};



export const apiUpdatePhoneNumber = async (phoneNumber: string): Promise<boolean> => {
    try {
        await apiClient.patch('/account', { phone: phoneNumber });
        return true;
    } catch (error: any) {
        console.error('Error details:', error.response?.status, error.response?.data);
        return false;
    }
};
