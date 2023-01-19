import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "../Components/Slider";
import { getMovies, IGetMoviesResult } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
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
    data?.results.find(
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
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider
            index={index}
            data={data}
            toggleLeaving={toggleLeaving}
            onBoxClicked={onBoxClicked}
          />
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  variants={overlayVariants}
                  onClick={onOverlayClick}
                  initial="hidden"
                  exit="exit"
                  animate="visible"
                />
                <MovieDetail layoutId={movieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <div
                        className="detail_image"
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path ||
                              clickedMovie.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <h3 className="detail_title">{clickedMovie.title}</h3>
                      <p className="detail_overview">{clickedMovie.overview}</p>
                    </>
                  )}
                </MovieDetail>
              </>
            ) : null}
          </AnimatePresence>
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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 72px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieDetail = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  .detail_image {
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 400px;
  }
  .detail_title {
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 38px;
    position: relative;
    top: -70px;
  }
  .detail_overview {
    position: relative;
    top: -20px;
    color: ${(props) => props.theme.white.lighter};
    padding: 0 20px;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};

export default Home;
