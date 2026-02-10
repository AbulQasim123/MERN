import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: 'http://localhost:2025/api',
});

axiosPrivate.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosPrivate.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.clear();
        }
        return Promise.reject(err);
    }
);

export default axiosPrivate;
