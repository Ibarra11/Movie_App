import { forwardRef } from "react";
import { TrendingMovie } from "../types";
import Image from "next/image";
import movie_icon from "/public/icons/icon-category-movie.svg";
import empty_bookmark from "/public/icons/icon-bookmark-empty.svg";
export type Ref = HTMLDivElement;

const TrendingThumbnail = forwardRef<Ref, TrendingMovie>(
  (
    { title, year, category, rating, isBookmarked, trending_sm, trending_lg },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="relative w-4/6 shrink-0  cursor-pointer lg:w-2/6"
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
        <div className="relative h-1/2 top-full -translate-y-full flex flex-col gap-1 p-4 from-transparent to-black bg-gradient-to-b">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center text-slate-300 text-xs">
                <p>{year}</p>
                <span className=" h-1 w-1 bg-slate-300 mx-2 rounded-full"></span>
                <div className="flex gap-1.5 items-center">
                  <Image
                    src={movie_icon}
                    width={10}
                    height={10}
                    alt="movie icon"
                    layout="fixed"
                  />
                  <p>{category}</p>
                </div>
              </div>
              <h5 className="text-white text-sm font-medium">{title}</h5>
            </div>
            <div className="px-2 py-px bg-white bg-opacity-20 rounded-xl ">
              <p className="text-xs text-white uppercase ">{rating}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 grid place-content-center w-8 h-8 bg-darkBlue/50 rounded-full ">
          <Image
            layout="fixed"
            width={12}
            height={14}
            src={empty_bookmark}
            alt="bookmark"
          />
        </div>
      </div>
    );
  }
);

TrendingThumbnail.displayName = "TrendingThumbnail";

export default TrendingThumbnail;
