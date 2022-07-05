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
    <div>
      <h3 className="text-[32px] text-white mb-8">TV Series</h3>
      <MovieGrid
        searchValue={searchValue}
        bookmarkedMovieIds={bookmarkedMovieIds}
        films={tvSeries}
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
