import { Reader } from '@maxmind/geoip2-node'; // MaxMind GeoIP2 라이브러리의 Reader 모듈을 가져옵니다.

/**
 * GeoLite2 데이터베이스에서 방문자의 도시 정보를 가져오는 비동기 함수
 * @param {string} ip - 방문자의 IP 주소
 * @returns {Object} 방문자의 국가 ISO 코드와 국가 이름을 포함한 객체
 */
export default async function getUserCityFromGeolite(ip) {
    // GeoLite2 데이터베이스 파일을 엽니다.
    const reader = await Reader.open('./public/data/GeoLite2-City.mmdb');

    // GeoLite2 데이터베이스에서 방문자의 도시 정보를 가져옵니다.
    const response = reader.city(ip);

    // 국가 ISO 코드를 추출합니다.
    const isoCode = response.country.isoCode;

    // 국가 이름을 추출합니다.
    const countryName = response.country.names.en;

    // 방문자의 국가 ISO 코드와 국가 이름을 포함한 객체를 반환합니다.
    return { isoCode, countryName };
}