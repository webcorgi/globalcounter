"use client"
import { isoState } from "@/lib/recoil/isoState";
import { useRecoilState } from "recoil";
import react, {useEffect} from 'react'
/*
interface isocodeProps {
    isocode: string | undefined;
}
 */
export default function SaveISO({isocode}:any){
    const [iso, setIso] = useRecoilState<string | undefined>(isoState)
    useEffect(() => {
        console.log("🚀 ~ SaveISO ~ isocode:", isocode.value)
        setIso(isocode.value)
    }, []);

    return(<></>)
}