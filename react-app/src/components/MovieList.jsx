import MovieCard from "./MovieCard";

function MovieList({ movies }) {
    if (!movies.length) {
        return (
            <p className="text-danger text-center mt-4 fs-5">
                No Movies Found.
            </p>
        );
    }

    return (
        <div className="row g-3">
            {movies.map((movie) => (
                <div key={movie.imdbID} className="col-sm-6 col-md-4 col-lg-3">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
}

export default MovieList;
