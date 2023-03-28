import Nav from "./Nav";
import Input from "./Input";
import Head from "next/head";
import type { Dispatch, SetStateAction } from "react";
const Layout: (props: {
  children: React.ReactNode;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}) => React.ReactElement = ({ children, setSearchValue, searchValue }) => {
  return (
    <>
      <Head>
        <title>MovieSpots</title>
      </Head>
      <div className="bg-darkBlue min-h-screen pb-9 lg:pb-14 flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-9 ">
        <Nav />
        <main className="relative flex flex-col flex-1 gap-6 px-4 md:gap-8 md:px-6 lg:pl-0 lg:pt-16">
          <Input searchValue={searchValue} setSearchValue={setSearchValue} />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
