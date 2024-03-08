'use client'

import Image from 'next/image'
import react, {useEffect, useState} from 'react'
import { useRecoilState } from "recoil";
import { countState } from "@/lib/store/countState";
import { isoState } from '@/lib/store/isoState';

export default function GlobalboardList({countries}){
    const [iso, setIso] = useRecoilState(isoState)
    let isoCount = countries.filter((e) => e.country_code == iso)[0].country_count

    const [score, setScore] = useRecoilState(countState)
    const [resultCount, setResultCount] = useState(isoCount ?? 0)
    const sortedCountries = countries.sort((a, b) => b.country_count - a.country_count)

    useEffect(() => {
        /* 현재 국가 DB의 카운트 + 클릭한 카운트 */
        setResultCount(isoCount+score)
    }, [score]);

    return(
        <ul>
            {sortedCountries.map((country, i) => (
                <li key={country.country_index}>
                    <div className="number">{i + 1}</div>
                    <div className="country">
                        <Image src={`https://onedev.i234.me/data/flags/${country.country_code.toLowerCase()}.svg`} alt={country.country_name} width="30" height="21" />
                        <span>{country.country_name}</span>
                    </div>
                    <div className="count">
                        {   // 접속한 국가라면 recoil에 저장되는 카운트와 함께 카운트
                            country.country_code==iso
                            ? resultCount
                            : country.country_count
                        }

                    </div>
                </li>
            ))}
        </ul>
    )
}