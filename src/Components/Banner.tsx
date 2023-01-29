import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";
import Modal from "./Modal";

interface IProps {
  nowPlaying?: IGetMoviesResult;
  listType: string;
  kind: string;
}

function Banner({ nowPlaying, listType, kind }: IProps) {
  const navigate = useNavigate();
  const movieMatch = useMatch(`${kind}/${listType}/:id`);

  const onBoxClicked = (id?: number, listType?: string) => {
    navigate(`/${kind}/${listType}/${id}`);
  };
  return (
    <Wrapper
      bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
    >
      <div className="top">
        <Title>
          {nowPlaying?.results[0].original_title ||
            nowPlaying?.results[0].original_name}
        </Title>
        <Overview>
          {nowPlaying && nowPlaying?.results[0].overview.length > 160
            ? nowPlaying?.results[0].overview.slice(0, 160) + "..."
            : nowPlaying?.results[0].overview}
        </Overview>
        <div className="button">
          <PlayButton>
            <svg
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
            onClick={() => onBoxClicked(nowPlaying?.results[0].id, listType)}
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
            movieId={Number(movieMatch?.params.id)}
            listType={listType || ""}
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
  padding: 3.75rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
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
  @media screen and (max-width: 1023px) {
    background-position: center top;
    max-height: 70vh;
  }
  @media screen and (max-width: 767px) {
    min-height: 60vh;
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  @media screen and (max-width: 1023px) {
    font-size: 2.25rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Overview = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.8rem;
  max-width: 36rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.125rem;
    line-height: 1.6rem;
    max-width: 28rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
    line-height: 1.25rem;
    max-width: 21rem;
  }
`;

const PlayButton = styled.button`
  width: 8.5rem;
  height: 3.25rem;
  background-color: #fff;
  color: #000;
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
    width: 1.5rem;
    height: 1.75rem;
    stroke: #000;
    fill: #000;
  }
  @media screen and (max-width: 1023px) {
    width: 8.625rem;
    height: 3.25rem;
  }
  @media screen and (max-width: 767px) {
    width: 5.7rem;
    height: 2rem;
    font-size: 0.9rem;
    svg {
      min-width: 1rem;
      min-height: 1rem;
    }
  }
`;

const MoreInfo = styled(PlayButton)`
  width: 12.5rem;
  background-color: #808080b2;
  color: ${(props) => props.theme.white.lighter};
  white-space: nowrap;
  :hover {
    background-color: #515151;
    transition-duration: 0.15s;
  }
  svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: white;
    stroke: none;
  }
  @media screen and (max-width: 1023px) {
    width: 11.8rem;
    height: 3.25rem;
  }
  @media screen and (max-width: 767px) {
    width: 8.18rem;
    height: 2rem;
    font-size: 0.85rem;
    svg {
      min-width: 1rem;
      min-height: 1rem;
    }
  }
`;

export default Banner;
