const API_URL = 'http://localhost:8080/api';
export const ENDPOINTS = {
    API_URL,
    auth: {
        login: `/auth/login`,
        register: `/auth/register`,
    },
    profile: {
        list: `/profile/list`,
        create: `/profile`
    }
}