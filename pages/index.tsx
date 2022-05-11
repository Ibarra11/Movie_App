import type { NextPage } from "next";
import Nav from "../components/Nav";
import Input from "../components/Input";
import TrendingRow from "../components/TrendingRow";
import MovieGrid from "../components/MovieGrid";
const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col gap-6 md:gap-9 xl:flex-row xl:gap-9 ">
      <Nav />
      <div className="border-4 px-4 border-red flex-1 md:px-6">
        <Input />
        <TrendingRow />
        <MovieGrid />
      </div>
    </div>
  );
};

export default Home;
