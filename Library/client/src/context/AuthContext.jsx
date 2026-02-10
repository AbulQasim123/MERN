import { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';
import axiosPrivate from '../utils/axiosPrivate';;

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const u = localStorage.getItem('user');
        return token && u ? JSON.parse(u) : null;
    });

    const persistUser = (userData, token = null) => {
        if (token) localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (payload) => {
        const { data } = await axios.post('/register', payload);
        persistUser(data.data.admin, data.data.token);
        return data;
    };

    const login = async (email, password) => {
        const { data } = await axios.post('/login', { email, password });
        persistUser(data.data.admin, data.data.token);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const fetchProfile = async () => {
        const { data } = await axiosPrivate.get('/profile');
        persistUser(data.data);
        return data.data;
    };

    const updateProfile = async (payload) => {
        const { data } = await axiosPrivate.put('/update-profile', payload);
        persistUser(data.data);
        return data.data;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout,
                fetchProfile,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
