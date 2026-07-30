import type { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";
import type { ApiResponse } from "../types";

// wrapper cho axios
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await axiosClient<ApiResponse<T>>(config);
  return response.data.data; // bóc tách rồi trả về data trong ApiResponse
}

export default request;