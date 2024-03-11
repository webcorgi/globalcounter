'use client'

import Image from 'next/image'
import react, {useEffect, useState} from 'react'
import { useRecoilState } from "recoil";
import { countState } from "@/lib/recoil/countState";
import { isoState } from '@/lib/recoil/isoState';
import { ObjectId } from 'mongodb'; // ObjectId 타입을 사용하기 위해 mongodb 패키지가 필요합니다.

interface countries {
    _id: ObjectId;
    country_index: number;
    country_code: string;
    country_name: string;
    country_count: number;
    __v: number;
}
interface GlobalboardListProps {
    countries: countries[];
}


export default function GlobalboardList({countries}:GlobalboardListProps){
    const [iso, setIso] = useRecoilState(isoState) // 접속한 유저 국가

    let isoCount:number = countries.filter((e:{country_code:string}) => e.country_code == iso)[0].country_count // 접속한 유저 국가의 총 카운트
    const [score, setScore] = useRecoilState<number>(countState) // 유저가 접속후 추가로 클릭한 recoil 카운트
    const [resultCount, setResultCount] = useState<number>(isoCount ?? 0) // 접속한 유저국가의 DB 카운트 + 클릭한 카운트
    const sortedCountries = countries.sort((a:{country_count:number}, b:{country_count:number}) => b.country_count - a.country_count) // 오름차순 정렬


    // 클릭할때마다 카운트 갱신
    useEffect(() => {
        setResultCount(isoCount+score)
    }, [score]);

    return(
        <ul>
            {sortedCountries.map((country:{country_index:number, country_name:string, country_code:string, country_count:number}, i:number) => (
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