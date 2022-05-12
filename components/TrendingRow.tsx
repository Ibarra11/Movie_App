import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TrendingMovie } from "../types";
import TrendingThumbnail from "./TrendingThumbnail";
import data from "../data.json";
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

const trendingMovies = data.filter((movie) => movie.isTrending) as Movie[];

const TrendingRow = ({
  trendingMovies,
}: {
  trendingMovies: TrendingMovie[];
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
    console.log(sliderCount.current);
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

  console.log(movieData);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white">Trending</h4>
      <div className="relative overflow-hidden   group ">
        <div
          ref={slider}
          className="h-36 flex w-full  border-4 border-blue-400 "
        >
          {movies.current.map((movie) => {
            return (
              <TrendingThumbnail
                ref={sliderItem}
                key={movie.title}
                {...movie}
              />
            );
          })}
        </div>
        <button
          className="absolute hidden  group-hover:flex  hover:flex items-center cursor-pointer  top-0 border-2 border-green-300 bottom-0 left-0 w-5 bg-black/50"
          onClick={() => handleSlide("prev")}
        >
          <AiOutlineLeft size={24} className="text-white" />
        </button>
        <button
          className="absolute hidden group-hover:flex items-center cursor-pointer top-0 bottom-0 border-2 border-green-400 right-0 w-5 bg-black/50"
          onClick={() => handleSlide("next")}
        >
          <AiOutlineRight size={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default TrendingRow;
