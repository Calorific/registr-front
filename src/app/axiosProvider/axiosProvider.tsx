'use client';
import { ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { useSession } from '@/entities/Session';
import { getCookie } from 'cookies-next';
import { isWindowDefined } from 'swr/_internal';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          let token;
          if (isWindowDefined) {
            token = localStorage.getItem('authToken');
          } else {
            token = getCookie('authToken');
          }
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
  );
  const responseInterceptor = axiosInstance.interceptors.response.use(
      null,
      (error: AxiosError) => {
        if (error.response?.status == 401) {
          session.logout();
        } else
          return Promise.reject(error);
      },
  );
  return children;
};
export default axiosInstance;