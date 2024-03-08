"use client"
import { isoState } from "@/lib/store/isoState";
import { useRecoilState } from "recoil";
import react, {useEffect} from 'react'

export default function SaveISO({isocode}){
    const [iso, setIso] = useRecoilState(isoState)
    useEffect(() => {
        setIso(isocode)
    }, []);

    return(<></>)
}