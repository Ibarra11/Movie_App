import type { NextPage } from "next";
import Nav from "../components/Nav";
const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col gap-6 xl:flex-row xl:gap-9 ">
      <div className="md:p-6 md:pb-0 xl:pr-0 xl:pb-6  border-white border-2">
        <Nav />
      </div>
      <div className="border-4 border-red flex-1"></div>
    </div>
  );
};

export default Home;
