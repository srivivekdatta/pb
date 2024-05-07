// api.js

import axios from 'axios';
import config from './config';

const environment = process.env.REACT_APP_ENV || 'development';
const apiBaseUrl = config[environment].apiBaseUrl;

const api = axios.create({
    baseURL: apiBaseUrl,
});

export default api;