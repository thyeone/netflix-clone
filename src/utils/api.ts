import axios from "axios";

const API_KEY = "ba621a4e36b9c325838cdc6720823931";
const BASE_PATH = "https://api.themoviedb.org/3/";

export interface IMovie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
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
