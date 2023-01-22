import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";

const offset = 5;

interface IProps {
  data?: IGetMoviesResult;
  onBoxClicked: (movieId: number) => void;
  title: string;
  rowIndex: number;
}

function Row({ data, onBoxClicked, title, rowIndex }: IProps) {
  const [index, setIndex] = useState([0, 0, 0]);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => {
        const result = [...prev];
        result[rowIndex] === maxIndex
          ? (result[rowIndex] = 0)
          : (result[rowIndex] += 1);
        return result;
      });
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => {
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
      <ArrowBtn variants={arrowVariants}>
        <PrevButton>
          <LeftOutlined onClick={decreaseIndex} />
        </PrevButton>
        <NextButton className="arrow">
          <RightOutlined onClick={increaseIndex} />
        </NextButton>
      </ArrowBtn>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Slider
          key={index[rowIndex]}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {data?.results
            .slice(1)
            .slice(offset * index[rowIndex], offset * index[rowIndex] + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                layoutId={movie.id + ""}
                onClick={() => onBoxClicked(movie.id)}
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
    </Wrapper>
  );
}

const arrowVariants = {
  hidden: {
    fillOpacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ArrowBtn = styled(motion.div)`
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
  opacity: 1;
  svg {
    width: 20px;
    height: 20px;
    &:hover {
      scale: 1.5;
      transition: 1s;
      stroke: #323232;
      opacity: 1;
    }
  }
  path {
    stroke-width: 1px;
    stroke: white;
  }
`;

const NextButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 8px;
  z-index: 999;
  cursor: pointer;
  opacity: 1;
  svg {
    width: 20px;
    height: 20px;
    &:hover {
      scale: 1.2;
      stroke: #323232;
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: -130px;
  min-height: 230px;
  @media screen and (min-width: 1920px) {
    top: -250px;
    min-height: 230px;
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
  :hover {
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
  // hidden: (index: number) => {
  //   x: index++ ? window.outerWidth + 5 : -window.outerWidth - 5;
  // },
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  // exit: (index: number) => {
  //   x: index++ ? -window.outerWidth - 5 : window.outerWidth + 5;
  // },
  exit: {
    x: -window.outerWidth - 5,
  },
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

export default Row;
