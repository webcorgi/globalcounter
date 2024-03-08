"use client"

import { countState } from "@/lib/store/countState";
import { useRecoilState } from "recoil";
import { updateoneDB } from "@/lib/db/dbservice_mongodb";
import { ISOCodeCookies } from "../(components)/ISOCodeCookies";
import { isoState } from "@/lib/store/isoState";

export default function Game() {
    const [iso, setIso] = useRecoilState(isoState)
    const [score, setScore] = useRecoilState(countState)

    const increment = async() => {
        setScore(score + 1)
        await updateoneDB(iso)
    }

    return (
        <div className="game">
            <button onClick={increment}>click</button>
            <div className="score">count: {score}</div>
        </div>
    )
}