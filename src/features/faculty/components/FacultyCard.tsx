import type { FacultyResponse } from "../types";

interface Props {
    data: FacultyResponse;
    onEdit(faculty: FacultyResponse): void
    onDelete(id: number): void;
    isDeleting?: boolean;  // disable nút xóa khi đang thực hiện xóa
}

export default function FacultyCard({ data, onEdit, onDelete, isDeleting }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>{data.facultyCode}</div>
            <span>{data.facultyName}</span>

            <button onClick={() => onEdit(data)}>
                Sửa
            </button>

            <button onClick={() => onDelete(data.id)} disabled={isDeleting}>
                {isDeleting ? "Đang xóa..." : "Xóa"}
            </button>
            
        </div>
    );
}