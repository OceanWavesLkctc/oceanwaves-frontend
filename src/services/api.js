import { Platform, NativeModules } from 'react-native';

const getDevServerHost = () => {
    try {
        const scriptURL = NativeModules?.SourceCode?.scriptURL;
        if (scriptURL) {
            const address = scriptURL.split('://')[1]?.split('/')[0];
            const hostname = address?.split(':')[0];
            if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
                return hostname;
            }
        }
    } catch (e) {
        // Fallback below
    }
    return '172.24.165.198'; // Current mobile hotspot IP
};

const LOCAL_IP = getDevServerHost();
const BACKEND_PORT = '3000';

export const API_BASE_URL = `http://${LOCAL_IP}:${BACKEND_PORT}/lkctc/oceanwaves`;

console.log('API Base URL is set to:', API_BASE_URL);

async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
        'Accept': 'application/json',
        ...options.headers,
    };

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
