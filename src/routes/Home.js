import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    try {
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        )
      ).json();
  
      if (json && json.data && json.data.movies) {
        setMovies(json.data.movies);
        setLoading(false);
      } else {
        console.error("영화 목록을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("영화 목록을 가져오는 도중 오류가 발생했습니다:", error);
    }
  };
  
  useEffect(() => {
    getMovies();
  }, []);
  
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              id={movie.id}
              key={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
