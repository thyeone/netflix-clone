import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Banner from "../Components/Banner";
import MovieModal from "../Components/MovieModal";
import Slider from "../Components/Slider";
import { IGetMoviesResult } from "../typing";
import { NowPlaying } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { isLoading, data: nowPlaying } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    NowPlaying
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    navigate(-1);
  };
  const clickedMovie =
    movieMatch?.params.movieId &&
    nowPlaying?.results.find(
      (movie) => movie.id === Number(movieMatch.params.movieId)
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <span>Loading ...</span>
        </Loader>
      ) : (
        <>
          <Banner increaseIndex={increaseIndex} nowPlaying={nowPlaying} />
          <Slider
            index={index}
            data={nowPlaying}
            toggleLeaving={toggleLeaving}
            onBoxClicked={onBoxClicked}
          />
          <MovieModal
            movieMatch={movieMatch}
            onOverlayClick={onOverlayClick}
            clickedMovie={clickedMovie}
          />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #000;
`;

const Loader = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
  }
`;

export default Home;
