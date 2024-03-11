import path from 'path'; // path 모듈을 임포트합니다.
import fs from 'fs'; // fs 모듈을 임포트합니다.

/**
 * JSON 파일에서 국가 데이터를 가져오는 함수
 * @returns {Array} JSON 파일에서 가져온 국가 데이터 배열
 */
export default function getContriesFromJson() {
    // 파일 경로를 설정합니다.
    const filePath = path.join(process.cwd(), 'public/data', 'countries.json');

    // 파일을 동기적으로 읽고 JSON 데이터를 파싱합니다.
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    // JSON 데이터에서 국가 배열을 추출합니다.
    const countries = JSON.parse(jsonData).countries;

    // 국가 데이터 배열을 반환합니다.
    return countries;
}