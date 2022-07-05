import { GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import MovieGrid from "../components/MovieGrid";
import { ProtectedPage, BookmarkedMovieIds, MovieType } from "../types";
const Movies: ProtectedPage<{
  movies: MovieType[];
  searchValue: string;
}> = ({ movies, searchValue }) => {
  const { data, loading, error } = useGetBookmarkedMoviesQuery();
  let bookmarkedMovieIds: BookmarkedMovieIds = {};
  if (data) {
    data.getBookmarkedMovies.forEach((movie) => {
      bookmarkedMovieIds[movie.id] = true;
    });
  }
  return (
    <div>
      <h3 className="text-[32px] text-white mb-8">Movies</h3>
      <MovieGrid
        bookmarkedMovieIds={bookmarkedMovieIds}
        films={movies}
        searchValue={searchValue}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const films = await prisma.movie.findMany();
  const movies = films.filter((movie) => movie.category === "Movie");
  return {
    props: {
      movies,
    },
  };
};

Movies.protected = true;

export default Movies;
