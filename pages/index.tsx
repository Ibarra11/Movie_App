import type { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";

import type { TrendingMovie } from "../types";
import { GetBookmarkedMoviesQueryHookResult } from "../types/apollo-generated";
import { Movie } from "@prisma/client";
import Nav from "../components/Nav";
import Input from "../components/Input";
import TrendingRow from "../components/TrendingRow";
import MovieGrid from "../components/MovieGrid";

type Result = GetBookmarkedMoviesQueryHookResult["fetchMore"];

const Home: NextPage<{
  trendingMovies: TrendingMovie[];
  regularMovies: Movie[];
}> = ({ trendingMovies, regularMovies }) => {
  return (
    <div>
      {/* <TrendingRow
          bookmarkedMovieIds={bookmarkedMovieIds}
          trendingMovies={trendingMovies}
        /> */}
      <MovieGrid title="Recommended for you2" movies={regularMovies} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  function isTrendingMovie(movie: Movie): movie is TrendingMovie {
    return movie.isTrending;
  }
  const movies = await prisma.movie.findMany();
  const trendingMovies = movies.filter(isTrendingMovie);
  const regularMovies = movies.filter((movie) => !movie.isTrending);
  return {
    props: {
      trendingMovies,
      regularMovies,
      protected: true,
    },
  };
};

export default Home;
