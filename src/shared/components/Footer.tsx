
export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
            color: '#d1d5db',
            marginTop: 'auto',
            position: 'relative'
        }}>
            {/* Top wave decoration */}
            <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                opacity: 0.8
            }}></div>

            {/* Main footer content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '3rem 1.5rem 1.5rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '2.5rem'
                }}>
                    {/* Cột 1: Thông tin học viện */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}>
                                🛡️
                            </div>
                            <h3 style={{
                                color: '#ffffff',
                                margin: 0,
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                letterSpacing: '-0.3px'
                            }}>
                                Học viện Kỹ thuật Mật mã
                            </h3>
                        </div>
                        <p style={{
                            margin: '0 0 1rem 0',
                            fontSize: '0.9rem',
                            color: '#9ca3af',
                            lineHeight: '1.6'
                        }}>
                            Cơ sở trọng điểm đào tạo nguồn nhân lực An toàn thông tin quốc gia,
                            trực thuộc Ban Cơ yếu Chính phủ.
                        </p>
                        {/* Social icons */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem'
                        }}>
                            {['📘', '🐦', '📺', '💼'].map((icon, index) => (
                                <div key={index} style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div>
                        <h4 style={{
                            color: '#ffffff',
                            margin: '0 0 1.2rem 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            position: 'relative',
                            paddingBottom: '0.75rem'
                        }}>
                            Liên kết nhanh
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '40px',
                                height: '3px',
                                background: '#3b82f6',
                                borderRadius: '2px'
                            }}></div>
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            {[
                                'Giới thiệu về KMA',
                                'Chương trình đào tạo',
                                'Nghiên cứu khoa học',
                                'Tuyển sinh',
                                'Tin tức & Sự kiện'
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href="#" style={{
                                        color: '#9ca3af',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ color: '#3b82f6', fontSize: '0.7rem' }}>→</span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3: Thông tin liên hệ */}
                    <div>
                        <h4 style={{
                            color: '#ffffff',
                            margin: '0 0 1.2rem 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            position: 'relative',
                            paddingBottom: '0.75rem'
                        }}>
                            Liên hệ
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '40px',
                                height: '3px',
                                background: '#3b82f6',
                                borderRadius: '2px'
                            }}></div>
                        </h4>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            {[
                                { icon: '📍', text: '141 Đường Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội' },
                                { icon: '📞', text: '0986 622 772' },
                                { icon: '📧', text: 'contact@actvn.edu.vn' },
                                { icon: '🌐', text: 'www.actvn.edu.vn' }
                            ].map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    fontSize: '0.9rem',
                                    color: '#9ca3af',
                                    lineHeight: '1.5'
                                }}>
                                    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cột 4: Bản tin */}
                    <div>
                        <h4 style={{
                            color: '#ffffff',
                            margin: '0 0 1.2rem 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            position: 'relative',
                            paddingBottom: '0.75rem'
                        }}>
                            Đăng ký nhận tin
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '40px',
                                height: '3px',
                                background: '#3b82f6',
                                borderRadius: '2px'
                            }}></div>
                        </h4>
                        <p style={{
                            margin: '0 0 1rem 0',
                            fontSize: '0.9rem',
                            color: '#9ca3af',
                            lineHeight: '1.5'
                        }}>
                            Nhận thông tin mới nhất về đào tạo và tuyển sinh từ KMA.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: '#ffffff',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                            />
                            <button style={{
                                padding: '0.75rem 1.25rem',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap'
                            }}>
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        color: '#6b7280'
                    }}>
                        © 2026 Học viện Kỹ thuật Mật mã. All rights reserved.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        fontSize: '0.85rem',
                        color: '#6b7280'
                    }}>
                        <span style={{ cursor: 'pointer' }}>Chính sách bảo mật</span>
                        <span style={{ cursor: 'pointer' }}>Điều khoản sử dụng</span>
                        <span style={{ cursor: 'pointer' }}>Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}