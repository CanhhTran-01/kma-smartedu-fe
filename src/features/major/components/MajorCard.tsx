import type { MajorResponse } from "../types";

interface Props {
    data: MajorResponse;
    onEdit(major: MajorResponse): void;
    onDelete(id: number): void;
    isDeleting?: boolean;
}

export default function MajorCard({ data, onEdit, onDelete, isDeleting }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>{data.majorCode}</div>
            <span>{data.majorName}</span>
            <span>({data.facultyName})</span>

            <button onClick={() => onEdit(data)}>
                Sửa
            </button>

            <button onClick={() => onDelete(data.id)} disabled={isDeleting}>
                {isDeleting ? "Đang xóa..." : "Xóa"}
            </button>
        </div>
    );
}