import React, { createContext, useState, useEffect } from "react";
import { apiLogin, apiGetUserData, User } from '@/api/services';
import { setTokens, clearTokens } from '@/api/apiClient';
import { AppState } from 'react-native';


interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    accessToken: string | null;
    refreshToken: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined) 

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        let lastActive = Date.now();
        console.log(lastActive)
        const subscription = AppState.addEventListener("change", (nextState) => {
            if (nextState === "background") {
                lastActive = Date.now();
            } else if (nextState === "active") {
                const diff = Date.now() - lastActive;
                if (diff > 10 * 60 * 1000) { // > 10 min
                    logout();
                }
            }
        });
        return () => subscription.remove();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const response = await apiLogin(username, password);
        if (response) {
            setAccessToken(response.accessToken);
            setRefreshToken(response.refreshToken);
            
            // Set tokens in axios instance
            setTokens(response.accessToken, response.refreshToken);
            
            // Fetch user data after successful login
            const userData = await apiGetUserData();
            if (userData) {
                setUser(userData);
            } else {
                console.error("Can't get user data.")
            }
            
            return true;
        }
        return false;
    }

    
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        clearTokens();
    }


    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider> 
    );
}