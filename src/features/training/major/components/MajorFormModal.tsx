import { useEffect, useState } from "react";
import type { MajorRequest, MajorResponse } from "../types";
import type { FacultyResponse } from "../../faculty/types";
import { majorApi } from "../services/majorApi";
import { facultyApi } from "../../faculty/services/facultyApi";
import { toast } from "react-toastify";
import { ApiError } from "../../../../api/apiError";

type MajorForm = {
    facultyId: number | "";
    majorCode: string;
    majorName: string;
    description: string;
};

interface Props {
    open: boolean;
    major?: MajorResponse | null;
    onClose(): void;
    onSuccess(): void;
}

export default function MajorFormModal({ open, major, onClose, onSuccess }: Props) {
    const [errors, setErrors] = useState<Partial<Record<keyof MajorForm, string>>>({}); // state lưu field errors

    const initialForm: MajorForm = {
        facultyId: "",
        majorCode: "",
        majorName: "",
        description: "",
    };

    const [form, setForm] = useState<MajorForm>(initialForm);
    const [isSaving, setIsSaving] = useState(false);

    const [faculties, setFaculties] = useState<FacultyResponse[]>([]); // lưu list faculties
    const [loadingFaculties, setLoadingFaculties] = useState(false);

    const loadFaculties = async () => {
        setLoadingFaculties(true);
        try {
            const data = await facultyApi.list({ page: 0, size: 100, active: true });
            setFaculties(data.content);

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFaculties(false);
        }
    };

    useEffect(() => {
        if (!open) return; // chặn Call API không cần thiết
        loadFaculties();
    }, [open]);

    useEffect(() => {
        if (!open) return; // tránh setState-reset form không cần thiết

        if (major) {
            setForm({
                facultyId: major.facultyId,
                majorCode: major.majorCode,
                majorName: major.majorName,
                description: major.description ?? "",
            });

        } else {
            setForm(initialForm);
        }
        setErrors({}); // xóa lỗi cũ mỗi khi mở lại modal

    }, [major, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "facultyId" ? (value === "" ? "" : Number(value)) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async () => {

        if (form.facultyId === "") {
            setErrors((prev) => ({ ...prev, facultyId: "Chưa chọn khoa cho ngành học muốn thêm" }));
            return;
        }

        setIsSaving(true);
        try {
            const payload: MajorRequest = { ...form, facultyId: form.facultyId as number };

            if (major) {
                await majorApi.update(major.id, payload);
                toast.success("Cập nhật thành công!");

            } else {
                await majorApi.create(payload);
                toast.success("Thêm thành công!");
            }

            onSuccess();
            onClose();

        } catch (error: any) {
            console.error(error); // interceptor đã toast

            if (error instanceof ApiError && error.fieldErrors) {

                const fieldErrors: Record<string, string> = {};

                error.fieldErrors.forEach((err) => {
                    fieldErrors[err.field] = err.message;
                });

                setErrors(fieldErrors);
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null; // modal đóng

    return (
        <div className="modal">
            <h2>{major ? "CẬP NHẬT NGÀNH" : "TẠO NGÀNH MỚI"}</h2>

            <br />
            <select name="facultyId" value={form.facultyId} onChange={handleChange} disabled={loadingFaculties}>
                <option value="">-- Chọn khoa --</option>
                {faculties.map((f) => (
                    <option key={f.id} value={f.id}>{f.facultyName}</option>
                ))}
            </select>
            {errors.facultyId && <p className="text-red-500 text-sm">{errors.facultyId}</p>}

            <br />
            <input name="majorCode" value={form.majorCode} onChange={handleChange} />
            {errors.majorCode && <p className="text-red-500 text-sm">{errors.majorCode}</p>}

            <br />
            <input name="majorName" value={form.majorName} onChange={handleChange} />
            {errors.majorName && <p className="text-red-500 text-sm">{errors.majorName}</p>}

            <br />
            <textarea name="description" value={form.description} onChange={handleChange} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

            <br />
            <button onClick={onClose}>Hủy</button>

            <button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? "Đang Lưu..." : "Lưu"}
            </button>
        </div>
    );
}