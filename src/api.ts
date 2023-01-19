import axios from "axios";

const API_KEY = "ba621a4e36b9c325838cdc6720823931";
const BASE_PATH = "https://api.themoviedb.org/3/";

interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_result: number;
}

export const getMovies = async () => {
  return await axios(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.data
  );
};
