import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-newborn.herokuapp.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;