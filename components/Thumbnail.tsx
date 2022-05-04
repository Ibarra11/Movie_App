import Image from "next/image";
import thumbnail_112_sm from "/public/thumbnails/112/regular/small.jpg";
import thumbnail_112_md from "/public/thumbnails/112/regular/medium.jpg";
import thumbnail_112_lg from "/public/thumbnails/112/regular/large.jpg";
import movie_icon from "/public/icons/icon-category-movie.svg";

const Thumbnail = () => {
  return (
    <div className="w-full border-2 border-red space-y-2">
      <div className="relative w-full aspect-thumbnail">
        <div className="md:hidden">
          <Image
            layout="fill"
            src={thumbnail_112_sm}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
        <div className="hidden md:block lg:hidden">
          <Image
            layout="fill"
            src={thumbnail_112_md}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
        <div className="hidden lg:block">
          <Image
            layout="fill"
            src={thumbnail_112_lg}
            objectFit="cover"
            alt="Movie 112 thumbnail"
          />
        </div>
      </div>

      <div className=" space-y-1 border-2 border-red ">
        <div className="flex items-center text-slate-300  text-xs ">
          <p>2017</p>
          <span className=" h-0.5 w-0.5 bg-slate-300 mx-2 rounded-full"></span>
          <div className="flex gap-1 items-center  ">
            <Image
              src={movie_icon}
              width={10}
              height={10}
              alt="movie icon"
              layout="fixed"
            />
            <p>Movie</p>
          </div>
          <span className=" h-0.5 w-0.5 bg-slate-300 mx-2  rounded-full"></span>
          <p>18+</p>
        </div>

        <h5 className="text-white text-sm font-medium">The Great Lands</h5>
      </div>
    </div>
  );
};

export default Thumbnail;
