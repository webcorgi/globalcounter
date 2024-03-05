"use client"

import React, {useState} from 'react';
import Globalboard from '../(components)/globalboard';

const Game = () => {
    const [score, setScore] = useState(0);
    const handleButtonClick = () => {
        setScore(score + 1)
    }

    return (
        <div className="game">
            <button onClick={handleButtonClick}>click</button>
            <div id="score">count: {score}</div>
            <Globalboard />
        </div>
    )
};

export default Game;