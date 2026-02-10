import { useState, useContext } from 'react'
import { QuizContext } from "../context/QuizContext"
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [name, setName] = useState("")
    const { dispatch } = useContext(QuizContext)
    const navigate = useNavigate()

    const startQuiz = () => {
        if (!name.trim()) {
            alert("Please enter your name.")
            return
        }
        dispatch({ type: "RESET_QUIZ" })
        dispatch({ type: "SET_NAME", payload: name.trim() })
        navigate("/quiz")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            startQuiz()
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h4 className="fw-bold mb-0">Full Stack Quiz Challenge</h4>
                        </div>
                        <div className="card-body p-5">
                            <div className="mb-4">
                                <label htmlFor="nameInput" className="form-label fw-semibold">
                                    Enter Your Name
                                </label>
                                <input
                                    id="nameInput"
                                    placeholder="Type your name here..."
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={startQuiz}
                                className="btn btn-primary btn-sm w-100 py-3 fw-bold"
                                disabled={!name.trim()}
                            >
                                Start Quiz Now
                            </button>

                            <div className="mt-4 text-center">
                                <small className="text-muted">
                                    Test your knowledge with my exciting quiz!
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}