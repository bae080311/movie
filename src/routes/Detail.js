import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const getMovie = async () => {
    try {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();

      if (json && json.data && json.data.movie) {
        setMovie(json.data.movie);
        setLoading(false);
      } else {
        console.error("영화 데이터를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("영화 데이터를 가져오는 도중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
            <img src={movie.background_image} alt={movie.title} />
            <h2>{movie.title}</h2>
            <ul>
              <li>Rating: {movie.rating}</li>
              <li>Runtime: {movie.runtime}</li>
              <li>Year: {movie.year}</li>
            </ul>
            <p>
              {movie.description_full}
            </p>
        </div>
      )}
    </div>
  );
}

export default Detail;
