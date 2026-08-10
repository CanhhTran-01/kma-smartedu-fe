import request from "../../../../api/request";
import type { PageResponse } from "../../../../types";
import type { MajorRequest, MajorResponse } from "../types";

export const majorApi = {
    list: (params?: {
        page?: number, size?: number,
        searchName?: string,
        code?: string,
        active?: boolean,
        facultyId?: number,
        facultyName?: string,
    }) => request<PageResponse<MajorResponse>>(
        { url: '/majors', method: "GET", params }),

    create: (data: MajorRequest) => request<MajorResponse>(
        { url: '/majors', method: "POST", data }),

    update: (id: number, data: MajorRequest) => request<MajorResponse>(
        { url: `/majors/${id}`, method: "PUT", data }),

    remove: (id: number, code: string) => request<void>(
        { url: `/majors/${id}`, method: "DELETE", params: { code } }),
}