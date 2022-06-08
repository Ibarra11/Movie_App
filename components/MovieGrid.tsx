import Thumbnail from "./Thumbnail";
import { Movie } from "@prisma/client";
import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import { GetBookmarkedMoviesQueryHookResult } from "../types/apollo-generated";

import { ReactElement } from "react";

const MovieGrid: (props: {
  movies: Movie[];
  title: string;
}) => ReactElement = ({ movies, title }) => {
  const { data, loading, refetch } = useGetBookmarkedMoviesQuery();
  let bookmarkedMovieIds: { [key: string]: true } = {};
  if (data) {
    const { getBookmarkedMovies } = data;
    getBookmarkedMovies.forEach(({ id }) => {
      bookmarkedMovieIds[id] = true;
    });
  }
  return (
    <>
      <h4 className="text-white">{title}</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8   ">
        {movies.map((movie) => {
          const { id } = movie;
          return (
            <Thumbnail
              key={movie.title}
              {...movie}
              isBookmarked={bookmarkedMovieIds[id]}
            />
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
