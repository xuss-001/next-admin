import axios from 'axios';
import { message } from 'antd';

export class AuthError extends Error {
  constructor(message = '未授权，请重新登录') {
    super(message);
    this.name = 'AuthError';
  }
}

export const isAuthError = (error: unknown): error is AuthError => {
  return error instanceof AuthError;
};

export const getLoginPath = (): string => {
  if (typeof window === 'undefined') return '/zh/user/login';
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] && ['en', 'zh'].includes(segments[0]) ? segments[0] : 'zh';
  return `/${locale}/user/login`;
};

const instance = axios.create({
    baseURL: process.env.BASE_API_URL,
    timeout: 10000
});

instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    if(response.data?.msg) {
      message.success(response.data.msg)
    }
    return response.data;
  }, function (error) {
    if(error && error.response) {
        switch(error.response.status) {
            case 401:
                return Promise.reject(new AuthError());
            case 500:
              message.error(error.response.data?.msg || '服务器内部错误');
              break;
            default:
              message.error(error.response.data?.msg || `请求失败 (${error.response.status})`);
        }
    } else if (error && error.request) {
        message.error('网络错误，请检查网络连接');
    } else {
        message.error(error?.message || '请求失败');
    }
    return Promise.reject(error);
  });

  export default instance
