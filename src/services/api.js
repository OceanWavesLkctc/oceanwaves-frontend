import { Platform } from 'react-native';

// UPDATE THIS WITH YOUR LOCAL MACHINE'S IP ADDRESS IF TESTING ON A PHYSICAL DEVICE
const LOCAL_IP = '192.168.31.234'; // Actual Wi-Fi IP of the host machine
const BACKEND_PORT = '3000';

export const API_BASE_URL = Platform.select({
    android: `http://${LOCAL_IP}:${BACKEND_PORT}/lkctc/oceanwaves`,
    ios: `http://localhost:${BACKEND_PORT}/lkctc/oceanwaves`,
    default: `http://localhost:${BACKEND_PORT}/lkctc/oceanwaves`,
});

console.log('API Base URL is set to:', API_BASE_URL);

/**
 * Perform a generic fetch request
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Default headers
    const headers = {
        'Accept': 'application/json',
        ...options.headers,
    };

    // Auto-inject JSON Content-Type if body is not FormData
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(options.body);
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                error: data.message || `Request failed with status ${response.status}`,
                status: response.status
            };
        }

        return { success: true, data };
    } catch (err) {
        console.error(`API Error on ${url}:`, err);
        return { success: false, error: 'Network error. Please check backend connection.' };
    }
}

export const api = {
    get: (endpoint, token) => {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return request(endpoint, { method: 'GET', headers });
    },

    post: (endpoint, body, token, isMultipart = false) => {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let reqBody = body;
        if (isMultipart) {
            // Fetch will set correct boundary header automatically when body is FormData
            reqBody = body;
        }

        return request(endpoint, { method: 'POST', body: reqBody, headers });
    },

    put: (endpoint, body, token, isMultipart = false) => {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return request(endpoint, { method: 'PUT', body, headers });
    },

    delete: (endpoint, token) => {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return request(endpoint, { method: 'DELETE', headers });
    }
};
