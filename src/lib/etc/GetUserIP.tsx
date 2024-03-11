import { headers } from 'next/headers'; // Next.js의 헤더 모듈을 가져옵니다.

/**
 * 사용자의 IP 주소를 가져오는 함수
 * @returns {string} 사용자의 IP 주소
 */
export default function GetUserIP():string {
    const FALLBACK_IP_ADDRESS = '175.201.251.235'; // 기본적인 IP 주소를 설정합니다.

    // X-Forwarded-For 헤더에서 IP 주소를 가져옵니다.
    const forwardedFor = headers().get('x-forwarded-for');

    // X-Real-IP 헤더에서 IP 주소를 가져옵니다.
    const realIp = headers().get('x-real-ip');

    // 가져온 IP 주소를 반환합니다. 만약 가져온 IP 주소가 없다면 기본 IP 주소를 반환합니다.
    return realIp ?? FALLBACK_IP_ADDRESS;
}
