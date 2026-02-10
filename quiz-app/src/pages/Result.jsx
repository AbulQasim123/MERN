import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { QuizContext } from "../context/QuizContext"
import { Trophy, CheckCircle, XCircle, BarChart } from "react-bootstrap-icons"

export default function Result() {
    const { state, dispatch } = useContext(QuizContext)
    const [resultSaved, setResultSaved] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const percentage = Math.round((state.score / state.questions.length) * 100)

    useEffect(() => {
        // Save result only once when component mounts and quiz is completed
        if (state.completed && state.username && !resultSaved) {
            const entry = {
                name: state.username,
                score: state.score,
                percentage,
                totalQuestions: state.questions.length,
                date: new Date().toLocaleString(),
                timestamp: Date.now()
            }

            const stored = JSON.parse(localStorage.getItem("leaderboard")) || []
            
            // Add new entry
            const updated = [...stored, entry]
            // Sort by score (descending), then by date (ascending)
            updated.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score
                return new Date(a.date) - new Date(b.date)
            })
            
            localStorage.setItem("leaderboard", JSON.stringify(updated))
            setResultSaved(true)
        }
    }, [state, percentage, resultSaved])

    const getPerformanceMessage = () => {
        if (percentage >= 90) return "Outstanding! 🎯"
        if (percentage >= 75) return "Excellent! 🌟"
        if (percentage >= 60) return "Good Job! 👍"
        if (percentage >= 40) return "Not Bad! 💪"
        return "Keep Practicing! 📚"
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white py-4 text-center">
                            <Trophy size={40} className="mb-3" />
                            <h2 className="fw-bold mb-0">Quiz Completed!</h2>
                            <p className="mb-0 opacity-75">Congratulations, {state.username}!</p>
                        </div>
                        
                        <div className="card-body p-5">
                            {/* Score Display */}
                            <div className="text-center mb-5">
                                <div className="position-relative d-inline-block">
                                    <div className="circular-progress" 
                                         style={{
                                             width: '180px',
                                             height: '180px',
                                             borderRadius: '50%',
                                             background: `conic-gradient(#4e54c8 ${percentage * 3.6}deg, #e0e0e0 0deg)`,
                                             position: 'relative',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center'
                                         }}>
                                        <div className="inner-circle bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
                                             style={{ width: '140px', height: '140px' }}>
                                            <span className="display-4 fw-bold text-primary">{state.score}</span>
                                            <span className="text-muted">/{state.questions.length}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="fw-bold mt-4">{percentage}%</h3>
                                <p className="fs-5 text-success fw-semibold">{getPerformanceMessage()}</p>
                            </div>

                            {/* Stats */}
                            <div className="row mb-4">
                                <div className="col-md-6 mb-3">
                                    <div className="card border-0 bg-success bg-opacity-10 h-100">
                                        <div className="card-body text-center">
                                            <CheckCircle size={30} className="text-success mb-2" />
                                            <h5 className="fw-bold">Correct Answers</h5>
                                            <h3 className="text-success">{state.score}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card border-0 bg-danger bg-opacity-10 h-100">
                                        <div className="card-body text-center">
                                            <XCircle size={30} className="text-danger mb-2" />
                                            <h5 className="fw-bold">Wrong Answers</h5>
                                            <h3 className="text-danger">{state.questions.length - state.score}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Results Toggle */}
                            <div className="mb-4">
                                <button 
                                    className="btn btn-outline-primary w-100"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    <BarChart className="me-2" />
                                    {showDetails ? "Hide Details" : "Show Detailed Results"}
                                </button>
                            </div>

                            {/* Detailed Results */}
                            {showDetails && (
                                <div className="mb-4">
                                    <h5 className="fw-bold mb-3">Question-wise Analysis:</h5>
                                    <div className="accordion" id="resultsAccordion">
                                        {state.questions.map((q, index) => {
                                            const answer = state.answers[index]
                                            return (
                                                <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header">
                                                        <button 
                                                            className="accordion-button collapsed" 
                                                            type="button" 
                                                            data-bs-toggle="collapse" 
                                                            data-bs-target={`#collapse${index}`}
                                                        >
                                                            <span className={`badge me-2 ${answer?.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                                                                Q{index + 1}
                                                            </span>
                                                            {q.question.substring(0, 50)}...
                                                        </button>
                                                    </h2>
                                                    <div id={`collapse${index}`} className="accordion-collapse collapse">
                                                        <div className="accordion-body">
                                                            <p><strong>Your Answer:</strong> {answer?.userAnswer || "Not answered"}</p>
                                                            <p><strong>Correct Answer:</strong> {q.answer}</p>
                                                            <p><strong>Status:</strong> 
                                                                <span className={`badge ms-2 ${answer?.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                                                                    {answer?.isCorrect ? 'Correct' : 'Wrong'}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="d-grid gap-3">
                                <Link 
                                    to="/leaderboard" 
                                    className="btn btn-primary btn-lg py-3"
                                >
                                    🏆 View Leaderboard
                                </Link>
                                
                                <div className="d-flex gap-3">
                                    <Link 
                                        to="/quiz"
                                        onClick={() => dispatch({ type: "RESET_QUIZ" })}
                                        className="btn btn-warning btn-lg flex-fill"
                                    >
                                        🔄 Retry Quiz
                                    </Link>
                                    
                                    <Link 
                                        to="/"
                                        onClick={() => dispatch({ type: "RESET_QUIZ" })}
                                        className="btn btn-outline-primary btn-lg flex-fill"
                                    >
                                        🏠 Back to Home
                                    </Link>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="text-center mt-4">
                                <small className={`badge ${resultSaved ? 'bg-success' : 'bg-warning'}`}>
                                    {resultSaved ? '✓ Result saved to leaderboard' : 'Saving result...'}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}