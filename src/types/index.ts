// contract về data giao tiếp giữa FE và BE

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  code?: number;
  message: string;
  data: T;
  errors?: { field: string; message: string }[];
  path?: string;
  timestamp?: string;
}