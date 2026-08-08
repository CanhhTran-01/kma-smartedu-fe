
// ===== THANH ĐIỀU HƯỚNG 
// {/* Thanh điều hướng */ }
// <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
//     <Link to="/">Trang chủ</Link>
//     <Link to="/faculties">Khoa</Link>
//     <Link to="/majors">Ngành học</Link>
// </nav>

export default function Header() {
    return (
        <header style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)',
            color: '#ffffff',
            padding: '1.2rem 1.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo và tiêu đề */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {/* Logo icon */}
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                        flexShrink: 0
                    }}>
                        🛡️
                    </div>

                    {/* Text content */}
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            letterSpacing: '-0.3px',
                            lineHeight: '1.2'
                        }}>
                            Học viện Kỹ thuật Mật mã
                        </h1>
                        <p style={{
                            margin: '2px 0 0 0',
                            fontSize: '0.8rem',
                            color: '#93c5fd',
                            fontWeight: '400',
                            letterSpacing: '0.5px'
                        }}>
                            KMA - Học viện Kỹ thuật Mật mã
                        </p>
                    </div>
                </div>

                {/* Phần bên phải */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    {/* Navigation links */}
                    <nav style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center'
                    }}>
                        {['Trang chủ', 'Giới thiệu', 'Đào tạo', 'Tin tức'].map((item, index) => (
                            <a key={index} href="#" style={{
                                color: '#e2e8f0',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                padding: '0.5rem 0',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                borderBottom: index === 0 ? '2px solid #3b82f6' : '2px solid transparent'
                            }}>
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Badge cổng thông tin */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#e2e8f0',
                        whiteSpace: 'nowrap'
                    }}>
                        <span style={{ fontSize: '1rem' }}>📡</span>
                        Cổng thông tin
                    </div>

                    {/* User avatar / icon */}
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}>
                        👤
                    </div>
                </div>
            </div>

            {/* Sub header với breadcrumb */}
            <div style={{
                maxWidth: '1200px',
                margin: '0.8rem auto 0',
                padding: '0.5rem 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#94a3b8'
            }}>
                <span style={{ color: '#93c5fd' }}>🏠</span>
                <span>/</span>
                <span>Trang chủ</span>
            </div>
        </header>
    );
}