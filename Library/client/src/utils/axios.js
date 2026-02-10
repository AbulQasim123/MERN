import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:2025/api',
    headers: { 'Content-Type': 'application/json' },
});