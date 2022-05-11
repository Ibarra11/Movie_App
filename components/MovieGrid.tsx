import Thumbnail from "./Thumbnail";
import data from "../data.json";
import type { Movie } from "./TrendingRow";
const RegularThumbnails = data.filter((movie) => !movie.isTrending) as Movie[];
const MovieGrid = () => {
  return (
    <div className="border-2 border-white">
      <h4 className="text-white mb-4">Recommended for you</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 md:gap-y-6 lg:grid-cols-4 lg: gap-x-10 lg:gap-y-8   ">
        {RegularThumbnails.map((movie) => {
          return <Thumbnail key={movie.title} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieGrid;
