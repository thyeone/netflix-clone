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
            {trailer === "" || trailer === undefined ? (
              <span className="no-video">
                The movie doesn't have a YouTube video.
              </span>
            ) : (
              <>
                <CloseButton onClick={onOverlayClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </CloseButton>
                <MovieYouTube>
                  <ReactPlayer
                    className="react-player"
                    width="100%"
                    height="100%"
                    url={`https://www.youtube.com/embed/${trailer}`}
                    playing={true}
                    muted={true}
                  />
                  <div className="modal-buttons">
                    <div className="left-buttons">
                      <PlayButton>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>
                        Play
                      </PlayButton>
                      <AddButton>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          ></path>
                        </svg>
                      </AddButton>
                      <LikeButton>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          ></path>
                        </svg>
                      </LikeButton>
                    </div>
                    <VolumeButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                        ></path>
                      </svg>
                    </VolumeButton>
                  </div>
                </MovieYouTube>
              </>
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

const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 9999px;
  border: none;
  width: 36px;
  height: 36px;
  margin-left: 10px;
  cursor: pointer;

  svg {
    color: white;
  }
`;

const CloseButton = styled(ModalButton)`
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px 20px 0 0;
`;

const AddButton = styled(ModalButton)`
  width: 2.75rem;
  height: 2.75rem;
  border: 2px solid gray;
  :hover {
    border: 2px solid #e5e7eb;
    transition: 0.3s;
  }
`;

const LikeButton = styled(AddButton)``;

const VolumeButton = styled(AddButton)``;

const PlayButton = styled.button`
  width: 8.5rem;
  height: 52px;
  background-color: #fff;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  padding: 10px 32px;
  font-weight: 600;
  font-size: 1.3rem;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #cbcbcb;
    transition: all 0.5s ease;
  }
  svg {
    width: 24.5px;
    height: 28px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
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
  @media screen and (min-width: 1920px) {
    width: 55vw;
    height: 90vh;
  }
  .no-video {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-buttons {
    position: relative;
    top: -90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 2.5rem;
  }
  .left-buttons {
    display: flex;
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
