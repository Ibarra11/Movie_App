import Thumbnail from "./Thumbnail";
import { useSearch } from "../lib/useSearch";
import { Movie } from "../graphql/generated-types";
import { RefetchQueriesFunction } from "@apollo/client";
import {
  useGetBookmarkedMoviesQuery,
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
} from "../types/apollo-generated";

import { ReactElement } from "react";

export type MovieType = Movie & { isBookmarked: boolean };

// function getFilmsByType(
//   films: (Movie & isBookmarked: boolean)[],
//   filmType: "allFilms" | "movies" | "tvSeries"
// ): Movie[] {
//   if (filmType === "movies") {
//     return films.filter(({ category, isTrending }) => {
//       return category === "Movie";
//     });
//   } else if (filmType === "tvSeries") {
//     return films.filter(({ category, isTrending }) => {
//       return category === "Tv Series";
//     });
//   } else {
//     return films.filter(({ isTrending }) => !isTrending);
//   }
// }

const MovieGrid: (props: {
  films: MovieType[];
  title: string;
  searchValue: string;
}) => ReactElement = ({ films, title, searchValue }) => {
  const [filteredFilms, isSearching] = useSearch<MovieType>(
    films,
    searchValue,
    "title"
  );
  const searchState = searchValue !== "";
  const titleToDisplay = searchState
    ? `Found ${filteredFilms.length} results for '${searchValue}'`
    : title;
  const [handleRemoveBookmark, { loading: removeBookmarkLoading }] =
    useRemoveBookmarkMutation();
  const [handleAddBookmark, { loading: addBookmarkLoading }] =
    useAddBookmarkMutation();

  let bookmarkedMovieIds: { [key: string]: true } = {};

  // if (data) {
  //   const { getBookmarkedMovies } = data;
  //   getBookmarkedMovies.forEach(({ id }) => {
  //     bookmarkedMovieIds[id] = true;
  //   });
  // }
  return isSearching ? (
    <p>loading</p>
  ) : (
    <>
      <h4 className="text-white">{titleToDisplay}</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8   ">
        {filteredFilms.map((movie) => {
          const { id } = movie;
          const isBookmarked = bookmarkedMovieIds[id];
          return (
            <Thumbnail
              key={movie.title}
              {...movie}
              isBookmarked={movie.isBookmarked}
              onBookmarkMutation={
                movie.isBookmarked ? handleRemoveBookmark : handleAddBookmark
              }
              loadingMutation={
                movie.isBookmarked ? removeBookmarkLoading : addBookmarkLoading
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
