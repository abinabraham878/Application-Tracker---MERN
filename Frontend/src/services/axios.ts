import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

// Request interceptor to dynamically set the Authorization header
instance.interceptors.request.use(
    config => {
        // Get the current token from localStorage before each request
        const token = localStorage.getItem('token');
        
        // Only set the header if a token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration or unauthorized responses
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Handle 401 Unauthorized responses
        if (error.response && error.response.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default instance;