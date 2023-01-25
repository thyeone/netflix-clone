import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";
import MovieModal from "./MovieModal";

const offset = 5;

interface IProps {
  data?: IGetMoviesResult;
  onBoxClicked: (id: number, listType: string) => void;
  title: string;
  rowIndex: number;
  listType: string;
}

function Row({ data, onBoxClicked, title, rowIndex, listType }: IProps) {
  const [index, setIndex] = useState([0, 0, 0]);
  const [leaving, setLeaving] = useState(false);
  const [next, setNext] = useState(true);
  const movieMatch = useMatch(`/${listType}/:id`);

  const changeIndex = (right: boolean, rowIndex: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setNext(right);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset);

      right
        ? setIndex((prev) => {
            const result = [...prev];
            result[rowIndex] === maxIndex
              ? (result[rowIndex] = 0)
              : (result[rowIndex] += 1);
            return result;
          })
        : setIndex((prev) => {
            const result = [...prev];
            result[rowIndex] === 0
              ? (result[rowIndex] = maxIndex)
              : (result[rowIndex] -= 1);
            return result;
          });
    }
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  return (
    <Wrapper>
      <SilderTitle>{title}</SilderTitle>
      <ArrowBtn>
        <PrevButton className="arrow">
          <LeftOutlined onClick={() => changeIndex(false, rowIndex)} />
        </PrevButton>
        <NextButton className="arrow">
          <RightOutlined onClick={() => changeIndex(true, rowIndex)} />
        </NextButton>
      </ArrowBtn>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={next}
      >
        <Slider
          key={index[rowIndex]}
          custom={next}
          initial={{ x: next ? window.outerWidth + 5 : -window.outerWidth - 5 }}
          animate={{ x: 0 }}
          exit={{ x: next ? -window.outerWidth - 5 : window.outerWidth + 5 }}
          transition={{ type: "tween", duration: 1 }}
        >
          {data?.results
            .slice(1)
            .slice(offset * index[rowIndex], offset * index[rowIndex] + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                layoutId={movieMatch?.params.id + listType}
                onClick={() => onBoxClicked(movie.id, listType)}
                variants={BoxVariants}
                whileHover="hover"
                initial="normal"
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Slider>
      </AnimatePresence>
      <AnimatePresence>
        {movieMatch ? (
          <MovieModal
            movieMatch={movieMatch}
            movieId={Number(movieMatch?.params.id)}
            listType={listType}
            rowIndex={rowIndex}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  top: -130px;
  min-height: 230px;
  overflow-x: hidden;
  @media screen and (min-width: 1920px) {
    top: -250px;
    min-height: 230px;
  }
  :hover .arrow {
    opacity: 1;
    transition: all 0.5s ease;
  }
`;

const SilderTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin-left: 50px;
  margin-bottom: -50px;
`;

const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 1920px) {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    overflow: hidden;
  }
`;

const ArrowBtn = styled.div`
  position: relative;
  top: 110px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const PrevButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 8px;
  z-index: 999;
  cursor: pointer;
  margin-left: 40px;
  opacity: 0;
  svg {
    width: 20px;
    height: 20px;
    :hover {
      scale: 1.2;
      transition: 1s;
    }
  }
`;

const NextButton = styled(PrevButton)``;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: #fff;
  width: 260px;
  height: 144px;
  border-radius: 5px;
  font-size: 16px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
    margin-left: 50px;
  }
  &:last-child {
    transform-origin: center right;
    margin-right: 20px;
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

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -30,
    transition: {
      delay: 0.5,
      duaration: 0.4,
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

export default Row;