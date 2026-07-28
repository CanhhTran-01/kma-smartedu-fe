import axios from 'axios';
import { toast } from 'react-toastify';
// import { STORAGE_KEYS } from '../constants';
import type { ApiResponse } from '../types';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// =========================================================================
// 1. REQUEST INTERCEPTOR (Tạm thời DISABLE khi chưa làm Auth)
// =========================================================================
/* [TODO: BẬT LẠI KHI LÀM AUTHENTICATION]
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/

// =========================================================================
// 2. RESPONSE INTERCEPTOR (Bóc tách dữ liệu & Báo lỗi tập trung)
// =========================================================================
axiosClient.interceptors.response.use(
  (response) => {
    const resData = response.data as ApiResponse;

    // Trường hợp BE trả HTTP 200 nhưng logic thất bại (success = false)
    if (!resData.success) {
      // Hiển thị thông báo lỗi từ BE bằng Toast
      toast.error(resData.message || 'Thao tác không thành công!');
      return Promise.reject(resData);
    }

    // Trả thẳng dữ liệu Java ApiResponse do BE trả về (success, code, message, data)
    return resData as any;
  },
  (error) => {
    // Lấy message lỗi từ BE nếu có, không có thì xài message mặc định
    const errorMessage = error.response?.data?.message || 'Có lỗi hệ thống xảy ra!';
    toast.error(errorMessage);

    /* [TODO: BẬT LẠI KHI LÀM AUTHENTICATION]
    // Xử lý khi bị lỗi 401 (Chưa đăng nhập / Hết hạn token)
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      window.location.href = '/login';
    }
    */

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;