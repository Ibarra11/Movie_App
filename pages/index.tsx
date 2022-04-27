import type { NextPage } from "next";
import Nav from "../components/Nav";
import Input from "../components/Input";
const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col gap-6 xl:flex-row xl:gap-9 ">
      <Nav />
      <div className="border-4 px-4 border-red flex-1">
        <Input />
      </div>
    </div>
  );
};

export default Home;
