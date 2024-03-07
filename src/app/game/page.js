"use client"
import { countState } from "@/lib/store/countState";
import { useRecoilState } from "recoil";
import react, {useEffect} from "react"


export default function Game() {
    const [score, setScore] = useRecoilState(countState)

    const increment = () => {
        setScore(score + 1)
    }

    useEffect(() => {
        console.log(`score:${score}`)
    }, [score]);

    return (
        <div className="game">
            <button onClick={increment}>click</button>
            <div className="score">count: {score}</div>
        </div>
    )
}