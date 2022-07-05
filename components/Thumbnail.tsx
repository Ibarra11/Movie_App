import Image from "next/image";
import { useState } from "react";
import { Movie } from "../graphql/generated-types";
import { GetBookmarkedMoviesDocument } from "../types/apollo-generated";
import { BsFillPlayFill } from "react-icons/bs";
import {
  RemoveBookmarkMutationFn,
  AddBookmarkMutationFn,
} from "../types/apollo-generated";
import movie_icon from "/public/icons/icon-category-movie.svg";
import icon_bookmark_empty from "/public/icons/icon-bookmark-empty.svg";
import icon_bookmark_full from "/public/icons/icon-bookmark-full.svg";
const Thumbnail = ({
  id,
  title,
  year,
  category,
  rating,
  isBookmarked,
  regular_sm,
  regular_md,
  regular_lg,
  onBookmarkMutation,
  loadingMutation,
}: Movie & {
  isBookmarked: boolean;
  onBookmarkMutation: RemoveBookmarkMutationFn | AddBookmarkMutationFn;
  loadingMutation: boolean;
}) => {
  return (
    <div className="space-y-2  ">
      <div className="group relative   w-full aspect-video hover:cursor-pointer rounded-lg overflow-hidden">
        {/* overlay */}
        <div className="absolute bg-black opacity-0 duration-200 z-10  h-full w-full   group-hover:opacity-50 group-hover:duration-400 "></div>{" "}
        ``
        {/* Play button */}
        <div
          className=" absolute opacity-0 z-10 w-32 h-12 flex items-center justify-center gap-5 inset-0 m-auto rounded-3xl overflow-hidden 
                    group-hover:opacity-100 group-hover:delay-400  "
        >
          <div className="absolute -z-10 w-full h-full bg-play opacity-25 "></div>
          <div className=" relative grid text-2xl place-content-center w-8 h-8 rounded-full overflow-hidden">
            <div className="absolute w-full h-full bg-white -z-10 "></div>
            <BsFillPlayFill color="black" />
          </div>
          <p className="text-lg text-white font-medium">Play</p>
        </div>
        {/* bookmark icon */}
        <div
          className=" bookmark-icon-container absolute grid place-content-center z-10 top-2 right-2 h-8 w-8  bg-darkBlue/50 rounded-full hover:bg-white hover:duration-200"
          onClick={async () => {
            // just to ensure that only one request is made at a time.
            if (!loadingMutation) {
              onBookmarkMutation({
                variables: { movieId: id },
                refetchQueries: [{ query: GetBookmarkedMoviesDocument }],
              });
            }
          }}
        >
          <Image
            src={isBookmarked ? icon_bookmark_full : icon_bookmark_empty}
            layout="fixed"
            width={12}
            height={14}
            alt="bookmark icon"
            className="filter-bookmark-icon"
          />
        </div>
        <div className="md:hidden">
          <Image
            layout="fill"
            src={regular_sm}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
        <div className="hidden md:block lg:hidden">
          <Image
            layout="fill"
            src={regular_md}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
        <div className="hidden lg:block ">
          <Image
            layout="fill"
            src={regular_lg}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
      </div>
      <div className=" space-y-1">
        <div className="flex items-center text-slate-300 text-xs ">
          <p className="lg:text-xs">{year}</p>
          <span className="h-0.5 w-0.5 bg-slate-300 mx-2 rounded-full"></span>
          <div className="flex gap-2 items-center ">
            <div className=" relative w-[10px] h-[10px] lg:w-3 lg:h-3">
              <Image src={movie_icon} alt="movie icon" layout="fill" />
            </div>

            <p className="lg:text-xs"> {category}</p>
          </div>
          <span className="h-0.5 w-0.5 bg-slate-300 mx-2  rounded-full"></span>
          <p className="lg:text-xs">{rating}</p>
        </div>
        <h5 className="text-white text-sm font-medium md:text-lg lg:text-lg">
          {title}
        </h5>
      </div>
    </div>
  );
};

export default Thumbnail;
