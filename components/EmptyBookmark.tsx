import { BiMovie } from "react-icons/bi";
const EmptyBookmark: (props: {
  text: "TV Series" | "Movie";
}) => React.ReactElement = ({ text }) => {
  return (
    <div className="absolute  flex flex-col gap-6 w-full h-full justify-center items-center text-white">
      <BiMovie color="white" size={72} />
      <p className=" text-lg">Bookmark a {text} to view it here</p>
    </div>
  );
};

export default EmptyBookmark;
