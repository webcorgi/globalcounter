import { atom } from "recoil";

// isoState의 타입을 string으로 명시적으로 지정합니다.
export const isoState = atom<string | undefined>({
  key: "isoState", // 고유한 키를 제공합니다.
  default: 'KR', // 기본값을 제공합니다.
});
