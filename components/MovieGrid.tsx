import Thumbnail from "./Thumbnail";
import { Movie } from "@prisma/client";
import { GetBookmarkedMoviesQueryHookResult } from "../types/apollo-generated";

import { ReactElement } from "react";

const MovieGrid: (props: {
  movies: Movie[];
  bookmarkedMovieIds: { [key: string]: true };
  onBookmark: GetBookmarkedMoviesQueryHookResult["refetch"];
}) => ReactElement = ({ movies, bookmarkedMovieIds, onBookmark }) => {
  return (
    <div className="border-2 border-white">
      <h4 className="text-white mb-4">Recommended for you</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8   ">
        {movies.map((movie) => {
          const { id } = movie;
          return (
            <Thumbnail
              key={movie.title}
              {...movie}
              isBookmarked={bookmarkedMovieIds[id]}
              onBookmark={onBookmark}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieGrid;
