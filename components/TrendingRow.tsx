import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { BookmarkedMovieIds, TrendingMovie } from "../types";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import TrendingThumbnail from "./TrendingThumbnail";

export interface Movie {
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

const TrendingRow = ({
  trendingMovies,
  bookmarkedMovieIds,
}: {
  trendingMovies: TrendingMovie[];
  bookmarkedMovieIds: BookmarkedMovieIds;
}) => {
  const slider = useRef<null | HTMLDivElement>(null);
  const sliderItem = useRef<null | HTMLDivElement>(null);
  const slide = useState(false);
  const sliderCount = useRef(0);

  const [movieData, setMovieData] = useState(trendingMovies);
  const movies = useRef(trendingMovies);

  // useLayoutEffect(() => {
  //   if (
  //     slider.current instanceof HTMLDivElement &&
  //     sliderItem.current instanceof HTMLDivElement &&
  //     sliderCount.current > 0
  //   ) {
  //     const currentSize = sliderItem.current.clientWidth;
  //     slider.current.style.transform = `translateX(-${
  //       currentSize * sliderCount.current
  //     }px)`;
  //     slider.current.style.transition = ".4s ease-in-out";
  //   }
  // }, [movieData]);

  function handleSlide(direction: "prev" | "next") {
    if (slider.current && sliderCount.current === movieData.length - 2) {
      const lastMovie = movieData[movieData.length - 1];
      const currentMovie = movieData[sliderCount.current];

      console.log(movies.current);
      sliderCount.current = 0;
    } else if (slider.current && sliderItem.current) {
      sliderCount.current++;
      const currentSize = sliderItem.current.clientWidth;
      // slider.current.style.transform = `translateX(-${
      //   currentSize * sliderCount.current
      // }px)`;

      const [firstMovie, ...rest] = movieData;
      slider.current.style.transform = `translateX(-${
        sliderItem.current.clientWidth * sliderCount.current
      }px)`;
      slider.current.style.transition = ".4s ease-in-out";
      // setMovieData([...rest, firstMovie]);
    }
    // const [firstMovie, ...rest] = movieData;
    // sliderCount.current++;
    // setMovieData([...rest, firstMovie]);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-4xl">Trending</h3>
      <div className="relative overflow-hidden  group ">
        <div ref={slider} className="flex w-full">
          {movies.current.map((movie) => {
            return (
              <TrendingThumbnail
                ref={sliderItem}
                key={movie.title}
                {...movie}
                isBookmarked={bookmarkedMovieIds[movie.id]}
              />
            );
          })}
        </div>
        <button
          className="absolute hidden group-hover:flex  hover:flex items-center justify-center cursor-pointer  top-0 bottom-0 left-0 w-5 lg:w-10 bg-black/50"
          onClick={() => handleSlide("prev")}
        >
          <AiOutlineLeft size={24} className="text-white" />
        </button>
        <button
          className="absolute hidden group-hover:flex items-center justify-center cursor-pointer top-0 bottom-0 right-0 w-5 lg:w-10 bg-black/50"
          onClick={() => handleSlide("next")}
        >
          <AiOutlineRight size={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default TrendingRow;
