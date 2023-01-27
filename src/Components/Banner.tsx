import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";
import Modal from "./Modal";

interface IProps {
  nowPlaying?: IGetMoviesResult;
}

function Banner({ nowPlaying }: IProps) {
  const navigate = useNavigate();
  const movieMatch = useMatch(`/:listType/:id`);

  const onBoxClicked = (id?: number, listType?: string) => {
    navigate(`/${listType}/${id}`);
  };
  return (
    <Wrapper
      bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
    >
      <div className="top">
        <Title>{nowPlaying?.results[0].original_title}</Title>
        <Overview>
          {nowPlaying && nowPlaying?.results[0].overview.length > 160
            ? nowPlaying?.results[0].overview.slice(0, 160) + "..."
            : nowPlaying?.results[0].overview}
        </Overview>
        <div className="button">
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
          <MoreInfo
            onClick={() =>
              onBoxClicked(
                nowPlaying?.results[0].id,
                nowPlaying?.results[0].media_type
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
            More Info
          </MoreInfo>
        </div>
      </div>
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

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  .top {
    position: relative;
    top: -50px;
  }
  .button {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    margin-top: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 72px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.8rem;
  width: 50%;
`;

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

const MoreInfo = styled(PlayButton)`
  width: 12.5rem;
  background-color: #808080b2;
  color: ${(props) => props.theme.white.lighter};
  :hover {
    background-color: #515151;
    transition-duration: 0.15s;
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default Banner;
