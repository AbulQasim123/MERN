import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieDetail() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const fallbackImage = "https://placehold.co/400x600?text=No+Image";

	useEffect(() => {
		async function getMovie() {
			const res = await fetch(
				`https://www.omdbapi.com/?apikey=9236f6af&i=${id}`
			);
			const data = await res.json();
			setMovie(data);
		}
		getMovie();
	}, [id]);

	if (!movie) return <p>Loading...</p>;
	const poster =
		movie.Poster && movie.Poster !== "N/A"
			? movie.Poster
			: "https://via.placeholder.com/400x600?text=No+Image";


	return (

		<div className="row g-4">

			<div className="col-md-4">
				<img
					src={poster}
					onError={(e) => (e.target.src = fallbackImage)}
					alt={movie.Title}
					className="img-fluid rounded shadow"
				/>
			</div>


			<div className="col-md-8">
				<h2>{movie.Title}</h2>
				<p className="text-muted">{movie.Year}</p>

				<p>
					<strong>Genre:</strong> {movie.Genre}
				</p>

				<p>
					<strong>Released:</strong> {movie.Released}
				</p>

				<p>
					<strong>Plot:</strong> {movie.Plot}
				</p>
			</div>
		</div>
	);
}

export default MovieDetail;
