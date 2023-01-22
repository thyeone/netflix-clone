import axios from "axios";

const API_KEY = "ba621a4e36b9c325838cdc6720823931";
const BASE_PATH = "https://api.themoviedb.org/3/";
const LANGUAGE = "ko-KR";
const REGION = "kr";
export const NowPlaying = async () => {
  return await axios(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`
  ).then((response) => response.data);
};

export const PopularMovies = async () => {
  return await axios(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`
  ).then((response) => response.data);
};

export const TopRatedMovies = async () => {
  return await axios(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`
  ).then((response) => response.data);
};

export const SearchMovies = async (keyword: string | null) => {
  return await axios(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.data);
};
