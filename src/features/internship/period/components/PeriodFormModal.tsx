import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { InternshipPeriodRequest, InternshipPeriodResponse, InternshipTypeEnum } from "../types";
import { InternshipType, InternshipTypeLabel } from "../types";
import { internshipPeriodApi } from "../services/internshipPeriodApi";
import { ApiError } from "../../../../api/apiError";

type PeriodForm = {
    internshipType: InternshipTypeEnum | "";
    name: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
};

interface Props {
    open: boolean;
    period?: InternshipPeriodResponse | null;
    onClose(): void;
    onSuccess(): void;
}

export default function PeriodFormModal({ open, period, onClose, onSuccess }: Props) {
    const [errors, setErrors] = useState<Partial<Record<keyof PeriodForm, string>>>({}); // state lưu field errors

    // default value cho form
    const initialForm: PeriodForm = {
        internshipType: "",
        name: "",
        startDate: "",
        endDate: "",
        registrationDeadline: "",
    };

    const [form, setForm] = useState<PeriodForm>(initialForm);
    const [isSaving, setIsSaving] = useState(false);

    // chạy khi period thay đổi
    useEffect(() => {
        if (!open) return; // tránh setState-reset form không cần thiết

        if (period) {
            setForm({
                internshipType: period.internshipType,
                name: period.name,
                startDate: period.startDate,
                endDate: period.endDate,
                registrationDeadline: period.registrationDeadline ?? "",
            });
        } else {
            setForm(initialForm);
        }

        setErrors({}); // xóa lỗi cũ mỗi khi mở lại modal

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period, open]);

    // handler chung cho toàn input khi thao tác lên form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: "" })); // xóa lỗi khi nhập lại
    };

    const handleSubmit = async () => {

        if (form.internshipType === "") {
            setErrors((prev) => ({ ...prev, internshipType: "Chưa chọn loại thực tập" }));
            return;
        }

        setIsSaving(true);
        try {
            const payload: InternshipPeriodRequest = {
                internshipType: form.internshipType,
                name: form.name,
                startDate: form.startDate,
                endDate: form.endDate,
                registrationDeadline: form.registrationDeadline === "" ? null : form.registrationDeadline,
            };

            if (period) {
                await internshipPeriodApi.update(period.id, payload);
                toast.success("Cập nhật thành công!");

            } else {
                await internshipPeriodApi.create(payload);
                toast.success("Thêm thành công!");
            }

            onSuccess(); // component cha load lại trang
            onClose(); // đóng modal

        } catch (error: any) {
            console.error(error); // interceptor đã toast

            // lấy fieldErrors từ ApiError do interceptor return Promise.reject(err) về
            if (error instanceof ApiError && error.fieldErrors) {
                const fieldErrors: Record<string, string> = {};

                error.fieldErrors.forEach((err) => {
                    fieldErrors[err.field] = err.message; // lưu message lỗi
                });

                setErrors(fieldErrors);
            }

        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null; // hiện-ẩn form

    return (
        <div className="modal">
            <h2>{period ? "CẬP NHẬT ĐỢT THỰC TẬP" : "TẠO ĐỢT THỰC TẬP MỚI"}</h2>

            <br />
            <select name="internshipType" value={form.internshipType} onChange={handleChange}>
                <option value="">-- Chọn loại thực tập --</option>
                {Object.values(InternshipType).map((type) => (
                    <option key={type} value={type}>{InternshipTypeLabel[type]}</option>
                ))}
            </select>
            {errors.internshipType && (<p className="text-red-500 text-sm">{errors.internshipType}</p>)}

            <br />
            <input name="name" placeholder="Tên đợt thực tập" value={form.name} onChange={handleChange} />
            {errors.name && (<p className="text-red-500 text-sm">{errors.name}</p>)}

            <br />
            <label>Ngày bắt đầu: </label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            {errors.startDate && (<p className="text-red-500 text-sm">{errors.startDate}</p>)}

            <br />
            <label>Ngày kết thúc: </label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            {errors.endDate && (<p className="text-red-500 text-sm">{errors.endDate}</p>)}

            <br />
            <label>Hạn đăng ký (không bắt buộc): </label>
            <input type="date" name="registrationDeadline" value={form.registrationDeadline} onChange={handleChange} />
            {errors.registrationDeadline && (<p className="text-red-500 text-sm">{errors.registrationDeadline}</p>)}

            <br />
            <button onClick={onClose}> Hủy </button>
            <button onClick={handleSubmit} disabled={isSaving}> {isSaving ? "Đang Lưu..." : "Lưu"} </button>
        </div>
    );
}
