import { BsFillPlayFill } from "react-icons/bs";
const ThumbnailOverlay = () => {
  return (
    <div className="group absolute w-full h-full ">
      {/* overlay */}
      <div className="absolute bg-black opacity-0 duration-200 z-10  h-full w-full  group-hover:opacity-50 group-hover:duration-400 "></div>

      {/* Play button */}
      <div
        className=" absolute opacity-0 z-10 w-32 h-12 flex items-center justify-center gap-5 inset-0 m-auto rounded-3xl overflow-hidden 
                    group-hover:opacity-100 group-hover:delay-400  "
      >
        <div className="absolute -z-10 w-full h-full bg-play opacity-25 "></div>
        <div className=" relative grid text-2xl place-content-center w-8 h-8 rounded-full overflow-hidden">
          <div className="absolute w-full h-full bg-white -z-10 "></div>
          <BsFillPlayFill color="black" />
        </div>
        <p className="text-lg text-white font-medium">Play</p>
      </div>
    </div>
  );
};
export default ThumbnailOverlay;
