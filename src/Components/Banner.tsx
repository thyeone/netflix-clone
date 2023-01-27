import styled from "styled-components";
import { IGetMoviesResult } from "../typing";
import { makeImagePath } from "../utils/utils";

interface IProps {
  nowPlaying?: IGetMoviesResult;
}

function Banner({ nowPlaying }: IProps) {
  return (
    <Wrapper
      bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
    >
      <Title>{nowPlaying?.results[0].original_title}</Title>
      <Overview>{nowPlaying?.results[0].overview}</Overview>
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
`;

const Title = styled.h2`
  font-size: 72px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 30px;
  width: 50%;
`;

export default Banner;
