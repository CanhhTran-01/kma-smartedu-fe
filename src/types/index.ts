export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
    // ....
}

export interface ApiResponse<T = any> {
    success: boolean;
    code: number; 
    message: string;   
    data: T;          
}