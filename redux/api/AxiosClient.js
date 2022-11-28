/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://chat-app-server-production-370f.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${AsyncStorage.getItem('token')}`,
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    //  config.headers.Authorization = token;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
