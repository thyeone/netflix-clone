import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Banner from "../Components/Banner";
import MovieModal from "../Components/MovieModal";
import Row from "../Components/Row";
import { IGetMoviesResult } from "../typing";
import { NowPlaying, PopularMovies, TopRatedMovies } from "../utils/api";

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;

function Home() {
  const { isLoading, data: nowPlaying } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    NowPlaying
  );
  const { data: popularMovies } = useQuery<IGetMoviesResult>(
    ["movies", "popularMovies"],
    PopularMovies
  );
  const { data: topRatedMovies } = useQuery<IGetMoviesResult>(
    ["movies", "topRatedMovies"],
    TopRatedMovies
  );
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");

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
          <Banner nowPlaying={nowPlaying} />
          <Row
            rowIndex={firstRow}
            title={"Now Playing"}
            data={nowPlaying}
            onBoxClicked={onBoxClicked}
          />
          <Row
            rowIndex={secondRow}
            title={"Trending Now"}
            data={popularMovies}
            onBoxClicked={onBoxClicked}
          />

          <Row
            rowIndex={thirdRow}
            title={"Top Rated"}
            data={topRatedMovies}
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
