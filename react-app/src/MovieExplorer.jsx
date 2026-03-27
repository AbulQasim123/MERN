import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./components/App.css";
import MovieDetail from "./pages/MovieDetail";

function MovieExplorer() {
    return (
        <Router>
            <Navbar />
            <div className="container py-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default MovieExplorer;
