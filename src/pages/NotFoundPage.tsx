
export default function NotFoundPage() {
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '4rem 1.5rem',
            textAlign: 'center',
            fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>
            
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>

            {/* 404 Number with animation */}
            <div style={{
                position: 'relative',
                marginBottom: '2rem'
            }}>
                <h1 style={{ 
                    fontSize: '10rem',
                    margin: 0,
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    letterSpacing: '-4px',
                    filter: 'drop-shadow(0 10px 30px rgba(239, 68, 68, 0.2))'
                }}>
                    404
                </h1>
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
                    borderRadius: '2px'
                }}></div>
            </div>

            {/* Title */}
            <h2 style={{ 
                color: '#1e293b',
                margin: '0 0 1rem 0',
                fontSize: '2rem',
                fontWeight: '700'
            }}>
                🔍 Trang không tồn tại
            </h2>

            {/* Description */}
            <p style={{ 
                color: '#64748b',
                margin: '0 0 2.5rem 0',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                maxWidth: '500px'
            }}>
                Đường dẫn bạn truy cập không đúng hoặc đã bị xóa. 
                Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
            </p>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <button style={{
                    padding: '0.875rem 2rem',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    🏠 Về trang chủ
                </button>
                
                <button style={{
                    padding: '0.875rem 2rem',
                    background: '#ffffff',
                    color: '#3b82f6',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    📞 Liên hệ hỗ trợ
                </button>
            </div>

            {/* Decorative elements */}
            <div style={{
                marginTop: '4rem',
                display: 'flex',
                gap: '2rem',
                color: '#cbd5e1',
                fontSize: '2.5rem',
                opacity: 0.3
            }}>
                <span>🔒</span>
                <span>💻</span>
                <span>📡</span>
            </div>
        </div>
    );
}