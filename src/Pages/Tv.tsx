import { useQuery } from "react-query";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import { IGetMoviesResult } from "../typing";
import { PopularTv, TopRatedTv } from "../utils/api";

const kind = "tv";
const firstRow = 0;
const secondRow = 1;

const LIST_TYPE = ["PopularTvShows", "TopRatedTvShows"];

function Tv() {
  const { isLoading, data: popularTv } = useQuery<IGetMoviesResult>(
    ["TvShows", LIST_TYPE[0]],
    PopularTv
  );

  const { data: topRatedTv } = useQuery<IGetMoviesResult>(
    ["TvShows", LIST_TYPE[1]],
    TopRatedTv
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <span>Loading ...</span>
        </Loader>
      ) : (
        <>
          <Banner nowPlaying={popularTv} listType={LIST_TYPE[0]} kind={kind} />
          <Row
            rowIndex={firstRow}
            title={"Trending Now"}
            data={popularTv}
            listType={LIST_TYPE[0]}
            kind={kind}
          />
          <Row
            rowIndex={secondRow}
            title={"Top Rated"}
            data={topRatedTv}
            listType={LIST_TYPE[1]}
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

export default Tv;
