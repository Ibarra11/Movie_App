import Thumbnail from "./Thumbnail";
const MovieGrid = () => {
  return (
    <div className="border-2 border-white">
      <h4 className="text-white mb-4">Recommended for you</h4>
      <div className="grid grid-cols-2  gap-4">
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    </div>
  );
};

export default MovieGrid;
