import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FacultyCard from "../components/FacultyCard";
import FacultyFormModal from "../components/FacultyFormModal";
import { facultyApi } from "../services/facultyApi";
import type { FacultyResponse } from "../types";
import type { PageResponse } from "../../../types";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";

const PAGE_SIZE = 7;

export default function FacultyPage() {
    const [page, setPage] = useState(0); // trang hiện tại
    const [facultyPage, setFacultyPage] = useState<PageResponse<FacultyResponse> | null>(null); // phân trang

    const [loading, setLoading] = useState(false); // loading
    const [deletingId, setDeletingId] = useState<number | null>(null); // xóa

    const [open, setOpen] = useState(false); // đóng-mở form
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyResponse | null>(null);

    const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<FacultyResponse | null>(null);

    // Load dữ liệu
    const loadData = async (pageNumber: number = page) => {
        setLoading(true);
        try {
            const data = await facultyApi.list({
                page: pageNumber,
                size: PAGE_SIZE
            });

            setFacultyPage(data);
            setPage(pageNumber);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // loading 1 lần
    useEffect(() => {
        loadData(0); // trang đầu -> page = 0
        // Bỏ qua cảnh báo của ESLint về dependency - chỉ muốn chạy 1 lần
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Thêm mới - mở modal
    const handleCreate = () => {
        setSelectedFaculty(null);
        setOpen(true);
    };

    // Sửa - mở modal
    const handleEdit = (faculty: FacultyResponse) => {
        setSelectedFaculty(faculty);
        setOpen(true);
    };

    // Đóng modal
    const handleClose = () => {
        setOpen(false);
        setSelectedFaculty(null);
    };

    // Xóa
    const handleDeleteClick = (id: number) => {
        const target = facultyPage?.content.find(f => f.id === id) ?? null;
        setConfirmDeleteTarget(target);
    };

    const handleConfirmDelete = async (code: string) => {

        if (!confirmDeleteTarget) return;
        const id = confirmDeleteTarget.id;

        setDeletingId(id);

        try {
            await facultyApi.remove(id, code);
            toast.success("Đã xóa!");
            setConfirmDeleteTarget(null);

            // Nếu xóa phần tử cuối của trang thì lùi về trang trước
            if (facultyPage && facultyPage.content.length === 1 && page > 0) {
                await loadData(page - 1);
            } else {
                await loadData(page);
            }

        } catch (error) {
            console.error(error); // interceper đã toast
            // giữ modal mở để người dùng thử lại, KHÔNG setConfirmDeleteTarget(null) ở đây
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && !facultyPage) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleCreate}>
                Thêm mới
            </button>

            {/* TODO: Bổ sung thanh filter sau... */}

            {/* list các faculties */}
            {(facultyPage?.content ?? []).map((faculty) => (
                <FacultyCard key={faculty.id}
                    data={faculty}
                    onEdit={handleEdit}
                    onDelete={() => handleDeleteClick(faculty.id)}
                    isDeleting={deletingId === faculty.id}
                />
            ))}

            {/* Modal chỉnh sửa/thêm mới */}
            <FacultyFormModal open={open}
                faculty={selectedFaculty}
                onClose={handleClose}
                onSuccess={() => loadData(page)}
            />

            {/* Modal nhập code xác nhận xóa */}
            <ConfirmDeleteModal
                open={confirmDeleteTarget !== null}
                itemLabel={confirmDeleteTarget?.facultyName ?? ""}
                expectedCode={confirmDeleteTarget?.facultyCode ?? ""}
                isDeleting={deletingId === confirmDeleteTarget?.id}
                onCancel={() => setConfirmDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />

            {/* nút phân trang */}
            <div style={{ marginTop: 20 }}>
                <button disabled={page === 0} onClick={() => loadData(page - 1)}>
                    Trước
                </button>

                <span style={{ margin: "0 12px" }}>
                    Trang {page + 1} / {facultyPage?.totalPages ?? 1}
                </span>

                <button disabled={facultyPage?.last ?? true} onClick={() => loadData(page + 1)}>
                    Sau
                </button>
            </div>
        </div>
    );
}