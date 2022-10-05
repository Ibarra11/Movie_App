import { useState, useLayoutEffect, useRef } from "react";
import { BookmarkedMovieIds, TrendingMovie } from "../types";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import TrendingThumbnail from "./TrendingThumbnail";

function isInView(element: HTMLDivElement) {
  const item = element.getBoundingClientRect();
  if (
    item.top >= 0 &&
    item.left >= 0 &&
    item.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    item.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return true;
  }
  return false;
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
  const lastItemRef = useRef<null | HTMLDivElement>(null);
  const delayRef = useRef(false);
  const [slideX, setSlideX] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next" | null>(null);
  const [isSlideDisabled, setisSlideDisabled] = useState(false);

  function handleSlide(direction: "prev" | "next") {
    if (lastItemRef.current && !delayRef.current) {
      const isElementinView = isInView(lastItemRef.current);
      if (isElementinView && direction === "next") {
        setisSlideDisabled(true);
      } else if (!isElementinView && direction === "next") {
        setDirection("next");
        setSlideX(slideX + 1);
      } else if (slideX >= 1) {
        setDirection("prev");
        setSlideX(slideX - 1);
        setisSlideDisabled(false);
      }
    }
  }

  useLayoutEffect(() => {
    if (slider.current && sliderItem.current && direction) {
      let { gap } = getComputedStyle(slider.current);
      const gapValue = parseInt(gap.split(/[a-zA-Z]/)[0]);
      const slideDelta = sliderItem.current.clientWidth + gapValue;
      let slideAmount;
      if (direction === "next") {
        slideAmount = slideDelta * slideX;
        slider.current.style.transform = `translateX(-${slideAmount}px)`;
        slider.current.style.transition = ".4s ease-in-out";
      } else {
        slideAmount = -(slideDelta * slideX);
        slider.current.style.transform = `translateX(${
          slideAmount < 0 ? "-" : ""
        }${Math.abs(slideAmount)}px)`;
        slider.current.style.transition = ".4s ease-in-out";
      }
      delayRef.current = true;
      setTimeout(() => {
        delayRef.current = false;
      }, 400);
    }
  }, [slideX, direction]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-xl md:text-4xl">Trending</h3>
      <div className="relative overflow-hidden">
        <div
          className="peer isolate relative flex w-full gap-4 md:gap-10"
          ref={slider}
        >
          {trendingMovies.map((movie, index) => {
            return (
              <TrendingThumbnail
                ref={
                  index !== trendingMovies.length - 1 ? sliderItem : lastItemRef
                }
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
          hover:bg-black/50 hover:flex ${slideX > 0 ? "peer-hover:flex" : ""}
            w-10
          `}
          onClick={() => handleSlide("prev")}
          disabled={slideX === 0}
        >
          <AiOutlineLeft size={24} className="text-white" />
        </button>
        <button
          aria-label="See more titles"
          className={`
            absolute hidden items-center justify-center cursor-pointer top-0 bottom-0 right-0 w-5
           hover:bg-black/50 hover:flex   ${
             !isSlideDisabled ? "peer-hover:flex" : ""
           }
            w-10`}
          disabled={isSlideDisabled}
          onClick={() => handleSlide("next")}
        >
          <AiOutlineRight size={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default TrendingSlider;
