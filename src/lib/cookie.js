import { setCookie, parseCookies } from 'nookies';

// 클라이언트 측에서 쿠키 설정하기
export function cookieSetter(name, value){
    // setCookie(null, 'username', 'John Doe', {
    setCookie(null, name, value, {
        maxAge: 30 * 24 * 60 * 60, // 쿠키 유효 기간 (초 단위)
        path: '/', // 쿠키가 적용되는 경로
    });
}

// 클라이언트 측에서 쿠키 가져오기
export function cookieGetter(){
    const cookies = parseCookies();
    const value = cookies.dh;
    // console.log(value)
    return value
}

/******************
 *  IP
 *****************/
export function getCookieIP(){
    const cookies = parseCookies();
    const value = cookies.userip;
    // console.log(value)
    return value
}
export function setCookieIP(value){
    // setCookie(null, 'username', 'John Doe', {
    setCookie(null, 'userip', value, {
        maxAge: 30 * 24 * 60 * 60, // 쿠키 유효 기간 (초 단위)
        path: '/', // 쿠키가 적용되는 경로
    });
}