import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { SearchMovies } from "../utils/api";
import { makeImagePath } from "../utils/utils";

const offset = 6;
let n = 0;
for (let i = 0; i < 999; i++) {
  n = i;
}

function Search() {
  const { isLoading, data } = useQuery<IGetMoviesResult>(["search"], () =>
    SearchMovies(keyword)
  );
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");

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
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  return (
    <Wrapper>
      {data && data?.results.length > 0 ? (
        <>
          <ResultKeyword>'{keyword}'로 검색한 결과입니다.</ResultKeyword>
          <Row variants={rowVariants}>
            {data?.results.map(
              (movie) =>
                movie.backdrop_path && (
                  <Box
                    key={movie.id}
                    n={n}
                    offset={offset}
                    variants={BoxVariants}
                    whileHover="hover"
                    initial="normal"
                    bgphoto={makeImagePath(movie.backdrop_path || "", "w500")}
                  />
                )
            )}
          </Row>
        </>
      ) : (
        <NoResultMessage>
          입력하신 검색어 "{keyword}"(와)과 일치하는 결과가 없습니다.
        </NoResultMessage>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  top: 130px;
  padding-top: 10px;
`;

const ResultKeyword = styled.h3`
  font-size: 16px;
  margin: 0 0 30px 50px;
  font-weight: 300;
`;

const NoResultMessage = styled.span`
  height: 60vh;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number; n: number }>`
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  width: 260px;
  height: 144px;
  cursor: pointer;
  &:nth-child(5n + 1) {
    transform-origin: center left;
    margin-left: 50px;
  }
  &:nth-child(5n) {
    transform-origin: center right;
    margin-right: 50px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 5 },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};
export default Search;
