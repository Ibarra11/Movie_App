import type { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { TrendingMovie, ProtectedPage, isTrendingMovie } from "../types";
import { GetBookmarkedMoviesQueryHookResult } from "../types/apollo-generated";
import { Movie } from "@prisma/client";
import Nav from "../components/Nav";
import Input from "../components/Input";
import TrendingRow from "../components/TrendingRow";
import MovieGrid from "../components/MovieGrid";
type Result = GetBookmarkedMoviesQueryHookResult["fetchMore"];

const Home: ProtectedPage<{
  allFilms: Movie[];
  trendingFilms: TrendingMovie[];
  nonTrendingFilms: Movie[];
  searchValue: string;
}> = ({ allFilms, trendingFilms, nonTrendingFilms, searchValue }) => {
  return (
    <div>
      {/* <TrendingRow
          bookmarkedMovieIds={bookm darkedMovieIds}
          trendingMovies={trendingMovies}
        /> */}
      <MovieGrid
        searchValue={searchValue}
        title="Recommended for you"
        films={searchValue !== "" ? allFilms : nonTrendingFilms}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const trendingFilms = allFilms.filter(isTrendingMovie);
  const nonTrendingFilms = allFilms.filter((film) => !isTrendingMovie(film));
  return {
    props: {
      allFilms,
      trendingFilms,
      nonTrendingFilms,
    },
  };
};
Home.protected = true;
export default Home;
