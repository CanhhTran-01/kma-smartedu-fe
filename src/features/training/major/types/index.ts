export interface MajorRequest {
  facultyId: number;
  majorCode: string;
  majorName: string;
  description?: string;
}

export interface MajorResponse {
  id: number;
  majorCode: string;
  majorName: string;
  description: string | null;
  active: boolean;
  createdAt: string;

  facultyId: number;
  facultyName: string;
}