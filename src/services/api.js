import axios from 'axios';

const api = axios.create({
    // URl BACKEND
    baseURL: 'https://api-cadastro-usuario.onrender.com'
});

export default api;