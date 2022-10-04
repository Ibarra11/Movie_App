import Thumbnail from "./Thumbnail";
import { useSearch } from "../lib/useSearch";
import { BeatLoader } from "react-spinners";
import { MovieType, BookmarkedMovieIds } from "../types";
import { ReactElement } from "react";

const MovieGrid: (props: {
  films: MovieType[];
  searchValue: string;
  bookmarkedMovieIds: BookmarkedMovieIds;
  title:
    | "Recommended for you"
    | "Movies"
    | "TV Series"
    | "Bookmarked Movies"
    | "Bookmarked TV Series";
}) => ReactElement = ({ films, searchValue, bookmarkedMovieIds, title }) => {
  const [filteredFilms, isSearching] = useSearch<MovieType>(
    films,
    searchValue,
    "title"
  );

  const searchState = searchValue !== "";
  const titleToDisplay = searchState
    ? `Found ${filteredFilms.length} result${
        filteredFilms.length > 1 ? "s" : ""
      } for '${searchValue}' in ${
        title === "Recommended for you" ? "All Films" : title
      }`
    : title;

  return isSearching ? (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
      <h3 className="text-[32px] mb-8">{`Searching ${
        title === "Recommended for you" ? "All Films" : title
      }`}</h3>
      <BeatLoader color="white" size={48} />
    </div>
  ) : (
    <>
      <h3 className="text-[32px] mb-8">{titleToDisplay}</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8   ">
        {filteredFilms.map((movie) => {
          const isBookmarked = bookmarkedMovieIds[movie.id] ? true : false;
          return (
            <Thumbnail
              key={movie.title}
              {...movie}
              isBookmarked={isBookmarked}
            />
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
