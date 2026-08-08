import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MajorCard from "../components/MajorCard";
import MajorFormModal from "../components/MajorFormModal";
import { majorApi } from "../services/majorApi";
import type { MajorResponse } from "../types";
import type { PageResponse } from "../../../../types";
import ConfirmDeleteModal from "../../../../shared/components/ConfirmDeleteModal";

const PAGE_SIZE = 7;

export default function MajorPage() {
    const [page, setPage] = useState(0);
    const [majorPage, setMajorPage] = useState<PageResponse<MajorResponse> | null>(null);

    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [open, setOpen] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState<MajorResponse | null>(null);
    const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<MajorResponse | null>(null);

    useEffect(() => {
        document.title = 'Quản lý đào tạo | Ngành';
    }, []);

    const loadData = async (pageNumber: number = page) => {
        setLoading(true);
        try {
            const data = await majorApi.list({
                page: pageNumber,
                size: PAGE_SIZE,
            });
            setMajorPage(data);
            setPage(pageNumber);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(0);
    }, []);

    const handleCreate = () => {
        setSelectedMajor(null);
        setOpen(true);
    };

    const handleEdit = (major: MajorResponse) => {
        setSelectedMajor(major);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMajor(null);
    };

    const handleDeleteClick = (id: number) => {
        const target = majorPage?.content.find((m) => m.id === id) ?? null;
        setConfirmDeleteTarget(target);
    };

    const handleConfirmDelete = async (code: string) => {
        if (!confirmDeleteTarget) return;
        const id = confirmDeleteTarget.id;

        setDeletingId(id);
        try {
            await majorApi.remove(id, code);
            toast.success("Đã xóa!");
            setConfirmDeleteTarget(null);

            if (majorPage && majorPage.content.length === 1 && page > 0) {
                await loadData(page - 1);
            } else {
                await loadData(page);
            }
        } catch (error) {
            console.error(error); // interceptor đã toast (kể cả sai code)
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && !majorPage) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleCreate}>
                Thêm mới
            </button>

            {/* TODO: Bổ sung thanh filter sau... */}

            {/* list các các majors */}
            {(majorPage?.content ?? []).map((major) => (
                <MajorCard
                    key={major.id}
                    data={major}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    isDeleting={deletingId === major.id}
                />
            ))}

            {/* Modal chỉnh sửa/thêm mới */}
            <MajorFormModal
                open={open}
                major={selectedMajor}
                onClose={handleClose}
                onSuccess={() => loadData(page)}
            />

            {/* Modal nhập code xác nhận xóa */}
            <ConfirmDeleteModal
                open={confirmDeleteTarget !== null}
                itemLabel={confirmDeleteTarget?.majorName ?? ""}
                expectedCode={confirmDeleteTarget?.majorCode ?? ""}
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
                    Trang {page + 1} / {majorPage?.totalPages ?? 1}
                </span>

                <button disabled={majorPage?.last ?? true} onClick={() => loadData(page + 1)}>
                    Sau
                </button>
            </div>
        </div>
    );
}
