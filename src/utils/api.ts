import axios from "axios";

const API_KEY = "ba621a4e36b9c325838cdc6720823931";
const BASE_PATH = "https://api.themoviedb.org/3/";

export const getMovies = async () => {
  return await axios(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.data
  );
};
