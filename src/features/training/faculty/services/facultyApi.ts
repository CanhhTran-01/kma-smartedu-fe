import type { FacultyRequest } from './../types/index';
import type { FacultyResponse } from "../types";
import type { PageResponse } from '../../../../types';
import request from '../../../../api/request';

export const facultyApi = {
    list: (params?: {
        page?: number, size?: number,
        searchName?: string,
        code?: string,
        active?: boolean,
    }) => request<PageResponse<FacultyResponse>>(
        { url: '/faculties', method: "GET", params }),

    create: (data: FacultyRequest) => request<FacultyResponse>(
        { url: '/faculties', method: "POST", data }),

    update: (id: number, data: FacultyRequest) => request<FacultyResponse>(
        { url: `/faculties/${id}`, method: "PUT", data }),

    remove: (id: number, confirmedCode: string) => request<void>(
        { url: `/faculties/${id}`, method: "DELETE", params: { confirmedCode } }),
}