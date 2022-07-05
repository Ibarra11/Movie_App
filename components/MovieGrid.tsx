import Thumbnail from "./Thumbnail";
import { useSearch } from "../lib/useSearch";
import { Movie } from "../graphql/generated-types";
import { RefetchQueriesFunction, useQuery } from "@apollo/client";
import {
  useGetBookmarkedMoviesQuery,
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
} from "../types/apollo-generated";
import { MovieType, BookmarkedMovieIds } from "../types";
import { ReactElement } from "react";

const MovieGrid: (props: {
  films: MovieType[];
  searchValue: string;
  bookmarkedMovieIds: BookmarkedMovieIds;
}) => ReactElement = ({ films, searchValue, bookmarkedMovieIds }) => {
  const [filteredFilms, isSearching] = useSearch<MovieType>(
    films,
    searchValue,
    "title"
  );
  const searchState = searchValue !== "";
  const titleToDisplay =
    searchState && `Found ${filteredFilms.length} results for '${searchValue}'`;

  const [handleRemoveBookmark, { loading: removeBookmarkLoading }] =
    useRemoveBookmarkMutation();

  const [handleAddBookmark, { loading: addBookmarkLoading }] =
    useAddBookmarkMutation();

  return isSearching ? (
    <p>loading</p>
  ) : (
    <>
      <h4 className="text-white">{titleToDisplay}</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8   ">
        {filteredFilms.map((movie) => {
          const isBookmarked = bookmarkedMovieIds[movie.id] ? true : false;
          console.log(bookmarkedMovieIds);
          return (
            <Thumbnail
              key={movie.title}
              {...movie}
              isBookmarked={isBookmarked}
              onBookmarkMutation={
                isBookmarked ? handleRemoveBookmark : handleAddBookmark
              }
              loadingMutation={
                isBookmarked ? removeBookmarkLoading : addBookmarkLoading
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
