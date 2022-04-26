import type { NextPage } from "next";
import Nav from "../components/Nav";
const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col gap-6 xl:flex-row xl:gap-9 ">
      <Nav />

      <div className="border-4 border-red flex-1"></div>
    </div>
  );
};

export default Home;
