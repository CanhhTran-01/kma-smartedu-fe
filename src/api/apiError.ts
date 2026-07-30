import type { ApiResponse } from "../types";

export class ApiError extends Error {
  code?: number;
  fieldErrors?: { field: string; message: string }[];

  // gán thông tin lỗi BE trả về
  constructor(res: Partial<ApiResponse<unknown>>) {
    super(res.message || 'Có lỗi hệ thống xảy ra!');
    this.code = res.code;
    this.fieldErrors = res.errors;
  }

  // đây có phải lỗi validation ?
  get isValidationError(): boolean {
    return !!this.fieldErrors && this.fieldErrors.length > 0;
  }
}