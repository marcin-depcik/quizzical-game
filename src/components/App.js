import React from 'react'
import { useState } from 'react'
import IntroPage from './IntroPage'
import Quiz from './Quiz'

export default function App() {
    const [gameInit, setGameInit] = useState(false)
    return gameInit ? <Quiz /> : <IntroPage handleClick={() => setGameInit(true)} />
}
