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
  regularFilms: Movie[];
  searchValue: string;
}> = ({ allFilms, trendingFilms, regularFilms, searchValue }) => {
  return (
    <div>
      {/* <TrendingRow
          bookmarkedMovieIds={bookm darkedMovieIds}
          trendingMovies={trendingMovies}
        /> */}
      <MovieGrid
        searchValue={searchValue}
        title="Recommended for you"
        nonTrendingFilms={regularFilms}
        allFilms={allFilms}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const trendingFilms = allFilms.filter(isTrendingMovie);
  const regularFilms = allFilms.filter((film) => !isTrendingMovie(film));
  return {
    props: {
      allFilms,
      trendingFilms,
      regularFilms,
    },
  };
};
Home.protected = true;
export default Home;
