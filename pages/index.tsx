import type { GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import { TrendingMovie, ProtectedPage, isTrendingMovie } from "../types";
import { MovieType, BookmarkedMovieIds } from "../types";
import TrendingRow from "../components/TrendingRow";
import MovieGrid from "../components/MovieGrid";

const Home: ProtectedPage<{
  allFilms: MovieType[];
  trendingFilms: TrendingMovie[];
  nonTrendingFilms: MovieType[];
  searchValue: string;
}> = ({ allFilms, trendingFilms, nonTrendingFilms, searchValue }) => {
  const { data, loading, error } = useGetBookmarkedMoviesQuery();
  let bookmarkedMovieIds: BookmarkedMovieIds = {};
  if (data) {
    data.getBookmarkedMovies.forEach((movie) => {
      bookmarkedMovieIds[movie.id] = true;
    });
  }

  return (
    <div>
      {/* <TrendingRow
          bookmarkedMovieIds={bookm darkedMovieIds}
          trendingMovies={trendingMovies}
        /> */}
      <div className="text-[32px] text-white ">
        <h3 className=" mb-8">Recommended for you</h3>
        <MovieGrid
          bookmarkedMovieIds={bookmarkedMovieIds}
          searchValue={searchValue}
          films={searchValue !== "" ? allFilms : nonTrendingFilms}
        />
      </div>
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
