import { useEffect, useState } from "react";
import { facultyApi } from "../services/facultyApi";
import type { FacultyResponse } from "../types";
import { toast } from "react-toastify";
import FacultyCard from "../components/FacultyCard";
import FacultyFormModal from "../components/FacultyFormModal";

export default function FacultyPage() {
    const [faculties, setFaculties] = useState<FacultyResponse[]>([]); // data

    const [loading, setLoading] = useState(false); // loading
    const [deletingId, setDeletingId] = useState<number | null>(null); // xóa 

    const [open, setOpen] = useState(false); // form create-update
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyResponse | null>(null);

    // load dữ liệu toàn trang
    const loadData = async () => {
        setLoading(true);
        try {
            const data = await facultyApi.list();
            setFaculties(data.content);

        } finally {
            setLoading(false);
        }
    };

    // mở form tạo mới khoa
    const handleCreate = () => {
        setSelectedFaculty(null);
        setOpen(true);
    };

    // mở form update khoa
    const handleEdit = (faculty: FacultyResponse) => {
        setSelectedFaculty(faculty); // gửi faculty data sang
        setOpen(true);
    };

    // đóng form thì reset lại
    const handleClose = () => {
        setOpen(false);
        setSelectedFaculty(null);
    };

    // xóa khoa
    const handleDelete = async (id: number) => {
        // const confirmCode = window.prompt('Nhập mã khoa để xóa:');
        // if (confirmCode === null) return;

        setDeletingId(id);
        try {
            await facultyApi.remove(id, "CNTT");
            await loadData();
            toast.success("Đã xóa!")

        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) return <>Loading...</>
    return (
        <div>
            <button onClick={handleCreate}>
                Thêm mới
            </button>

            {faculties.map((faculty) => (
                <FacultyCard
                    key={faculty.id}
                    data={faculty}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isDeleting={deletingId === faculty.id}
                />
            ))}

            <FacultyFormModal
                open={open}
                faculty={selectedFaculty}
                onClose={handleClose}
                onSuccess={loadData}
            />
        </div>
    );
}