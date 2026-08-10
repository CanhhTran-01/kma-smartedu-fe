import { useState } from "react";

interface Props {
  open: boolean;
  itemLabel: string;      // hiển thị cho client biết đang xóa cái gì
  expectedCode: string;   // mã nhập
  isDeleting?: boolean;
  onCancel(): void;
  onConfirm(code: string): void;
}

export default function ConfirmDeleteModal({ open, itemLabel, expectedCode, isDeleting, onCancel, onConfirm }: Props) {
  const [inputCode, setInputCode] = useState("");

  const handleConfirm = () => {
    onConfirm(inputCode.trim());
  };

  if (!open) return null;

  return (
    <div className="modal">
      <h3>Xác nhận xóa</h3>
      <p>Bạn sắp xóa <strong>{itemLabel}</strong>. Nhập mã <strong>"{expectedCode}"</strong> để xác nhận:</p>

      <input
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Nhập mã..."
        autoFocus
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={onCancel} disabled={isDeleting}>Hủy</button>
        <button onClick={handleConfirm} disabled={isDeleting || inputCode.trim() === ""}>
          {isDeleting ? "Đang xóa..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
}