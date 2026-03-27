import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const poster = movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";
    const fallbackImage = "https://placehold.co/400x600?text=No+Image";
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={poster}
                onError={(e) => (e.target.src = fallbackImage)}
                className="card-img-top"
                alt={movie.Title}
                style={{ height: "350px", objectFit: "cover" }}
            />

            <div className="card-body">
                <h6 className="card-title">{movie.Title}</h6>
                <p className="text-muted small mb-2">{movie.Year}</p>

                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="btn btn-sm btn-primary w-100"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;
