'use server'
import GetUserIP from "@/lib/GetUserIP";
import { getCookie, setCookie } from "@/lib/cookie";
import getUserCityFromGeolite from "@/lib/getUserCityFromGeolite";

export async function ISOCodeCookies(){
    let isocode = await getCookie('isocode')
    if( !isocode ) {
        const {isoCode, countryName} = await getUserCityFromGeolite(GetUserIP())
        await setCookie('isocode', isoCode)
    }
    isocode = isocode ?? await getCookie('isocode')
    return isocode
}