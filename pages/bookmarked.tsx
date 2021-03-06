import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import MovieGrid from "../components/MovieGrid";
import EmptyBookmark from "../components/EmptyBookmark";
import { Movie } from "../types/apollo-generated";
import type { ProtectedPage, MovieType, BookmarkedMovieIds } from "../types";

function getBookmarksByType(
  type: "Movie" | "TV Series",
  data: Movie[] | undefined
): MovieType[] {
  return (
    data
      ? data
          .filter(({ category }) => category === type)
          .map((movie) => ({ ...movie, isBookmarked: true }))
      : []
  ) as MovieType[];
}

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
  let bookmarkedMovieIds: BookmarkedMovieIds = {};
  if (data) {
    data.getBookmarkedMovies.forEach((movie) => {
      bookmarkedMovieIds[movie.id] = true;
    });
  }
  const bookmarkedMovies = getBookmarksByType(
    "Movie",
    data?.getBookmarkedMovies
  );

  const bookmarkedTvSeries = getBookmarksByType(
    "TV Series",
    data?.getBookmarkedMovies
  );

  return (
    <div className="space-y-3">
      <div className="relative min-h-[320px] text-white">
        {/* Bookmarked Movies */}
        {bookmarkedMovies.length > 0 ? (
          <MovieGrid
            title="Bookmarked Movies"
            searchValue={searchValue}
            bookmarkedMovieIds={bookmarkedMovieIds}
            films={bookmarkedMovies}
          />
        ) : (
          <EmptyBookmark text="Movie" />
        )}
      </div>
      <div className="relative  min-h-[320px] text-white">
        {/* Bookmarked Tv Series */}
        {bookmarkedTvSeries.length > 0 ? (
          <MovieGrid
            title="Bookmarked TV Series"
            searchValue={searchValue}
            bookmarkedMovieIds={bookmarkedMovieIds}
            films={bookmarkedTvSeries}
          />
        ) : (
          <EmptyBookmark text="TV Series" />
        )}
      </div>
    </div>
  );
};

BookMarked.protected = true;

export default BookMarked;
