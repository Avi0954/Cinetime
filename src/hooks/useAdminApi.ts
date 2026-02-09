import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export const useAdminApi = () => {
    const navigate = useNavigate();

    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        const token = localStorage.getItem('adminToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('adminToken');
            navigate('/admin/login', {
                state: {
                    alert: {
                        type: 'error',
                        message: 'Session expired. Please log in again.'
                    }
                }
            });
            // Throw to stop execution flow in component
            throw new Error('Session expired');
        }

        return response;
    };

    return { fetchWithAuth };
};
