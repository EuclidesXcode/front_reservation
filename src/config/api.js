const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'content-type': 'multpart-formdata'
    }
});

export default api;