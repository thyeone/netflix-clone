import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { SearchMovies } from "../utils/api";
import { makeImagePath } from "../utils/utils";
import Modal from "../Components/Modal";
import { useEffect, useState } from "react";

const offset = 6;
let row = 0;
for (let i = 0; i < 999; i++) {
  row = i;
}

function Search() {
  const [word, setWord] = useState("");
  const { isLoading, data } = useQuery<IGetMoviesResult>(["search"], () =>
    SearchMovies(keyword)
  );
  const navigate = useNavigate();

  const movieMatch = useMatch(`/search/:listType/:id`);

  const onBoxClicked = (id: number, listType: string) => {
    navigate(`/search/${listType}/${id}`);
  };

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const getKeyword = () => {
    if (keyword) {
      setWord(keyword);
    }
  };
  useEffect(() => {
    getKeyword();
  });
  return isLoading ? (
    <span>Loading ...</span>
  ) : (
    <Wrapper>
      {data && data?.results.length > 0 ? (
        <>
          <ResultKeyword>'{word}'로 검색한 결과입니다.</ResultKeyword>
          <Row variants={rowVariants}>
            {data?.results.map(
              (movie) =>
                movie.backdrop_path && (
                  <Box
                    key={movie.id}
                    onClick={() => onBoxClicked(movie.id, movie.media_type)}
                    layoutId={movie.id + movie.media_type}
                    n={row}
                    offset={offset}
                    variants={BoxVariants}
                    whileHover="hover"
                    initial="normal"
                    bgphoto={makeImagePath(movie.backdrop_path || "", "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                )
            )}
          </Row>
        </>
      ) : (
        <NoResultMessage>
          입력하신 검색어 "{keyword}"(와)과 일치하는 결과가 없습니다.
        </NoResultMessage>
      )}
      <AnimatePresence>
        {movieMatch ? (
          <Modal
            movieMatch={movieMatch}
            movieId={Number(movieMatch?.params.id)}
            listType={movieMatch?.params.listType || ""}
          />
        ) : null}
      </AnimatePresence>
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
  overflow: hidden;
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

const Info = styled(motion.div)`
  position: absolute;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
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
    y: -30,
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
