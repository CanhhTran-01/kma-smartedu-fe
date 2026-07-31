import { useEffect, useState } from "react";
import type { FacultyRequest, FacultyResponse } from "../types";
import { facultyApi } from "../services/facultyApi";
import { toast } from "react-toastify";

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
        if (faculty) {
            setForm({
                facultyCode: faculty.facultyCode,
                facultyName: faculty.facultyName,
                description: faculty.description,
            });
        } else {
            setForm(initialForm);
        }
    }, [faculty]);

    // handler chung cho toàn input khi thao tác lên form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
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

        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null; // hiện-ẩn form

    return (
        <div className="modal">
            <h2>
                {faculty ? "CẬP NHẬT THÔNG TIN" : "TẠO KHOA MỚI"}
            </h2>
            <input name="facultyCode"
                value={form.facultyCode}
                onChange={handleChange}
            />
            <input name="facultyName"
                value={form.facultyName}
                onChange={handleChange}
            />
            <textarea name="description"
                value={form.description}
                onChange={handleChange}
            />
            <button onClick={onClose}>
                Hủy
            </button>
            <button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? "Đang Lưu..." : "Lưu"}
            </button>
        </div>
    );
}