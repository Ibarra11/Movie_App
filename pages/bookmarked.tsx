import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "@prisma/client";
import type { ProtectedPage } from "../types";

const BookMarked: ProtectedPage<{ searchValue: string }> = ({
  searchValue,
}) => {
  const { data, loading, error } = useGetBookmarkedMoviesQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const bookmarkedMovies = data
    ? (data.getBookmarkedMovies.filter(
        ({ category }) => category === "Movie"
      ) as Movie[])
    : ([] as Movie[]);
  const bookmarkedTvSeries = data
    ? (data.getBookmarkedMovies.filter(
        ({ category }) => category === "TV Series"
      ) as Movie[])
    : ([] as Movie[]);

  return (
    <div className="flex flex-col xl:gap-10 ">
      <MovieGrid
        searchValue={searchValue}
        films={bookmarkedMovies}
        title="Bookmarked Movies"
      />
      <MovieGrid
        searchValue={searchValue}
        films={bookmarkedTvSeries}
        title="Bookmarked TV Series"
      />
    </div>
  );
};

BookMarked.protected = true;

export default BookMarked;
