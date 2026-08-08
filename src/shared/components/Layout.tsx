import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

// sau này dùng sau nếu muốn
// hiện tại sẽ đặt hết trong App.tsx, chấp nhận trang nào cũng có header + footer 

export default function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            {/* === HEADER === */}
            <Header />

            {/* Nội dung các trang */}
            <main className="app-container" style={{ flex: 1 }}>
                <Outlet />
            </main>

            {/* === FOOTER === */}
            <Footer />
        </div>
    );
}