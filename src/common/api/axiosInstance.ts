// Axios 설정
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000', // 기본 API URL
    timeout: 10000, // 요청 제한 시간
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    // 예: 인증 토큰 추가
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

  // 응답 인터셉터
axiosInstance.interceptors.response.use((response) => response, (error) => {
    // 에러 처리 공통 로직
    console.error(error);
    return Promise.reject(error);
});

export default axiosInstance;