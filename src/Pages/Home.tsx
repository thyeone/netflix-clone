import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { rowState } from "../Atoms/atoms";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import { IGetMoviesResult } from "../typing";
import { NowPlaying, PopularMovies, TopRatedMovies } from "../utils/api";

const kind = "movie";
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;

const LIST_TYPE = ["NowPlaying", "PopularMovies", "TopRatedMovies"];

function Home() {
  const row = useRecoilValue(rowState);
  const { isLoading, data: nowPlaying } = useQuery<IGetMoviesResult>(
    ["movies", LIST_TYPE[0]],
    NowPlaying
  );
  const { data: popularMovies } = useQuery<IGetMoviesResult>(
    ["movies", LIST_TYPE[1]],
    PopularMovies
  );
  const { data: topRatedMovies } = useQuery<IGetMoviesResult>(
    ["movies", LIST_TYPE[2]],
    TopRatedMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <span>Loading ...</span>
        </Loader>
      ) : (
        <>
          <Banner nowPlaying={nowPlaying} listType={LIST_TYPE[0]} kind={kind} />
          <Row
            rowIndex={firstRow}
            title={"Now Playing"}
            data={nowPlaying}
            listType={LIST_TYPE[0]}
            kind={kind}
          />
          <Row
            rowIndex={secondRow}
            title={"Trending Now"}
            data={popularMovies}
            listType={LIST_TYPE[1]}
            kind={kind}
          />
          <Row
            rowIndex={thirdRow}
            title={"Top Rated"}
            data={topRatedMovies}
            listType={LIST_TYPE[2]}
            kind={kind}
          />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #000;
`;

const Loader = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
  }
`;

export default Home;
