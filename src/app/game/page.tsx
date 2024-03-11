"use client"

import { isoState } from "@/lib/recoil/isoState";
import { countState } from "@/lib/recoil/countState";
import { useRecoilState } from "recoil";
import { updateoneDB } from "@/lib/db/dbservice_mongodb";

export default function Game() {
    const [iso, setIso] = useRecoilState<string | undefined>(isoState)
    const [score, setScore] = useRecoilState<number>(countState)

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