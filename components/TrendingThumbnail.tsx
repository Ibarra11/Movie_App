import { forwardRef } from "react";
import { TrendingMovie } from "../types";
import Image from "next/image";
import movie_icon from "/public/icons/icon-category-movie.svg";
import empty_bookmark from "/public/icons/icon-bookmark-empty.svg";
import full_bookmark from "/public/icons/icon-bookmark-full.svg";
export type Ref = HTMLDivElement;

const TrendingThumbnail = forwardRef<Ref, TrendingMovie>(
  (
    { title, year, category, rating, isBookmarked, trending_sm, trending_lg },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="relative w-4/6  shrink-0  cursor-pointer lg:w-2/6 lg:h-64 border-2 border-red"
      >
        <div className="absolute w-full h-full ">
          <div>
            <Image
              layout="fill"
              src={trending_sm}
              objectFit="cover"
              alt="Trending movie"
            />
          </div>
        </div>
        <div className="relative h-2/5 top-full p-6 -translate-y-full   from-transparent to-black bg-gradient-to-b">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center text-slate-300 text-xs">
                <p className="lg:text-base">{year}</p>
                <span className="h-1 w-1 bg-slate-300 mx-2 rounded-full"></span>
                <div className="flex gap-1.5 items-center">
                  <Image
                    src={movie_icon}
                    width={12}
                    height={12}
                    alt="movie icon"
                    layout="fixed"
                  />
                  <p className="lg:text-base">{category}</p>
                </div>
                <span className=" h-1 w-1 bg-slate-300 mx-2 rounded-full"></span>
                <p className="text-xs  uppercase lg:text-base">{rating}</p>
              </div>
              <h5 className="text-white text-sm font-medium lg:text-2xl">
                {title}
              </h5>
            </div>
          </div>
        </div>
        <button
          aria-label={isBookmarked ? "Unbookmark movie" : "Bookmark movie"}
          className="
          group bookmark-icon-container absolute top-2 right-2 grid place-content-center w-8 h-8 bg-darkBlue/50 
          rounded-full hover:bg-white hover:duration-200
          lg:top-4  lg:right-6
          "
        >
          <Image
            layout="fixed"
            width={12}
            height={14}
            src={isBookmarked ? full_bookmark : empty_bookmark}
            alt=""
            className="relative filter-bookmark-icon"
            role="presentation"
          />
        </button>
      </div>
    );
  }
);

TrendingThumbnail.displayName = "TrendingThumbnail";

export default TrendingThumbnail;
