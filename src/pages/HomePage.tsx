import { useEffect } from "react";

export default function HomePage() {

    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem 2rem',
            fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
        }}>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)',
                borderRadius: '16px',
                padding: '3rem 2.5rem',
                marginBottom: '3rem',
                boxShadow: '0 10px 40px rgba(3, 105, 161, 0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
                <h2 style={{
                    margin: '0 0 1rem 0',
                    color: '#ffffff',
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    letterSpacing: '-0.5px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    🎓 Chào mừng đến với KMA
                </h2>
                <p style={{
                    margin: 0,
                    color: '#e0f2fe',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Cơ sở trọng điểm đào tạo nguồn nhân lực An toàn thông tin quốc gia
                </p>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {[
                    {
                        icon: '🔒',
                        title: 'An toàn thông tin',
                        description: 'Đào tạo chuyên sâu về mã hóa, bảo mật hệ thống và an ninh mạng.',
                        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    },
                    {
                        icon: '💻',
                        title: 'Công nghệ thông tin',
                        description: 'Phát triển phần mềm, trí tuệ nhân tạo và hệ thống thông tin.',
                        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    },
                    {
                        icon: '📡',
                        title: 'Điện tử - Viễn thông',
                        description: 'Nghiên cứu về hệ thống nhúng, viễn thông và xử lý tín hiệu.',
                        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    }
                ].map((card, index) => (
                    <div key={index} style={{
                        borderRadius: '16px',
                        padding: '2rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '14px',
                            background: card.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}>
                            {card.icon}
                        </div>
                        <h3 style={{
                            margin: '0 0 0.75rem 0',
                            color: '#1e293b',
                            fontSize: '1.4rem',
                            fontWeight: '600'
                        }}>
                            {card.title}
                        </h3>
                        <p style={{
                            margin: 0,
                            fontSize: '0.95rem',
                            color: '#64748b',
                            lineHeight: '1.7'
                        }}>
                            {card.description}
                        </p>
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '8px',
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            color: '#3b82f6',
                            fontWeight: '500'
                        }}>
                            Tìm hiểu thêm →
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}