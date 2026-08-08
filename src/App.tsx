import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import FacultyPage from './features/faculty/pages/FacultyPage';
import MajorPage from './features/major/pages/MajorPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';

function App() {
    return (
        <BrowserRouter>
            <Header /> {/* === HEADER === */}

            {/* Thanh điều hướng */}
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <Link to="/">Trang chủ</Link>
                <Link to="/faculties">Khoa</Link>
                <Link to="/majors">Ngành học</Link>
            </nav>

            {/* Nội dung các trang */}
            <main className="app-container">
                <Routes>
                    {/* Route công khai (không cần login) */}
                    <Route path="/" element={<HomePage />} />

                    {/* Các Route YÊU CẦU ĐĂNG NHẬP sau này sẽ bọc trong ProtectedRoute */}
                    <Route path="/faculties" element={<FacultyPage />} />
                    <Route path="/majors" element={<MajorPage />} />

                    {/* Trang 404 cho các đường dẫn không tồn tại */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer /> {/* === FOOTER === */}
        </BrowserRouter>
    );
}

export default App

// ========= Dùng layout component cho phép 1 số trang không có header + footer ====
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//
//         {/* Route công khai (không cần login) */}
//         <Route path="/" element={<HomePage />} />
//
//         <Route element={<Layout />}>
//           {/* Các Route YÊU CẦU ĐĂNG NHẬP sau này sẽ bọc trong ProtectedRoute */}
//           <Route path="/faculties" element={<FacultyPage />} />
//           <Route path="/majors" element={<MajorPage />} />
//         </Route>
//
//         {/* Trang 404 cho các đường dẫn không tồn tại */}
//         <Route path="*" element={<NotFoundPage />} />
//
//       </Routes>
//     </BrowserRouter>
//   );
// }