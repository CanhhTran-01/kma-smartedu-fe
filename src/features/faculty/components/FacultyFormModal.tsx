import { useEffect, useState } from "react";
import type { FacultyRequest, FacultyResponse } from "../types";
import { facultyApi } from "../services/facultyApi";
import { toast } from "react-toastify";
import { ApiError } from "../../../api/apiError";

type FacultyForm = {
    facultyCode: string;
    facultyName: string;
    description: string;
};

interface Props {
    open: boolean;
    faculty?: FacultyResponse | null;
    onClose(): void;
    onSuccess(): void;
}

export default function FacultyFormModal({ open, faculty, onClose, onSuccess }: Props) {
    const [errors, setErrors] = useState<Partial<FacultyForm>>({}); // state lưu field errors

    // default value cho form
    const initialForm: FacultyForm = {
        facultyCode: "",
        facultyName: "",
        description: "",
    };

    const [form, setForm] = useState<FacultyForm>(initialForm);
    const [isSaving, setIsSaving] = useState(false);

    // chạy khi faculty thay đổi
    useEffect(() => {
        if (!open) return; // tránh setState-reset form không cần thiết

        if (faculty) {
            setForm({
                facultyCode: faculty.facultyCode,
                facultyName: faculty.facultyName,
                description: faculty.description ?? "", // null -> "" cho input controlled
            });
        } else {
            setForm(initialForm);
        }

        setErrors({}); // xóa lỗi cũ mỗi khi mở lại modal
        
    }, [faculty, open]);

    // handler chung cho toàn input khi thao tác lên form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors(prev => ({ ...prev, [name]: "" })); // xóa lỗi khi nhập lại
    };

    const handleSubmit = async () => {

        setIsSaving(true);
        try {
            const payload: FacultyRequest = { ...form }; // spread operator lấy data trong form

            if (faculty) {
                const data = await facultyApi.update(faculty.id, payload);
                console.log(data)
                toast.success("Cập nhật thành công!");

            } else {
                const data = await facultyApi.create(payload);
                console.log(data)
                toast.success("Thêm thành công!");
            }

            onSuccess(); // component cha load lại trang
            onClose(); // đóng modal

        } catch (error: any) {
            console.error(error); // interceptor đã toast
            
            // lấy fieldErrors từ ApiError do interceptor return Project.reject(err) về
            if (error instanceof ApiError && error.fieldErrors) {
                const fieldErrors: Record<string, string> = {};

                error.fieldErrors.forEach((err) => {
                    fieldErrors[err.field] = err.message;  // lưu message lỗi
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
            <h2>{faculty ? "CẬP NHẬT THÔNG TIN" : "TẠO KHOA MỚI"}</h2>

            <br></br>
            <input name="facultyCode" value={form.facultyCode} onChange={handleChange} />
            {errors.facultyCode && (<p className="text-red-500 text-sm">{errors.facultyCode}</p>)}

            <br></br>
            <input name="facultyName" value={form.facultyName} onChange={handleChange} />
            {errors.facultyName && (<p className="text-red-500 text-sm">{errors.facultyName}</p>)}

            <br></br>
            <textarea name="description" value={form.description} onChange={handleChange} />
            {errors.description && (<p className="text-red-500 text-sm">{errors.description}</p>)}

            <br></br>
            <button onClick={onClose}> Hủy </button>
            <button onClick={handleSubmit} disabled={isSaving}> {isSaving ? "Đang Lưu..." : "Lưu"} </button>
        </div>
    );
}