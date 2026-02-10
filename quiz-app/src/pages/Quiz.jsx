import { useEffect, useContext, useState } from 'react'
import { QuizContext } from "../context/QuizContext"
import { useNavigate } from 'react-router-dom'
import Timer from './../components/Timer';
import ProgressBar from './../components/ProgressBar';
import QuestionCard from './../components/QuestionCard';
import useTimer from '../hooks/useTimer';

export default function Quiz() {
    const { state, dispatch } = useContext(QuizContext)
    const { index, questions } = state;
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null)
    const { time, reset } = useTimer(15) 

    // Reset timer and selection when moving to next question
    useEffect(() => {
        setSelectedOption(null)
        reset()
    }, [index, reset])

    useEffect(() => {
        if (time === 0 && selectedOption === null) {
            // Time's up and no answer selected
            const currentQuestion = questions[index]
            dispatch({
                type: "NEXT_QUESTION",
                payload: currentQuestion.answer
            })
        }
    }, [time, selectedOption, index, questions, dispatch])

    if (!questions || questions.length === 0) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Questions...</span>
                </div>
                <h2 className='mt-3'>Loading Questions...</h2>
            </div>
        )
    }

    // Check if quiz is completed
    if (index >= questions.length) {
        dispatch({ type: "FINISH_QUIZ" })
        navigate("/result")
        return null;
    }

    const currentQuestion = questions[index]

    const handleSelect = (option) => {
        if (selectedOption !== null) return; // Prevent multiple selections

        setSelectedOption(option)

        // Wait a moment to show feedback, then proceed
        setTimeout(() => {
            const isCorrect = option === currentQuestion.answer
            dispatch({
                type: "ANSWER_QUESTION",
                payload: {
                    userAnswer: option,
                    isCorrect: isCorrect,
                    correctAnswer: currentQuestion.answer
                }
            })

            // If last question, navigate to result
            if (index === questions.length - 1) {
                setTimeout(() => {
                    dispatch({ type: "FINISH_QUIZ" })
                    navigate("/result")
                }, 500)
            }
        }, 500)
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h3 className="fw-bold text-primary">Quiz Challenge</h3>
                            <p className="text-muted mb-0">Player: {state.username}</p>
                        </div>
                        <div className="text-end">
                            <div className="badge bg-primary fs-6">
                                Question {index + 1} of {questions.length}
                            </div>
                        </div>
                    </div>

                    {/* Timer */}
                    <Timer time={time} />

                    {/* Progress Bar */}
                    <ProgressBar current={index} total={questions.length} />

                    {/* Question Card */}
                    <QuestionCard
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        onSelect={handleSelect}
                        selectedOption={selectedOption}
                        correctAnswer={selectedOption ? currentQuestion.answer : null}
                    />

                    {/* Current Score */}
                    <div className="card mt-3 border-0 bg-light">
                        <div className="card-body text-center">
                            <h5 className="mb-0">
                                Current Score: <span className="fw-bold text-primary">{state.score}</span>
                            </h5>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="alert alert-info mt-3">
                        <small>
                            Select an option to answer. Time limit: 15 seconds per question.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}