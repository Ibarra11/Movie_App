import { useState, useLayoutEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import TrendingThumbnail from "./TrendingThumbnail";
const data = [
  { title: "Beyond Earth" },
  { title: "Bottom Gear" },
  { title: "undiscovered Cities" },
  { title: "1998" },
  { title: "dark side of the moon" },
];
const TrendingRow = () => {
  const [index, setIndex] = useState(0);
  const slider = useRef<null | HTMLDivElement>(null);
  const sliderItem = useRef<null | HTMLDivElement>(null);
  const sliderCount = useRef(0);

  const [movieData, setMovieData] = useState(data);

  useLayoutEffect(() => {
    if (
      slider.current instanceof HTMLDivElement &&
      sliderItem.current instanceof HTMLDivElement &&
      sliderCount.current > 0
    ) {
      const currentSize = sliderItem.current.clientWidth;
      slider.current.style.transform = `translateX(-${
        currentSize * sliderCount.current
      }px)`;
    }
  }, [movieData]);

  function handleSlide() {
    if (index === movieData.length - 1) {
      const [firstMovie, ...rest] = movieData;
      setMovieData([...rest, firstMovie]);
    } else {
      const [firstMovie, ...rest] = movieData;
      sliderCount.current++;
      setMovieData([...rest, firstMovie]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white">Trending</h4>
      <div className="relative overflow-hidden   group ">
        <div
          ref={slider}
          className="h-36 flex w-full  border-4 border-blue-400 "
        >
          {movieData.map((el, i) => {
            return <TrendingThumbnail ref={sliderItem} key={i} val={i} />;
          })}
        </div>
        <button
          className="absolute hidden  group-hover:flex  hover:flex items-center cursor-pointer  top-0 border-2 border-green-300 bottom-0 left-0 w-5 bg-black/50"
          onClick={handleSlide}
        >
          <AiOutlineLeft size={24} className="text-white" />
        </button>
        <button
          className="absolute hidden group-hover:flex items-center cursor-pointer top-0 bottom-0 border-2 border-green-400 right-0 w-5 bg-black/50"
          onClick={handleSlide}
        >
          <AiOutlineRight size={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default TrendingRow;
