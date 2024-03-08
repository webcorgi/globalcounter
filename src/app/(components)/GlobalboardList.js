'use client'

import Image from 'next/image'
import react, {useEffect, useState} from 'react'
import { useRecoilState } from "recoil";
import { countState } from "@/lib/store/countState";
import { isoState } from '@/lib/store/isoState';

export default function GlobalboardList({countries}){
    const [iso, setIso] = useRecoilState(isoState) // 접속한 유저 국가
    let isoCount = countries.filter((e) => e.country_code == iso)[0].country_count // 접속한 유저 국가의 총 카운트

    const [score, setScore] = useRecoilState(countState) // 유저가 접속후 추가로 클릭한 recoil 카운트
    const [resultCount, setResultCount] = useState(isoCount ?? 0) // 접속한 유저국가의 DB 카운트 + 클릭한 카운트
    const sortedCountries = countries.sort((a, b) => b.country_count - a.country_count) // 오름차순 정렬


    // 클릭할때마다 카운트 갱신
    useEffect(() => {
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