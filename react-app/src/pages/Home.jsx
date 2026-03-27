import { useState, useEffect, useRef } from "react";
import MovieList from "../components/MovieList";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const fetchMovies = async (query) => {
        setLoading(true);
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=9236f6af&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies("Avengers");
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = inputRef.current.value.trim();
        if (query) fetchMovies(query);
    };

    return (
        <div>
            {/* Search Box */}
            <form className="row g-2 mb-4" onSubmit={handleSearch}>
                <div className="col-md-10">
                    <input
                        type="search"
                        ref={inputRef}
                        className="form-control"
                        placeholder="Search for a movie..."
                    />
                </div>
                <div className="col-md-2 d-grid">
                    <button className="btn btn-primary">Search</button>
                </div>
            </form>

            {/* Movies List */}
            {loading ? (
                <div className="text-center mt-4">
                    <div className="spinner-border" role="status"></div>
                </div>
            ) : (
                <MovieList movies={movies} />
            )}
        </div>
    );
}

export default Home;
