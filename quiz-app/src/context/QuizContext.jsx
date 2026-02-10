import { createContext, useReducer } from "react";
import questions from "../data/questions.json"

export const QuizContext = createContext();

const initialState = {
    username: "",
    index: 0,
    score: 0,
    completed: false,
    questions: questions,
    answers: [] // Track user answers
}

function quizReducer(state, action) {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                username: action.payload
            }
        case "ANSWER_QUESTION":
            return {
                ...state,
                score: action.payload.isCorrect ? state.score + 1 : state.score,
                index: state.index + 1,
                answers: [...state.answers, {
                    questionIndex: state.index,
                    userAnswer: action.payload.userAnswer,
                    isCorrect: action.payload.isCorrect,
                    correctAnswer: action.payload.correctAnswer
                }]
            }
        case "NEXT_QUESTION":
            return {
                ...state,
                index: state.index + 1,
                answers: [...state.answers, {
                    questionIndex: state.index,
                    userAnswer: null,
                    isCorrect: false,
                    correctAnswer: action.payload
                }]
            }
        case "FINISH_QUIZ":
            return {
                ...state,
                completed: true
            }
        case "RESET_QUIZ":
            return {
                ...initialState,
                questions: state.questions
            }
        default:
            return state;
    }
}

export default function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(quizReducer, initialState)

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    )
}