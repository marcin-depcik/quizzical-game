import React from 'react'

export default function IntroPage(props) {
    return (
        <main>
            <h1>Start Quizzical Game!</h1>
            <button className="btn--start" type="button" onClick={props.handleClick}>
                Start Quiz
            </button>
        </main>
    )
}
