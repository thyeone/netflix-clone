import { useQuery } from "react-query";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import { IGetMoviesResult } from "../typing";
import { NowPlaying, PopularMovies, TopRatedMovies } from "../utils/api";

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;

const LIST_TYPE = ["nowPlaying", "popularMovies", "topRatedMovies"];

function Home() {
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
          <Banner nowPlaying={nowPlaying} />
          <Row
            rowIndex={firstRow}
            title={"Now Playing"}
            data={nowPlaying}
            listType={LIST_TYPE[0]}
          />
          <Row
            rowIndex={secondRow}
            title={"Trending Now"}
            data={popularMovies}
            listType={LIST_TYPE[1]}
          />
          <Row
            rowIndex={thirdRow}
            title={"Top Rated"}
            data={topRatedMovies}
            listType={LIST_TYPE[2]}
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
