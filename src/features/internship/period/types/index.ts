// contract khớp với InternshipPeriodRequest / InternshipPeriodResponse (BE)

export const InternshipType = {
  BASIC: "BASIC", // Thực tập cơ sở
  GRADUATION: "GRADUATION", // Thực tập tốt nghiệp
} as const;

export type InternshipTypeEnum = (typeof InternshipType)[keyof typeof InternshipType];

export const InternshipTypeLabel: Record<InternshipTypeEnum, string> = {
  BASIC: "Thực tập cơ sở",
  GRADUATION: "Thực tập tốt nghiệp",
};

export const PeriodStatus = {
  REGISTRATION_OPEN: "REGISTRATION_OPEN", // đang mở đăng ký
  REGISTRATION_CLOSED: "REGISTRATION_CLOSED", // đã đóng đăng ký, chưa tới ngày bắt đầu
  IN_PROGRESS: "IN_PROGRESS", // đang trong thời gian thực tập
  ENDED: "ENDED", // đã kết thúc
} as const;

export type PeriodStatusEnum = (typeof PeriodStatus)[keyof typeof PeriodStatus];

export const PeriodStatusLabel: Record<PeriodStatusEnum, string> = {
  REGISTRATION_OPEN: "Đang mở đăng ký",
  REGISTRATION_CLOSED: "Đã đóng đăng ký",
  IN_PROGRESS: "Đang thực tập",
  ENDED: "Đã kết thúc",
};

export interface InternshipPeriodRequest {
  internshipType: InternshipTypeEnum;
  name: string;
  startDate: string; // "YYYY-MM-DD" (LocalDate)
  endDate: string;
  registrationDeadline?: string | null;
}

export interface InternshipPeriodResponse {
  id: number;
  internshipType: InternshipTypeEnum;
  name: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string | null;
  status: PeriodStatusEnum;
  createdAt: string;
}
