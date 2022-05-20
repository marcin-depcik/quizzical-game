import React from 'react'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'
import Answer from './Answer'

export default function Quiz() {
    const [data, setData] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [newGame, setNewGame] = useState(false)

    // fetching data
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
            .then((res) => res.json())
            .then((data) => setData(formatData(data.results)))
    }, [newGame])

    // formating fetched data to better object strucer
    const formatData = (data) => {
        const questions = []
        data.forEach((item) => {
            const answers = [...item.incorrect_answers, item.correct_answer].map((answer) => {
                const randomNumber = Math.ceil(Math.random() * 100)
                return {
                    id: nanoid(),
                    order: randomNumber,
                    answer: answer,
                    isSelected: false,
                    answerColor: '',
                }
            })
            questions.push({
                id: nanoid(),
                question: item.question,
                allAnswers: answers,
                correctAnswer: item.correct_answer,
            })
        })
        setGameOver(false)
        return questions
    }

    // function to select answers
    const selectAnswer = (value, questionID) => {
        for (let i = 0; i < 2; i++) {
            setData((prevData) => {
                return prevData.map((item) => {
                    if (item.id === questionID) {
                        const changedAnswers = item.allAnswers.map((singleAnswer) => {
                            if (i === 0) {
                                return { ...singleAnswer, isSelected: false }
                            } else {
                                return singleAnswer.answer === value
                                    ? { ...singleAnswer, isSelected: true }
                                    : { ...singleAnswer }
                            }
                        })
                        return { ...item, allAnswers: changedAnswers }
                    } else {
                        return { ...item }
                    }
                })
            })
        }
    }

    // function to check answers
    const checkAnswer = () => {
        setData((prevData) => {
            return prevData.map((item) => {
                const changedAnswers = item.allAnswers.map((singleAnswer) => {
                    return singleAnswer.isSelected && item.correctAnswer === singleAnswer.answer
                        ? { ...singleAnswer, answerColor: '#94D7A2' }
                        : singleAnswer.isSelected && item.correctAnswer !== singleAnswer.answer
                        ? { ...singleAnswer, answerColor: '#F8BCBC' }
                        : !singleAnswer.isSelected && item.correctAnswer === singleAnswer.answer
                        ? { ...singleAnswer, answerColor: '#94D7A2' }
                        : { ...singleAnswer }
                })
                return { ...item, allAnswers: changedAnswers }
            })
        })
        setGameOver(true)
    }

    // setting up new game
    const makeNewGame = () => {
        setNewGame((prev) => (prev = !prev))
    }

    // creating array of displayed components
    const quiz = data.map((item) => {
        const answers = item.allAnswers.map(({ id, order, answer, isSelected, answerColor }) => {
            return (
                <Answer
                    key={id}
                    order={order}
                    answer={answer}
                    isSelected={isSelected}
                    answerColor={answerColor}
                    handleClick={!gameOver ? () => selectAnswer(answer, item.id) : undefined}
                />
            )
        })
        return (
            <React.Fragment key={nanoid()}>
                <Question question={item.question} />
                <div className="answers">{answers}</div>
                <div className="h--line"></div>
            </React.Fragment>
        )
    })

    return data.length > 0 ? (
        <main>
            {quiz}
            {!gameOver ? (
                <button type="button" className="btn--check" onClick={checkAnswer}>
                    Check answers
                </button>
            ) : (
                <button type="button" className="btn--check" onClick={makeNewGame}>
                    New quiz
                </button>
            )}
        </main>
    ) : (
        <h1>Loading Quizzical...</h1>
    )
}
