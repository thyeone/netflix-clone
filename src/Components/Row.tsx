import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";

const offset = 6;

interface IProps {
  index: number;
  toggleLeaving: any;
  data?: IGetMoviesResult;
  onBoxClicked: any;
}

function Row({ index, toggleLeaving, data, onBoxClicked }: IProps) {
  return (
    <Wrapper>
      <SilderTitle>Now Playing</SilderTitle>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Slider
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset - 1)
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

const Wrapper = styled.div`
  position: relative;
  top: -160px;
  @media screen and (min-width: 1920px) {
    top: -250px;
  }
`;

const SilderTitle = styled.h2`
  font-size: 26px;
  padding-bottom: 15px;
  font-weight: 600;
  margin-left: 50px;
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
