import { headers } from 'next/headers'
import { Reader } from '@maxmind/geoip2-node'

function IP() {
    const FALLBACK_IP_ADDRESS = '175.201.251.235'
    const forwardedFor = headers().get('x-forwarded-for')
    const realIp = headers().get('x-real-ip')
    return realIp ?? FALLBACK_IP_ADDRESS
    // return '175.201.251.235'
}
async function getCity(ip){
    const reader = await Reader.open('./GeoLite2-City.mmdb');
    const response = reader.city(ip); // 여기서 방문자의 IP 주소를 사용합니다.
    const countryName = response.country.names.en;

    const data = {
        isoCode:response.country.isoCode, // KR
        countryName:countryName           // south korea
    }
    return data
}

export default async function Globalboard(){
    const data = getCity(IP())

    return(
        <div className="globalboard">
            globalboard<br />
            <IP />
        </div>
    )
}