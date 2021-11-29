import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.233.197.177/api'
});

export default api;