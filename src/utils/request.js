import axios from 'axios';
import storageService from '@/service/storageService';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  time: process.env.VUE_APP_BASE_URL,
});

// Add a request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` });
  return config;
}, (error) =>
  // Do something with request error
  Promise.reject(error));

export default service;
