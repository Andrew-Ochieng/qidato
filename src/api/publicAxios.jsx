import axios from 'axios';

const publicAxios = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Automatically add CSRF token to all requests if present
publicAxios.interceptors.request.use(config => {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

export default publicAxios;
