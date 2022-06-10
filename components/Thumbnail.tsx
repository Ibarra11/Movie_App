import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "@prisma/client";
import { GetBookmarkedMoviesQueryHookResult } from "../types/apollo-generated";
import { useAddBookmarkMutation } from "../types/apollo-generated";
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
}: Movie & {
  isBookmarked: boolean;
}) => {
  const [mutation, { loading }] = useAddBookmarkMutation();

  return (
    <div className="w-full space-y-2">
      <div className="relative  w-full aspect-video">
        {/* bookmark icon */}
        <div
          className="absolute grid place-content-center z-10 top-2 right-2 h-8 w-8  bg-darkBlue/50 rounded-full"
          onClick={async () => {
            // just to ensure that only one request is made at a time.
            if (!loading) {
              console.log("test");
              mutation({
                variables: { movieId: id },
                refetchQueries: ["getBookmarkedMovies"],
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
        <div className="hidden lg:block">
          <Image
            layout="fill"
            src={regular_lg}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
      </div>
      <div className=" space-y-1">
        <div className="flex items-center text-slate-300  text-xs ">
          <p>{year}</p>
          <span className=" h-0.5 w-0.5 bg-slate-300 mx-2 rounded-full"></span>
          <div className="flex gap-1 items-center  ">
            <Image
              src={movie_icon}
              width={10}
              height={10}
              alt="movie icon"
              layout="fixed"
            />
            <p>{category}</p>
          </div>
          <span className=" h-0.5 w-0.5 bg-slate-300 mx-2  rounded-full"></span>
          <p>{rating}</p>
        </div>
        <h5 className="text-white text-sm font-medium">{title}</h5>
      </div>
    </div>
  );
};

export default Thumbnail;
