import Image from 'next/image'
import { readDB } from '@/lib/db/dbservice_mongodb';
import getContriesFromJson from '@/lib/getContriesFromJson';
import getUserCityFromGeolite from '@/lib/getUserCityFromGeolite';
import GetUserIP from '@/lib/GetUserIP';


export default async function Globalboard(){
    const {isoCode, countryName} = await getUserCityFromGeolite(GetUserIP())
    // const countries = await getContriesFromJson()
    let countries = await readDB()
    const sortedCountries = countries.sort((a, b) => b.country_count - a.country_count)

    return(
        <div className="globalboard">
            {/* <h1>global board</h1> */}
            <p>Your IP: <GetUserIP /></p>
            <p>Your City: {isoCode}, {countryName}</p>
            <ul>
                {sortedCountries.map((country, i) => (
                    <li key={country.country_index}>
                        <div className="number">{i + 1}</div>
                        <div className="country">
                            <Image src={`https://onedev.i234.me/data/flags/${country.country_code.toLowerCase()}.svg`} alt={country.country_name} width="30" height="21" />
                            <span>{country.country_name.split(',')[0]}</span>
                        </div>
                        <div className="count">{country.country_count}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}