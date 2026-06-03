import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    const storedToken = window.localStorage.getItem('token');
                    const storedUser = window.localStorage.getItem('user');
                    if (storedToken && storedUser) {
                        setToken(storedToken);
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (e) {
                console.error('Failed to load session:', e);
            } finally {
                setLoading(false);
            }
        };
        loadSession();
    }, []);

    const login = async (email, password, role) => {
        const endpoint = role === 'faculty' ? '/teacherLogin' : '/login';
        const response = await api.post(endpoint, { email, password });
        if (response.success) {
            const { token: userToken, user: loggedUser } = response.data;
            setToken(userToken);
            setUser(loggedUser);
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem('token', userToken);
                window.localStorage.setItem('user', JSON.stringify(loggedUser));
            }
            return { success: true, user: loggedUser };
        }
        return { success: false, error: response.error };
    };

    const signup = async (signupData, role) => {
        const endpoint = role === 'faculty' ? '/teachersignup' : '/signup';
        const payload = { 
            ...signupData, 
            role: role === 'faculty' ? 'teacher' : 'student' 
        };
        const response = await api.post(endpoint, payload);
        if (response.success) {
            return { success: true };
        }
        return { success: false, error: response.error };
    };

    const logout = async () => {
        const endpoint = user?.role === 'teacher' ? '/teacherLogout' : '/logout';
        await api.post(endpoint, {}, token);
        
        setToken(null);
        setUser(null);
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
