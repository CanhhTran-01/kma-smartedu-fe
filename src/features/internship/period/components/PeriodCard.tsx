import type { InternshipPeriodResponse } from "../types";
import { InternshipTypeLabel, PeriodStatusLabel } from "../types";
import { formatDate } from "../../../../utils/formatter";

interface Props {
    data: InternshipPeriodResponse;
    onEdit(period: InternshipPeriodResponse): void;
    onDelete(id: number): void;
    isDeleting?: boolean;
}

export default function PeriodCard({ data, onEdit, onDelete, isDeleting }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>{data.name}</span>
            <span>({InternshipTypeLabel[data.internshipType]})</span>
            <span>{formatDate(data.startDate)} - {formatDate(data.endDate)}</span>
            {data.registrationDeadline && (
                <span>Hạn ĐK: {formatDate(data.registrationDeadline)}</span>
            )}
            <span>{PeriodStatusLabel[data.status]}</span>

            <button onClick={() => onEdit(data)}>
                Sửa
            </button>

            <button onClick={() => onDelete(data.id)} disabled={isDeleting}>
                {isDeleting ? "Đang xóa..." : "Xóa"}
            </button>
        </div>
    );
}
