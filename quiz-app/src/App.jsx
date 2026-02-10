import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react";
import QuizProvider from "./context/QuizContext"
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import LeaderBoard from './pages/LeaderBoard';
const Result = lazy(() => import("./pages/Result"))

function App() {
	return (
		<>
			<QuizProvider>
				<BrowserRouter>
					<Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/quiz" element={<Quiz />} />
							<Route path="/result" element={<Result />} />
							<Route path="/leaderboard" element={<LeaderBoard />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</QuizProvider>
		</>
	)
}

export default App