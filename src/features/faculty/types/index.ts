export interface FacultyRequest {
  facultyCode: string;
  facultyName: string;
  description?: string; // tùy chọn
}

export interface FacultyResponse {
  id: number;
  facultyCode: string;
  facultyName: string;
  description: string;
  active: boolean;
  createdAt: string; // ngày giờ cho BE quy định, FE dùng string để lưu, ví dụ: "2026-07-31T14:30:00"
}