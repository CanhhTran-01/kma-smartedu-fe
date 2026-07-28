// Format ngày tháng kiểu Việt Nam: DD/MM/YYYY
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

// Validate mã Sinh viên KMA (Ví dụ: AT180101, CT050202)
export const isValidKMACode = (code: string): boolean => {
  const kmaRegex = /^[A-Z]{2}\d{6}$/i;
  return kmaRegex.test(code);
};