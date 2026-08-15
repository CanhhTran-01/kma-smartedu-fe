import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PeriodCard from "../components/PeriodCard";
import PeriodFormModal from "../components/PeriodFormModal";
import { internshipPeriodApi } from "../services/internshipPeriodApi";
import type { InternshipPeriodResponse } from "../types";
import type { PageResponse } from "../../../../types";
import ConfirmDeleteModal from "../../../../shared/components/ConfirmDeleteModal";

const PAGE_SIZE = 7;

export default function PeriodPage() {
    const [page, setPage] = useState(0); // trang hiện tại
    const [periodPage, setPeriodPage] = useState<PageResponse<InternshipPeriodResponse> | null>(null); // phân trang

    const [loading, setLoading] = useState(false); // loading
    const [deletingId, setDeletingId] = useState<number | null>(null); // xóa

    const [open, setOpen] = useState(false); // đóng-mở form
    const [selectedPeriod, setSelectedPeriod] = useState<InternshipPeriodResponse | null>(null);

    const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<InternshipPeriodResponse | null>(null);

    useEffect(() => {
        document.title = 'Quản lý thực tập | Đợt thực tập';
    }, []);

    // Load dữ liệu
    const loadData = async (pageNumber: number = page) => {
        setLoading(true);
        try {
            const data = await internshipPeriodApi.list({
                page: pageNumber,
                size: PAGE_SIZE
            });

            setPeriodPage(data);
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
        setSelectedPeriod(null);
        setOpen(true);
    };

    // Sửa - mở modal
    const handleEdit = (period: InternshipPeriodResponse) => {
        setSelectedPeriod(period);
        setOpen(true);
    };

    // Đóng modal
    const handleClose = () => {
        setOpen(false);
        setSelectedPeriod(null);
    };

    // Xóa
    const handleDeleteClick = (id: number) => {
        const target = periodPage?.content.find(p => p.id === id) ?? null;
        setConfirmDeleteTarget(target);
    };

    const handleConfirmDelete = async (name: string) => {

        if (!confirmDeleteTarget) return;
        const id = confirmDeleteTarget.id;

        setDeletingId(id);

        try {
            await internshipPeriodApi.remove(id, name);
            toast.success("Đã xóa!");
            setConfirmDeleteTarget(null);

            // Nếu xóa phần tử cuối của trang thì lùi về trang trước
            if (periodPage && periodPage.content.length === 1 && page > 0) {
                await loadData(page - 1);
            } else {
                await loadData(page);
            }

        } catch (error) {
            console.error(error); // interceptor đã toast
            // giữ modal mở để người dùng thử lại, KHÔNG setConfirmDeleteTarget(null) ở đây
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && !periodPage) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleCreate}>
                Thêm mới
            </button>

            {/* TODO: Bổ sung thanh filter theo loại thực tập / tên sau... */}

            {/* list các đợt thực tập */}
            {(periodPage?.content ?? []).map((period) => (
                <PeriodCard key={period.id}
                    data={period}
                    onEdit={handleEdit}
                    onDelete={() => handleDeleteClick(period.id)}
                    isDeleting={deletingId === period.id}
                />
            ))}

            {/* Modal chỉnh sửa/thêm mới */}
            <PeriodFormModal open={open}
                period={selectedPeriod}
                onClose={handleClose}
                onSuccess={() => loadData(page)}
            />

            {/* Modal nhập tên xác nhận xóa (BE dùng confirmedName cho period, không phải code) */}
            <ConfirmDeleteModal
                open={confirmDeleteTarget !== null}
                itemLabel={confirmDeleteTarget?.name ?? ""}
                expectedCode={confirmDeleteTarget?.name ?? ""}
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
                    Trang {page + 1} / {periodPage?.totalPages ?? 1}
                </span>

                <button disabled={periodPage?.last ?? true} onClick={() => loadData(page + 1)}>
                    Sau
                </button>
            </div>
        </div>
    );
}
