import type { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import type { TrendingMovie } from "../types";
import { Movie } from "@prisma/client";
import Nav from "../components/Nav";
import Input from "../components/Input";
import TrendingRow from "../components/TrendingRow";
import MovieGrid from "../components/MovieGrid";

const Home: NextPage<{
  trendingMovies: TrendingMovie[];
  regularMovies: Movie[];
}> = ({ trendingMovies, regularMovies }) => {
  const { data, loading } = useGetBookmarkedMoviesQuery();

  return (
    <div className="h-full flex flex-col gap-6 md:gap-9 xl:flex-row xl:gap-9 ">
      <Nav />
      <div className="border-4 flex flex-col gap-6 px-4 border-red flex-1 md:px-6">
        <Input />
        <TrendingRow bookmarkedMovies={data} trendingMovies={trendingMovies} />
        <MovieGrid bookmarkedMovies={data} movies={regularMovies} />
      </div>
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
