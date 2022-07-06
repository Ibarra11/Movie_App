import { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import MovieGrid from "../components/MovieGrid";
import { MovieType, ProtectedPage, BookmarkedMovieIds } from "../types";
import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
const TvSeries: ProtectedPage<{
  tvSeries: MovieType[];
  searchValue: string;
}> = ({ tvSeries, searchValue }) => {
  const { data, loading, error } = useGetBookmarkedMoviesQuery();
  let bookmarkedMovieIds: BookmarkedMovieIds = {};
  if (data) {
    data.getBookmarkedMovies.forEach((movie) => {
      bookmarkedMovieIds[movie.id] = true;
    });
  }
  return (
    <div className="relative flex-1 text-[32px] text-white ">
      <MovieGrid
        searchValue={searchValue}
        bookmarkedMovieIds={bookmarkedMovieIds}
        films={tvSeries}
        title="TV Series"
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const tvSeries = allFilms.filter(({ category }) => category === "TV Series");
  return {
    props: {
      tvSeries,
    },
  };
};
TvSeries.protected = true;
export default TvSeries;
