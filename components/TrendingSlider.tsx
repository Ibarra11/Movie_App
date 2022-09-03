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

const TrendingSlider = ({
  trendingMovies,
  bookmarkedMovieIds,
}: {
  trendingMovies: TrendingMovie[];
  bookmarkedMovieIds: BookmarkedMovieIds;
}) => {
  const slider = useRef<null | HTMLDivElement>(null);
  const sliderItem = useRef<null | HTMLDivElement>(null);
  const [slideX, setSlideX] = useState(1);
  const [isSliderActive, setIsSliderActive] = useState(false);

  function handleSlide(direction: "prev" | "next") {
    if (slider.current && sliderItem.current) {
      let { gap } = getComputedStyle(slider.current);
      const gapValue = parseInt(gap.split(/[a-zA-Z]/)[0]);
      const slideDelta = sliderItem.current.clientWidth + gapValue;
      let slideAmount;
      if (direction === "next") {
        slideAmount = slideDelta * slideX;

        if (!isSliderActive) {
          setIsSliderActive(true);
        }

        slider.current.style.transform = `translateX(-${slideAmount}px)`;
        slider.current.style.transition = ".4s ease-in-out";
        setSlideX((prevSlideX) => prevSlideX + 1);
      } else {
        slideAmount = -(slideDelta * (slideX - 1)) + slideDelta;
        slider.current.style.transform = `translateX(${
          slideAmount < 0 ? "-" : ""
        }${Math.abs(slideAmount)}px)`;
        slider.current.style.transition = ".4s ease-in-out";
        setSlideX((prevSlideX) => prevSlideX - 1);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-4xl">Trending</h3>
      <div className="slider-container relative overflow-hidden border-4 border-green-600">
        <div className="peer isolate relative flex w-full gap-9" ref={slider}>
          {trendingMovies.map((movie) => {
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
          aria-label="See previous titles"
          className={`
            absolute  hidden items-center justify-center cursor-pointer  top-0 bottom-0 left-0 w-5 
          hover:bg-black/50 hover:flex ${slideX > 1 ? "peer-hover:flex" : ""}
            lg:w-10
          `}
          onClick={() => handleSlide("prev")}
          disabled={!(slideX > 1)}
        >
          <AiOutlineLeft size={24} className="text-white" />
        </button>
        <button
          aria-label="See more titles"
          className={`
            absolute hidden items-center justify-center cursor-pointer top-0 bottom-0 right-0 w-5
           hover:bg-black/50 hover:flex   ${
             slideX <= trendingMovies.length % 3 ? "peer-hover:flex" : ""
           }
            lg:w-10`}
          disabled={!(slideX <= trendingMovies.length % 3)}
          onClick={() => handleSlide("next")}
        >
          <AiOutlineRight size={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default TrendingSlider;
