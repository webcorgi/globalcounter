'use client'
import {useState} from 'react'

export default function Game() {
    const [score, setScore] = useState(0);
    const handeClick = () => {
        setScore(score + 1)
    }
    /*********************************
     * DB
     * *******************************/

    /*********************************
     * // DB
     * *******************************/
    return (
        <div className="game">
            <button onClick={handeClick}>click</button>
            <div className="score">count: {score}
            </div>
        </div>
    )
};