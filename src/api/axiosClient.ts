import axios from 'axios';
import { toast } from 'react-toastify';
import type { ApiResponse } from "../types";
import { ApiError } from './apiError';

// tạo một axios instance dùng chung trong toàn bộ app
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
=============== 1. REQUEST INTERCEPTOR (Tạm thời DISABLE khi chưa làm Auth) ==================
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

// bộ lọc: mọi response do BE gửi về đều phải qua đây trước khi trả về nơi gọi API, xử lý lỗi tập trung ở đây
axiosClient.interceptors.response.use(
  // HTTP thành công
  (response) => {
    const resData = response.data as ApiResponse<unknown>;

    // lỗi nghiệp vụ
    if (!resData.success) { // vd: HTTP 200 nhưng success = false -> lỗi nghiệp vụ, cần xử lý
      const err = new ApiError(resData);

      if (!err.isValidationError) toast.error(err.message);
      return Promise.reject(err); // luôn reject -> biến response thành lỗi dù HTTP status = 200
    }

    return response; // trả AxiosResponse, request<T> sẽ bóc ra ApiResponse để trả data trong đó về
  },

  // HTTP lỗi
  (error) => {
    const body = error.response?.data as Partial<ApiResponse<unknown>> | undefined;
    const err = new ApiError(body ?? { message: 'Không thể kết nối máy chủ!' });

    if (!err.isValidationError) toast.error(err.message); // hiện toast ngoại trừ validation error
    return Promise.reject(err);
  }
);

export default axiosClient;