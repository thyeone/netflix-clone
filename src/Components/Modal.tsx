import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Element, IMovieDetail } from "../typing";
import { GetMovieDetail, GetTvDetail } from "../utils/api";

interface IProps {
  movieMatch: PathMatch<"id">;
  movieId: number;
  listType: string;
  kind?: string;
}

const API_KEY = "ba621a4e36b9c325838cdc6720823931";
const BASE_PATH = "https://api.themoviedb.org/3/";

function Modal({ movieId, listType, kind }: IProps) {
  const [trailer, setTrailer] = useState("");
  const { data: movieDetail } = useQuery<IMovieDetail>(
    ["movie", listType],
    () => GetMovieDetail(movieId)
  );

  const { data: tvDetail } = useQuery<IMovieDetail>(["tv", listType], () =>
    GetTvDetail(movieId)
  );

  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };

  const getMovieVideo = async () => {
    const data = await axios(
      `${BASE_PATH}${kind}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    ).then((response) => response.data);
    if (data) {
      const index = data?.results.findIndex(
        (element: Element) => element.type === "Trailer"
      );
      setTrailer(data?.results[index]?.key);
    }
  };

  const getTvVideo = async () => {
    const data = await axios(
      `${BASE_PATH}${kind}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    ).then((response) => response.data);
    if (data) {
      const index = data?.results.findIndex(
        (element: Element) => element.type === "Trailer"
      );
      setTrailer(data?.results[index]?.key);
    }
  };

  useEffect(() => {
    kind === "movie" ? getMovieVideo() : getTvVideo();
  }, []);

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
            {trailer === "" ? (
              <span className="no-video">
                The movie doesn't have a YouTube video.
              </span>
            ) : (
              <MovieYouTube>
                <ReactPlayer
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/embed/${trailer}`}
                  playing={true}
                  muted={true}
                />
              </MovieYouTube>
            )}
            {kind === "movie" ? (
              <MovieContents>
                <div className="top-contents">
                  <span className="vote_average">
                    {Math.floor(movieDetail?.vote_average * 10)}% Match
                  </span>
                  <span className="release_date">
                    {movieDetail?.release_date}
                  </span>
                  <span className="hd">HD</span>
                </div>
                <div className="space-between-contents">
                  <p className="detail_overview">{movieDetail?.overview}</p>
                  <div className="right-contents">
                    <div>
                      <span className="gray">Genres:</span>{" "}
                      {movieDetail?.genres
                        .map((genres) => genres.name)
                        .join(", ")}
                    </div>
                    <div>
                      <span className="gray">Original language:</span>{" "}
                      {movieDetail?.original_language}
                    </div>
                    <div>
                      <span className="gray">Total Votes:</span>{" "}
                      {movieDetail?.vote_count}
                    </div>
                  </div>
                </div>
              </MovieContents>
            ) : (
              <MovieContents>
                <div className="top-contents">
                  <span className="vote_average">
                    {Math.floor(tvDetail?.vote_average * 10)}% Match
                  </span>
                  <span className="release_date">{tvDetail?.release_date}</span>
                  <span className="hd">HD</span>
                </div>
                <div className="space-between-contents">
                  <p className="detail_overview">{tvDetail?.overview}</p>
                  <div className="right-contents">
                    <div>
                      <span className="gray">Genres:</span>{" "}
                      {tvDetail?.genres.map((genres) => genres.name).join(", ")}
                    </div>
                    <div>
                      <span className="gray">Original language:</span>{" "}
                      {tvDetail?.original_language}
                    </div>
                    <div>
                      <span className="gray">Total Votes:</span>{" "}
                      {tvDetail?.vote_count}
                    </div>
                  </div>
                </div>
              </MovieContents>
            )}
          </>
        }
      </MovieDetail>
    </>
  );
}

const MovieYouTube = styled.div`
  width: 100%;
  height: 70%;
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
  width: 70vw;
  height: 95vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 6px;
  overflow-y: scroll;
  z-index: 999;
  background-color: ${(props) => props.theme.black.darker};
  .no-video {
    /* position: absolute; */
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MovieContents = styled.div`
  position: absolute;
  padding-left: 40px;
  .top-contents {
    margin: 30px 0;
  }

  .space-between-contents {
    display: flex;
    flex-direction: row;
  }
  .right-contents {
    margin: -10px 10px 0 50px;
    line-height: 30px;
  }
  .release_date {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 300;
  }
  .vote_average {
    color: #4ade80;
    font-weight: 600;
  }
  .hd {
    margin-left: 8px;
    padding: 0px 6px;
    background-color: ${(props) => props.theme.black.darker};
    border-radius: 5px;
    border: 1px solid white;
    font-size: 13px;
  }
  .detail_overview {
    width: 65%;
    color: ${(props) => props.theme.white.lighter};
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
    line-height: 25px;
  }
  .gray {
    color: #808080;
    font-size: 14px;
    margin: 10px 0;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};

export default Modal;
