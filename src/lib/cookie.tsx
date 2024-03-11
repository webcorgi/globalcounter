'use server'
import {cookies} from 'next/headers'
import GetUserIP from "@/lib/etc/GetUserIP";
import getUserCityFromGeolite from "@/lib/etc/getUserCityFromGeolite";


// nextjs14쿠키. 아래는 참고자료.
// https://nextjs.org/blog/next-14
// https://nextjs.org/docs/app/api-reference/functions/cookies
function setCookie(name:string, isocode:string):void {
    cookies().set(name, isocode)
}
function getCookie(name:string) {
    return cookies().get(name)
}

export async function ISOCodeCookies():Promise<string | undefined> {
    let iso = await getCookie('isocode')
    if( !iso ) {
        const {isoCode} = await getUserCityFromGeolite(GetUserIP())
        await setCookie('isocode', isoCode)
    }
    iso = iso ?? await getCookie('isocode')
    return iso?.value;
}