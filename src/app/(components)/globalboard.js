import { headers } from 'next/headers'
import { Reader } from '@maxmind/geoip2-node'
import fs from 'fs';
import path from 'path';
import Image from 'next/image'

function GetUserIP() {
    const FALLBACK_IP_ADDRESS = '175.201.251.235'
    const forwardedFor = headers().get('x-forwarded-for')
    const realIp = headers().get('x-real-ip')
    return realIp ?? FALLBACK_IP_ADDRESS
}
async function getUserCityFromGeolite(ip){
    const reader = await Reader.open('./public/data/GeoLite2-City.mmdb');
    const response = reader.city(ip); // 여기서 방문자의 IP 주소를 사용합니다.
    const isoCode = response.country.isoCode;
    const countryName = response.country.names.en;
    return {isoCode, countryName}
}
function getContriesFromJson(){
    const filePath = path.join(process.cwd(), 'public/data', 'countries.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const countries = JSON.parse(jsonData).countries;
    return countries
}

export default async function Globalboard(){
    const {isoCode, countryName} = await getUserCityFromGeolite(GetUserIP())
    const countries = await getContriesFromJson()

    return(
        <div className="globalboard">
            {/* <h1>global board</h1> */}
            <p>Your IP: <GetUserIP /></p>
            <p>Your City: {isoCode}, {countryName}</p>
            <ul>
                {countries.map((country, i) => (
                <li key={i}>
                    <div className="number">{i+1}</div>
                    <div className="contry">
                        <Image src={`https://onedev.i234.me/data/flags/${country.country_code.toLowerCase()}.svg`} alt={country.country_name} width="30" height="21" />
                        <span>{country.country_name.split(',')[0]}</span>
                    </div>
                    <div className="count">0</div>
                </li>
                ))}
            </ul>
        </div>
    )
}