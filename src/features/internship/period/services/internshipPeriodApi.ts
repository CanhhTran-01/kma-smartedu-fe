import request from "../../../../api/request";
import type { PageResponse } from "../../../../types";
import type {
    InternshipPeriodRequest,
    InternshipPeriodResponse,
    InternshipTypeEnum,
} from "../types";

export const internshipPeriodApi = {
    list: (params?: {
        page?: number, size?: number,
        searchName?: string,
        internshipType?: InternshipTypeEnum,
    }) => request<PageResponse<InternshipPeriodResponse>>(
        { url: '/internship-periods', method: "GET", params }),

    getById: (id: number) => request<InternshipPeriodResponse>(
        { url: `/internship-periods/${id}`, method: "GET" }),

    create: (data: InternshipPeriodRequest) => request<InternshipPeriodResponse>(
        { url: '/internship-periods', method: "POST", data }),

    update: (id: number, data: InternshipPeriodRequest) => request<InternshipPeriodResponse>(
        { url: `/internship-periods/${id}`, method: "PUT", data }),

    // lưu ý: BE dùng param "confirmedName" (xác nhận bằng TÊN đợt thực tập, khác Faculty/Major dùng code)
    remove: (id: number, confirmedName: string) => request<void>(
        { url: `/internship-periods/${id}`, method: "DELETE", params: { confirmedName } }),
}
