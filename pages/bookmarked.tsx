import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import MovieGrid from "../components/MovieGrid";
import EmptyBookmark from "../components/EmptyBookmark";
import { Movie } from "../types/apollo-generated";
import type { ProtectedPage } from "../types";
import type { MovieType } from "../components/MovieGrid";

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
  const { data, loading, error, refetch } = useGetBookmarkedMoviesQuery();

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
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
    <div className=" space-y-3">
      <div className="relative min-h-[320px]   flex flex-col gap-9 ">
        {/* Bookmarked Movies */}
        <h3 className=" text-[32px] text-white ">Bookmarked Movies</h3>
        {bookmarkedMovies.length > 0 ? (
          <MovieGrid searchValue={searchValue} films={bookmarkedMovies} />
        ) : (
          <EmptyBookmark text="Movie" />
        )}
      </div>
      <div className="relative  min-h-[320px]   flex flex-col gap-9 ">
        {/* Bookmarked Tv Series */}
        <h3 className=" text-[32px] text-white ">Bookmarked TV Series</h3>
        {bookmarkedTvSeries.length > 0 ? (
          <MovieGrid searchValue={searchValue} films={bookmarkedTvSeries} />
        ) : (
          <EmptyBookmark text="TV Series" />
        )}
      </div>
    </div>
  );
};

BookMarked.protected = true;

export default BookMarked;
