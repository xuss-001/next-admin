import axios from 'axios';
import { message } from 'antd';

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
                if (typeof window !== 'undefined') {
                  const pathname = window.location.pathname;
                  const segments = pathname.split('/').filter(Boolean);
                  const locale = segments[0] && ['en', 'zh'].includes(segments[0]) ? segments[0] : 'zh';
                  window.location.href = `/${locale}/user/login`;
                }
                break;
            case 500:
              message.error(error.response.data?.msg || '服务器内部错误');
              break;
        }
    }
    return Promise.reject(error);
  });

  export default instance
