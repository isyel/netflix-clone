import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	const opts = {
		height: "500",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	function handleClick(movie) {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.name || "Netflix")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log("Error in movie trailer", error));
		}
	}

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<>
						<img
							key={movie.id}
							className={`row__poster ${isLargeRow && "row__posterLarge"}`}
							src={`${imageBaseUrl}${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							alt={movie.name}
							onClick={() => handleClick(movie)}
						/>
						<p className="movie__title">{movie?.name}</p>
					</>
				))}
			</div>

			{trailerUrl && (
				<div className="youtube__container">
					<YouTube videoId={trailerUrl} opts={opts} />
				</div>
			)}
		</div>
	);
}

export default Row;
