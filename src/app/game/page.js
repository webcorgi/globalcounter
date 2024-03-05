"use client"

import React, {useState} from 'react';

const Game = () => {
    const [score, setScore] = useState(0);
    const handleButtonClick = () => {
        setScore(score + 1)
    }

    return (
        <div className="game">
            <button onClick={handleButtonClick}>click</button>
            <div id="score">count: {score}</div>
        </div>
    )
};

export default Game;