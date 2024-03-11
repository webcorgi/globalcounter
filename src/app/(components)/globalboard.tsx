import Image from 'next/image'
import { readDB } from '@/lib/db/dbservice_mongodb';
import GlobalboardList from './GlobalboardList';

export default async function Globalboard({isocode}:any){
    const countries = await readDB()
    const countryFlag = countries.filter((country:{country_code:string}) => country.country_code == isocode)[0].country_code;

    return(
        <div className="globalboard">
            <p>
                Your City: {isocode}
                <Image src={`https://onedev.i234.me/data/flags/${countryFlag.toLowerCase()}.svg`} alt="flag" width="30" height="21" className="myflag" />
            </p>
            <GlobalboardList countries={countries}/>
        </div>
    )
}