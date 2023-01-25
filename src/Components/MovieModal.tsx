import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovieDetail } from "../typing";
import { GetMovieDetail } from "../utils/api";
import { makeImagePath } from "../utils/utils";

interface IProps {
  movieMatch: PathMatch<"id">;
  movieId: number;
  listType: string;
  rowIndex: number;
}

function MovieModal({ movieMatch, movieId, listType, rowIndex }: IProps) {
  const { data } = useQuery<IMovieDetail>(["movie"], () =>
    GetMovieDetail(movieId)
  );
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Overlay
        variants={overlayVariants}
        onClick={onOverlayClick}
        initial="hidden"
        exit="exit"
        animate="visible"
      />
      <MovieDetail layoutId={movieId + listType}>
        {
          <>
            <div
              className="detail_image"
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  data?.backdrop_path || "",
                  "w500"
                )})`,
              }}
            />
            <h3 className="detail_title">{data?.title}</h3>
            <p className="detail_overview">{data?.overview}</p>
          </>
        }
      </MovieDetail>
    </>
  );
}

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

export default MovieModal;
